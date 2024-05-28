import React from 'react';
import MovieList from '../components/MovieList';
import ReviewList from './ReviewList';

const Profile = () => {
    // Get the user's movie wish list and reviews from the server or state

    return (
        <div>
            <h1>My Profile</h1>
            <MovieList movies={[]} />
            <ReviewList reviews={[]} />
        </div>
    );
};

export default Profile;