import React, { useState } from 'react';
import SearchUsers from '../components/SearchUsers';
import UserList from '../components/UserList';
import UserProfile from '../components/UserProfile';
import '../styles/Home.css';

const Home = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleSearch = (query) => {
        // Fetch users based on the search query
        // and update the `users` state
    };

    const handleUserSelect = (user) => {
        setSelectedUser(user);
    };

    return (
        <div className="home">
            <SearchUsers onSearch={handleSearch} />
            <div className="user-section">
                <UserList users={users} />
                {selectedUser && <UserProfile user={selectedUser} />}
            </div>
        </div>
    );
};

export default Home;