import{
    configureStore, 
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";

import axios from "axios";
import {API_KEY,TMDB_BASE_URL} from "../utils/constants";

const initialState={
    movies:[],
    genresLoaded:false,
    genres:[], 
};


export const getGenres=createAsyncThunk("netflix/genres",async()=>{
    const {data:{genres}}=await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=afa2d09dc76625bbab11c8b0db5f2ba6"
    );
   return genres;
});

const creatArrayFromRawData=(array,moviesArray,genres)=>{

array.forEach((movie) => {
    const moviegenres=[];
    movie.genre_ids.forEach((genre)=>{
        const name = genres.find(({ id })=> id ===genre);
        if (name) moviegenres.push(name.name);
    });

    if(movie.backdrop_path) {
        moviesArray.push({
            id:movie.id,
            name:movie?.original_name ? movie.original_name: movie.original_title,
            image:movie.backdrop_path,
            genres:moviegenres.slice(0,3),
        })
    }
});
}

const getRawdata= async (api, genres, paging=false) => {
    const moviesArray=[];
    for(let i=1; moviesArray.length<60 && i<10;i++){
     const
      {
        data:{results},
    }= await axios.get(`${api}${paging?`&page=${i}`:""}`
     );
     creatArrayFromRawData(results, moviesArray, genres);
    }
    return moviesArray;

};

export const fetchMovies=createAsyncThunk(
    "netflix/trending",
    async({type},thunkApi)=>{
        const {
        netflix:{genres},
        }=thunkApi.getState();
        return getRawdata(`${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
        genres,
        true
        );   
}
);

export const getUsersLikedMovies = createAsyncThunk(
    "netflix/getLiked",
    async (email) => {
      const {
        data: { movies },
      } = await axios.get(`http://localhost:3000/api/user/liked/${email}`);
      return movies;
    }
  );
  
  export const removeMovieFromLiked = createAsyncThunk(
    "netflix/deleteLiked",
    async ({ movieId, email }) => {
      const {
        data: { movies },
      } = await axios.put("http://localhost:3000/api/user/remove", {
        email,
        movieId,
      });
      return movies;
    }
  );


export const fetchDataByGenre=createAsyncThunk(
    "netflix/moviesByGenres",async({genre,type},thunkApi)=>{
        console.log("in fetch data",genre,type)
        const {
        netflix:{genres},
        }=thunkApi.getState();
        const data = getRawdata(
            `${TMDB_BASE_URL}/discover${type}?api_key=${API_KEY}&with_genres=${genre}`,
        genres
        );   
        return data;
        }
);
// return getRawdata(`${TMDB_BASE_URL}/discover${type}?api_key=${API_KEY}&with_genres=${genre}`)

const NetflixSlice=createSlice({
    name:"Netflix",
    initialState,
    extraReducers:(builder)=>{

    builder.addCase(getGenres.fulfilled,(state,action)=>{
        state.genres=action.payload;
        state.genresLoaded=true;
    });
    builder.addCase(fetchMovies.fulfilled,(state,action)=>{
        state.movies=action.payload;
    });
    builder.addCase(fetchDataByGenre.fulfilled,(state,action)=>{
        state.movies=action.payload;
    });
    builder.addCase(getUsersLikedMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
      });
      builder.addCase(removeMovieFromLiked.fulfilled, (state, action) => {
        state.movies = action.payload;
      });
    },
});
export const store = configureStore({
    reducer:{
        netflix:NetflixSlice.reducer,
    },
});





