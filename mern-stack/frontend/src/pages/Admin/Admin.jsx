import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../component/AdminSidebar';
import { useAuth } from '../../context/AuthContext';
import Header from '../../component/Header';

const Admin = () => {
    const [auth] = useAuth();
    const [no, setNo] = useState(""); 
    const [blogCount, setBlogCount] = useState(""); 

    const fetchUser = async () => {
        try {
            let res = await fetch(`http://localhost:8000/admin/alluser`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth?.token?.token}`
                }
            });
            let data = await res.json();
            if (data.success) {
                setNo(data.users.length);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const fetchBlogs = async () => {
        try {
            let res = await fetch(`http://localhost:8000/admin/totalblogs`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth?.token?.token}`
                }
            });
            let data = await res.json();
            if (data.success) {
                setBlogCount(data.totalBlogs);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchUser();
        fetchBlogs();
    }, []);

    return (
        <>
            <Header />
            <div className="container">
                <div className="row mt-5">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-md-3 ms-3">
                                <div className="card">
                                    <div className="card-header bg-primary text-white">Users</div>
                                    <div className="card-body">
                                        <h5 className="card-title">Total Users: {no}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 ms-3">
                                <div className="card">
                                    <div className="card-header bg-success text-white">Total Blogs</div>
                                    <div className="card-body">
                                        <h5 className="card-title">Total Blogs: {blogCount}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Admin;
