import React, { useState } from 'react';
import './Sidebar.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import profileImage from '../assets/profile.png';

const UserSidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();

    const logoutUser = () => {
        localStorage.removeItem("token");
        setAuth(null);
    };

    return (
        <div className="sidebar">
            <div className="admin-info">
                <img src={profileImage} alt="Admin Profile" className="admin-profile-pic" />
                <span className="admin-text">User</span>
            </div>

            <div className="navigation">
                <div className="section main-section">
                    <ul className="items">
                        <li className="item">
                            <Link to="/user/dashboard" className={`${location.pathname === '/user/dashboard' ? 'active' : ''}`}>
                                <i className="fa-solid fa-chart-line" />
                                <span className="item-text">Dashboard</span>
                            </Link>
                        </li>

                        {/* Blog Menu */}
                        <li className="item">
                            <Link to="/user/addblog" className={`${location.pathname === '/user/addblog' ? 'active' : ''}`}>
                                <i className="fa-solid fa-plus" />
                                <span className="item-text">Add Blog</span>
                            </Link>
                        </li>
                        <li className="item">
                            <Link to="/user/viewblog" className={`${location.pathname === '/user/viewblog' ? 'active' : ''}`}>
                                <i className="fa-solid fa-list" />
                                <span className="item-text">View Blogs</span>
                            </Link>
                        </li>

                        <li className="item">
                            <Link to="/user/changeprofile" className={`${location.pathname === '/user/changeprofile' ? 'active' : ''}`}>
                                <i className="fa-solid fa-user-circle" />
                                <span className="item-text">Profile</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Logout Button */}
            <div className="footer">
                <button className="btn btn-danger btn-sm logout-btn" onClick={logoutUser}>
                    <i className="fa-solid fa-sign-out-alt" /> Logout
                </button>
            </div>
        </div>
    );
};

export default UserSidebar;
