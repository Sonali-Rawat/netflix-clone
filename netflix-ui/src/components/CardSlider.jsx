import React from 'react';

const CardSlider = ({data,title}) => {
    return (
        data.map((movie,index)=>{
            return <Card movieData={movie} index={index} key={movie.id}/>;
        })
    );
}

export default CardSlider;
