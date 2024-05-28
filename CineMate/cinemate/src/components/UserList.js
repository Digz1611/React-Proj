import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/UserList.css';

const UserList = ({ users }) => {
    return (
        <div className="user-list">
            <h2>Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <Link to={`/user/${user.id}`}>
                            <h3>{user.name}</h3>
                            <p>{user.bio}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;