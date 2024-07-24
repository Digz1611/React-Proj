import React from 'react';
import '../styles/MovieList.css';

const MovieList = ({ movies, onMovieSelect }) => {
    return (
        <div className="movie-list">
            <h2>Movie List</h2>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id} onClick={() => onMovieSelect(movie)}>
                        {movie.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MovieList;