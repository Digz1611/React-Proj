import React, { useState } from 'react';
import MovieList from '../components/MovieList';
import ReviewList from './ReviewList';
import MovieSearch from '../components/MovieSearch';
import '../styles/Profile.css';

const Profile = () => {
    // Get the user's movie wish list and reviews from the server or state
    const user = {
        name: 'John Doe',
        bio: 'Movie enthusiast',
        wishList: [],
        reviews: [],
    };

    const [selectedMovie, setSelectedMovie] = useState(null);

    const handleMovieSelect = (movie) => {
        setSelectedMovie(movie);
    };

    const handleReviewUpdate = (reviewId, rating, comment) => {
        // Update the review with the new rating and comment
    };

    const handleReviewDelete = (reviewId) => {
        // Delete the review
    };

    return (
        <div className="profile">
            <h1>My Profile</h1>
            <MovieSearch onMovieSelect={handleMovieSelect} />
            {selectedMovie && (
                <div>
                    <h2>Selected Movie</h2>
                    <p>{selectedMovie.title}</p>
                    {/* Add functionality to add movie to wish list or submit review */}
                </div>
            )}
            <MovieList movies={user.wishList} onMovieSelect={handleMovieSelect} />
            <ReviewList
                reviews={user.reviews}
                onUpdate={handleReviewUpdate}
                onDelete={handleReviewDelete}
            />
        </div>
    );
};

export default Profile;