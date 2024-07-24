import React from 'react';
import MovieList from '../components/MovieList';
import '../styles/WishList.css';

const WishList = ({ wishList, onMovieSelect }) => {
    return (
        <div className="wish-list">
            <h1>My Wish List</h1>
            <MovieList movies={wishList} onMovieSelect={onMovieSelect} />
        </div>
    );
};

export default WishList;