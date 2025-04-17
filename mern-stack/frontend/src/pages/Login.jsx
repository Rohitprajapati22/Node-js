import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import "../style.css";
import Header from '../component/Header';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const userRole = auth?.token?.user?.role;
        
        if (userRole === "admin") {
            navigate("/admin/dashboard");
        } else if (userRole === "user") {
            navigate("/user/dashboard");
        }
    }, [auth?.token]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!email || !password) {
            toast.error("All fields are required");
            return;
        }
        let res = await fetch(`http://localhost:8000/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
                
        let user = await res.json();        
        
        if (user.success) {
            let userlogin = {
                token: user?.token,
                user: user?.user
            };
            
            localStorage.setItem("token", JSON.stringify(userlogin));
            setAuth({ ...auth, token: userlogin });

            toast.success(user?.message);

            setTimeout(() => {
                navigate(user?.user?.role === "admin" ? '/admin/dashboard' : '/user/dashboard');
            }, 2000);
        } else {
            toast.error("Invalid Email or Password");
        }
    };

    return (
        <>
            <Header />
            <div className="main-container">
                <div className="form-wrapper">
                    <div className="form-content">
                        <form className="form login-form active" onSubmit={handleSubmit}>
                            <h2>Welcome Back!</h2>
                            <p>Login to your account to continue</p>
                            <div className="input-group">
                                <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} required />
                                <span className="input-icon">📧</span>
                            </div>
                            <div className="input-group">
                                <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} required />
                                <span className="input-icon">🔒</span>
                            </div>
                            
                            {/* Forgot Password Link */}
                            <p className="forgot-password">
                                <Link to="/forgot-password">Forgot Password?</Link>
                            </p>

                            <button type="submit" className="btn btn-success w-100">Sign in</button>
                            
                            <p className="switch-text">
                                Don’t have an account? <Link to={`/register`}> <span className="toggle-form">Sign Up</span> </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>

            <ToastContainer position="top-center" autoClose={1000} />
        </>
    );
};

export default Login;
