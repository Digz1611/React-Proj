import React from 'react';
import MovieReview from '../components/MovieReview';

const ReviewList = ({ reviews }) => {
    return (
        <div>
            <h2>Movie Reviews</h2>
            {reviews.map((review) => (
                <MovieReview key={review.id} review={review} />
            ))}
        </div>
    );
};

export default ReviewList;