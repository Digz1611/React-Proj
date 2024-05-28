import React, { useState } from 'react';
import movieService from '../services/movieService';

const MovieSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const movies = await movieService.searchMovies(query);
            setResults(movies);
        } catch (error) {
            console.error('Search failed:', error);
            // Show error message
        }
    };

    return (
        <div>
            <h2>Search Movies</h2>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search movies..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            <ul>
                {results.map((movie) => (
                    <li key={movie.id}>{movie.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default MovieSearch;