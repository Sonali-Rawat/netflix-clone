import React from 'react';

const Slider = ({movies}) => {
    const getMoviesFromRange = (from,to)=>{
        return  movies.slice(from,to);
    };
    return (
        <div>
            Slider
        </div>
    );
}

export default Slider;
