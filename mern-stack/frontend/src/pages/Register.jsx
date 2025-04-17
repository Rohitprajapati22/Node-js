import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "../style.css";
import { Link, useNavigate } from 'react-router-dom';
import Header from '../component/Header';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [city, setCity] = useState("");
    const [contact, setContact] = useState("");
    const [image, setImage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formdata = new FormData;
        formdata.append("name", name)
        formdata.append("email", email)
        formdata.append("password", password)
        formdata.append("gender", gender)
        formdata.append("city", city)
        formdata.append("contact", contact)
        formdata.append("userimage", image)
        
        try {
            if (!name || !email || !password || !gender || !city || !contact || !image) {
                toast.error("All filed is required");
                return false;
            }

            let res = await fetch(`http://localhost:8000/register`, {
                method: 'POST',
                body: formdata,
            })
            
            let user = await res.json();
            if (user.success) {
                toast.success(user.message);
                setName("");
                setEmail("");
                setPassword("");
                setTimeout(() => {
                    navigate('/')
                }, 2000)
            } else {
                toast.error(user.message)
            }

        } catch (err) {
            console.log(err);
            return false;

        }
    }


    return (
        <>
            <Header />
            <div className="main-container">
                <div className="form-wrapper">
                    <div className="form-content">
                        <form className="form signup-form active" onSubmit={handleSubmit}>
                            <h2>Create Account</h2>
                            <p>Sign up to explore new opportunities</p>
                            <div className="input-group">
                                <input type="text" placeholder='Username' onChange={(e) => setName(e.target.value)} value={name} required />
                                <span className="input-icon">👤</span>
                            </div>
                            <div className="input-group">
                                <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} required />
                                <span className="input-icon">📧</span>
                            </div>
                            <div className="input-group">
                                <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} required />
                                <span className="input-icon">🔒</span>
                            </div>

                            <div className="input-group gender-group">
                                <label>
                                    <input type="radio" name="gender" onChange={(e) => setGender(e.target.value)} value="male" required /> Male
                                </label>
                                &nbsp;
                                <label>
                                    <input type="radio" name="gender" onChange={(e) => setGender(e.target.value)} value="female" required /> Female
                                </label>
                                <span className="input-icon">⚧️</span>

                            </div>

                            <div className="input-group">
                                <input type="text" onChange={(e) => setCity(e.target.value)} value={city} className="form-control" placeholder='Enter your city' />
                                <span className="input-icon">📍</span>
                            </div>

                            <div className="input-group">
                                <input type="text" onChange={(e) => setContact(e.target.value)} value={contact} className="form-control" placeholder='Enter your contact' />
                                <span className="input-icon">📞</span>
                            </div>

                            <div className="input-group">
                                <input type="file" onChange={(e) => setImage(e.target.files[0])} className="form-control" />
                                <span className="input-icon">📷</span>
                            </div>
                            <button type="submit" className="btn btn-success w-100">Sign Up</button>
                            <p className="switch-text">
                                Already have an account? <Link to={'/'}><span className="toggle-form">Sign in</span></Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-center" autoClose={3000} />
        </>
    );
};

export default Register;
