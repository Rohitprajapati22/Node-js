import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../../component/Header'
import UserSidebar from '../../component/UserSidebar'
import { useAuth } from '../../context/AuthContext'

const UserProfile = () => {
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
    let role = auth?.token?.user?.role;
    useEffect(() => {
        setName(auth?.token?.user?.name)
        setEmail(auth?.token?.user?.email)
        setPassword(auth?.token?.user?.password)
        setGender(auth?.token?.user?.gender)
        setCity(auth?.token?.user?.city)
        setContact(auth?.token?.user?.contact)
    }, [auth?.token?.user])
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let formdata = new FormData();
            formdata.append('userid', auth?.token?.user?._id);
            formdata.append("name", name);
            formdata.append("email", email);
            formdata.append("password", password);
            formdata.append("gender", gender);
            formdata.append("city", city);
            formdata.append("contact", contact);
            formdata.append("userimage", image);
            //api call edit user
            let res = await fetch(`http://localhost:8000/changeprofile`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${auth?.token?.token}`
                },
                body: formdata
            })
            let data = await res.json();
            if (data.success) {
                toast.success("User profile successfully changed");
                if (role === "admin") {
                    setTimeout(() => {
                        navigate('/admin/dashboard')
                    }, 1000);
                } else {
                    setTimeout(() => {
                        navigate('/user/dashboard')
                    }, 1000)
                }
            } else {
                toast.error("Error while edit user");
            }

        } catch (err) {
            console.log(err);
            return false
        }
    }

    return (

        <>
            <Header />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-3">
                        <UserSidebar />
                    </div>
                    <div className='col-md-9'>
                        <div className="card ms-3">
                            <div className="card-header">
                                <h5>User Change Profile</h5>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                                        <input type="text" onChange={(e) => setName(e.target.value)} value={name} className="form-control" placeholder='Enter your name' />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                        <input type="text" disabled onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" placeholder='Enter your email' />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" placeholder='Enter your password' />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Gender</label>
                                        <select className="form-control" value={gender} onChange={(e) => setGender(e.target.value)}>
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">City</label>
                                        <input type="text" onChange={(e) => setCity(e.target.value)} value={city} className="form-control" placeholder='Enter your city' />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Conatct</label>
                                        <input type="text" onChange={(e) => setContact(e.target.value)} value={contact} className="form-control" placeholder='Enter your contact' />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Image</label>
                                        <input type="file" onChange={(e) => setImage(e.target.files[0])} className="form-control" placeholder='Enter your contact' />
                                        <img src={auth?.token?.user?.image} width="100" />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfile