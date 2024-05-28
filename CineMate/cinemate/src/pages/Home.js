import React from 'react';
import MovieSearch from '../components/MovieSearch';
import MovieList from '../components/MovieList';
import ReviewList from './ReviewList';

const Home = () => {
    // Get movie wish lists and reviews from the server or state

    return (
        <div>
            <h1>Movie App</h1>
            <MovieSearch />
            <MovieList movies={[]} />
            <ReviewList reviews={[]} />
        </div>
    );
};

export default Home;