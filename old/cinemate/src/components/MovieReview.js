import React, { useState } from 'react';
import '../styles/MovieReview.css';

const MovieReview = ({ review, onUpdate, onDelete }) => {
    const [rating, setRating] = useState(review.rating);
    const [comment, setComment] = useState(review.comment);

    const handleUpdate = () => {
        onUpdate(review.id, rating, comment);
    };

    const handleDelete = () => {
        onDelete(review.id);
    };

    return (
        <div className="movie-review">
            <h3>{review.movie.title}</h3>
            <div>
                <label>Rating:</label>
                <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={rating}
                    onChange={(e) => setRating(parseFloat(e.target.value))}
                />
            </div>
            <div>
                <label>Comment:</label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>
            </div>
            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default MovieReview;