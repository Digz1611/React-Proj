import React from 'react';
import MovieReview from '../components/MovieReview';
import '../styles/ReviewList.css';

const ReviewList = ({ reviews, onUpdate, onDelete }) => {
    return (
        <div className="review-list">
            <h2>Movie Reviews</h2>
            {reviews.map((review) => (
                <MovieReview
                    key={review.id}
                    review={review}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default ReviewList;