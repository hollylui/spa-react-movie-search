import React from "react";

export const ShowMovies = ({
  poster,
  title,
  released,
  rating,
  plot,
  genre,
}) => {
  return (
    <div className="movieList">
      <img src={poster} alt="" />
      <div className="movieInfo">
        <span className="movieDetails">MOVIE DETAILS</span>
        <p className="title">{title}</p>
        <p>Released Date: {released}</p>
        {rating && <p className="rating">Rating: {rating}</p>}
        <p className="plot">{plot}</p>
        <p>
          {genre.split(", ").map((item, index) => {
            return (
              <span className="genre" key={index}>
                {item}
              </span>
            );
          })}
        </p>
      </div>
    </div>
  );
};
