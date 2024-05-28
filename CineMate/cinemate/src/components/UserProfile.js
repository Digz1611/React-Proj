import React from 'react';
import '../styles/UserProfile.css';
import MovieList from './MovieList';
import ReviewList from '../pages/ReviewList';

const UserProfile = ({ user, onMovieSelect, onReviewUpdate, onReviewDelete }) => {
    return (
        <div className="user-profile">
            <h2>{user.name}</h2>
            <p>{user.bio}</p>
            <MovieList movies={user.wishList} onMovieSelect={onMovieSelect} />
            <ReviewList
                reviews={user.reviews}
                onUpdate={onReviewUpdate}
                onDelete={onReviewDelete}
            />
        </div>
    );
};

export default UserProfile;