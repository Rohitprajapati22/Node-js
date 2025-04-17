import React from 'react';
import './Sidebar.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import profileImage from '../assets/profile.png'; 

const AdminSidebar = () => {
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
                <span className="admin-text">Admin</span>
            </div>

            <div className="navigation">
                <div className="section main-section">
                    <ul className="items">
                        <li className="item">
                            <Link to={`/admin/dashboard`} className={`${location?.pathname === '/admin/dashboard' ? 'active' : ''}`}>
                                <i className="fa-solid fa-chart-line" /> {/* Dashboard Icon */}
                                <span className="item-text">Dashboard</span>
                            </Link>
                        </li>
                        <li className="item">
                            <Link to={`/admin/users`} className={`${location?.pathname === '/admin/users' ? 'active' : ''}`} >
                                <i className="fa-solid fa-users" /> {/* User Icon */}
                                <span className="item-text">Users</span>
                            </Link>
                        </li>
                        <li className="item">
                            <Link to="/admin/adminblogs">
                                <i className="fa-solid fa-newspaper" /> {/* Blog Icon */}
                                <span className="item-text">Blog</span>
                            </Link>
                        </li>
                        <li className="item">
                            <Link to={`/admin/profile`} className={`${location?.pathname === '/profile' ? 'active' : ''}`} >
                                <i className="fa-solid fa-user-circle" /> 
                                <span className="item-text">Profile</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Logout Button in Sidebar */}
            <div className="footer">
                <button className="btn btn-danger btn-sm logout-btn" onClick={logoutUser}>
                    <i className="fa-solid fa-sign-out-alt" /> Logout
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;
