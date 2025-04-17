import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from '../../component/Header';
import AdminSidebar from '../../component/AdminSidebar';
import { FaUser, FaEnvelope, FaLock, FaCity, FaPhone, FaImage, FaVenusMars } from 'react-icons/fa';

const AdminProfileEdit = () => {
    const [auth] = useAuth();
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        gender: "",
        city: "",
        contact: "",
        image: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (auth?.token?.user) {
            setUserData({
                name: auth.token.user.name,
                email: auth.token.user.email,
                password: auth.token.user.password,
                gender: auth.token.user.gender,
                city: auth.token.user.city,
                contact: auth.token.user.contact,
                image: auth.token.user.image
            });
        }
    }, [auth?.token?.user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleFileChange = (e) => {
        setUserData({ ...userData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let formdata = new FormData();
            formdata.append('userid', auth?.token?.user?._id);
            formdata.append("name", userData.name);
            formdata.append("email", userData.email);
            formdata.append("password", userData.password);
            formdata.append("gender", userData.gender);
            formdata.append("city", userData.city);
            formdata.append("contact", userData.contact);
            formdata.append("userimage", userData.image);

            let res = await fetch(`http://localhost:8000/admin/changeprofile`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${auth?.token?.token}`
                },
                body: formdata
            });

            let data = await res.json();
            if (data.success) {
                toast.success("User profile successfully updated");
                setTimeout(() => {
                    navigate('/admin/profile');
                }, 1000);
            } else {
                toast.error("Error while updating profile");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Header />
            <div className="admin-profile-container">
                <div className="row mt-5">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="profile-card">
                            <div className="profile-header">
                                <h5>Edit Profile</h5>
                            </div>
                            <div className="profile-body">
                                <form onSubmit={handleSubmit}>
                                    {[{ label: 'Full Name', name: 'name', type: 'text', icon: <FaUser /> },
                                        { label: 'Email Address', name: 'email', type: 'text', icon: <FaEnvelope />, disabled: true },
                                        { label: 'Password', name: 'password', type: 'password', icon: <FaLock /> },
                                        { label: 'City', name: 'city', type: 'text', icon: <FaCity /> },
                                        { label: 'Contact', name: 'contact', type: 'text', icon: <FaPhone /> },
                                    ].map((field, index) => (
                                        <div className="input-group" key={index}>
                                            <span>{field.icon}</span>
                                            <input type={field.type} name={field.name} value={userData[field.name]} onChange={handleChange} className="form-control" disabled={field.disabled} />
                                        </div>
                                    ))}
                                    <div className="input-group">
                                        <span><FaVenusMars /></span>
                                        <select name="gender" className="form-control" value={userData.gender} onChange={handleChange}>
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div className="input-group">
                                        <span><FaImage /></span>
                                        <input type="file" name="image" onChange={handleFileChange} className="form-control" />
                                    </div>
                                    <div className="button-group">
                                        <button type="reset" className="btn-reset">Reset</button>
                                        <button type="submit" className="btn-submit">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminProfileEdit;