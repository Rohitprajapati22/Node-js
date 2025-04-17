import React, { useEffect, useState } from 'react';
import Header from '../../component/Header';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminSidebar from '../../component/AdminSidebar';
import { useAuth } from '../../context/AuthContext';

const Adminedit = () => {
    const location = useLocation();
    const [auth, setAuth] = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [city, setCity] = useState("");
    const [contact, setContact] = useState("");
    const [image, setImage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setName(location?.state?.name);
        setEmail(location?.state?.email);
        setPassword(location?.state?.password);
        setGender(location?.state?.gender);
        setCity(location?.state?.city);
        setContact(location?.state?.contact);
    }, [location?.state]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let formdata = new FormData();
            formdata.append('userid', location?.state?._id);
            formdata.append("name", name);
            formdata.append("email", email);
            formdata.append("password", password);
            formdata.append("gender", gender);
            formdata.append("city", city);
            formdata.append("contact", contact);
            formdata.append("userimage", image);

            let res = await fetch(`http://localhost:8000/admin/edituser`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${auth?.token?.token}`
                },
                body: formdata
            });

            let data = await res.json();
            if (data.success) {
                toast.success("User successfully edited");
                setTimeout(() => {
                    navigate('/admin/users');
                }, 1000);
            } else {
                toast.error("Error while editing user");
            }
        } catch (err) {
            console.log(err);
            return false;
        }
    };

    return (
        <>
            <Header />
            <div className="container">
                <div className="row mt-5">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className='col-md-9'>
                        <div className="card ms-3">
                            <div className="card-header mt-2">
                                <h5>Edit User</h5>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Name</label>
                                        <input type="text" onChange={(e) => setName(e.target.value)} value={name} className="form-control" placeholder='Enter your name' />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <input type="text" disabled value={email} className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Password</label>
                                        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" placeholder='Enter your password' />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Gender</label>
                                        <div className="position-relative">
                                            <select className="form-control" value={gender} onChange={(e) => setGender(e.target.value)} style={{ appearance: 'none', paddingRight: '30px' }}>
                                                <option value="">Select Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                            <span className="position-absolute end-0 top-50 translate-middle-y me-3">▼</span>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">City</label>
                                        <input type="text" onChange={(e) => setCity(e.target.value)} value={city} className="form-control" placeholder='Enter your city' />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Contact</label>
                                        <input type="text" onChange={(e) => setContact(e.target.value)} value={contact} className="form-control" placeholder='Enter your contact' />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Image</label>
                                        <input type="file" onChange={(e) => setImage(e.target.files[0])} className="form-control" />
                                        <img src={location?.state?.image} width="100" alt="User" />
                                    </div>

                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} theme="dark" />
        </>
    );
};

export default Adminedit;