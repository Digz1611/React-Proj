import React from 'react';

const MovieReview = ({ review }) => {
    return (
        <div>
            <h3>{review.movie.title}</h3>
            <p>Rating: {review.rating}/10</p>
            <p>{review.comment}</p>
        </div>
    );
};

export default MovieReview;