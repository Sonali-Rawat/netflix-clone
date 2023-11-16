import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMovies, getGenres } from '../store';
import { firebaseAuth } from '../utils/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
import styled from 'styled-components';
import NotAvailable from '../components/NotAvailable';
import SelectGenre from '../components/SelectGenre';

export default function MoviePage () {
    const [isScrolled,setIsScrolled]=useState(false);
    const genresLoaded = useSelector((state)=>state.netflix.genresLoaded);
    const movies = useSelector((state) => state.netflix.movies);
    const genres = useSelector((state) => state.netflix.genres);
    
    const navigate=useNavigate();
    const dispatch=useDispatch();
  
    useEffect(()=>{
        console.log("in use effect");
      dispatch(getGenres());
    },[]);
  
    useEffect(()=>{
      if(genresLoaded){
       dispatch(fetchMovies({type:"movie"}));
      }
    },[genresLoaded]);
   
   window.onscroll=()=>{
    setIsScrolled(window.pageYOffset ===0 ? false : true);
    return ()=> (window.onscroll=null);
   };

   onAuthStateChanged(firebaseAuth, (currentUser) => {
    // if (currentUser) navigate("/");
  });
   
    return (
        <Container> 
            <div className="navbar">
                <Navbar isScrolled={isScrolled}/>
            </div>
            <div className="data">
            <SelectGenre genres={genres} type="movie"/>
                { movies.length ? < Slider movies={movies} /> :   <NotAvailable />  }
            </div>
             </Container>
    );
}

const Container = styled.div`
 .data{
    margin-top:8rem;
    .not-available{
        text-align:center;
        color:white;
        margin-top:4rem;
    }
 }
`;
