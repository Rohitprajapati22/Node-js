import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import UserSidebar from "../../component/UserSidebar";
import Header from "../../component/Header";
import "./UserviewBlog.css";

const ViewBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [auth] = useAuth();
    const navigate = useNavigate();
    const [selectedBlog, setSelectedBlog] = useState(null);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/blog/deleteblog/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth?.token?.token}`,
                },
            });

            if (response.ok) {
                toast.success("Blog deleted successfully!");
                setBlogs(blogs.filter((blog) => blog._id !== id));
            } else {
                toast.error("Failed to delete blog.");
            }
        } catch (error) {
            console.error("Error deleting blog:", error);
            toast.error("Error deleting blog.");
        }
    };

    const handleUpdate = (id) => {
        navigate(`/user/updateblog/${id}`);
    };


    useEffect(() => {
        const fetchMyBlogs = async () => {
            try {
                const response = await fetch("http://localhost:8000/blog/viewblog", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${auth?.token?.token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch blogs");
                }

                const data = await response.json();

                if (data.success && Array.isArray(data.blogs)) {
                    setBlogs(data.blogs);
                } else {
                    toast.error("No blogs found!");
                    setBlogs([]);
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
                toast.error("Something went wrong!");
            } finally {
                setLoading(false);
            }
        };

        if (auth?.token?.token) {
            fetchMyBlogs();
        }
    }, [auth]);

    return (
        <>
            <Header />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-3">
                        <UserSidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="blog-container">

                            <h1 className="text-center mb-4">Your Blogging Hub 🌍</h1>

                            {loading ? (
                                <p className="text-center">Loading...</p>
                            ) : blogs.length === 0 ? (
                                <p className="text-center">You haven't posted any blogs yet.</p>
                            ) : (
                                <div className="row">
                                    {blogs.map((blog) => (
                                        <div key={blog._id} className="col-md-6 mb-4">
                                            <div className="blog-card">
                                                <img
                                                    src={blog.image}
                                                    alt={blog.title}
                                                    className="blog-img img-fluid"
                                                />
                                                <div className="card-body">
                                                    <h5 className="blog-title">Title : {blog.title}</h5>
                                                    <p className="blog-author">
                                                        <strong>Author :</strong> {blog.author?.name || "Unknown"}
                                                    </p>
                                                    <p className="blog-content">
                                                        <strong>Content : </strong> {blog.content.substring(0, 100)}...
                                                    </p>
                                                    <div className="blog-footer">
                                                        <button className="delete-btn" onClick={() => handleDelete(blog._id)}>Delete</button>
                                                        <button className="view-btn" onClick={() => setSelectedBlog(blog)}>View More</button>
                                                        <button className="edit-btn" onClick={() => handleUpdate(blog._id)}>Edit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <ToastContainer position="top-right" autoClose={3000} />
                        </div>

                    </div>
                </div>
            </div>

            {selectedBlog && (
                <div className="blog-modal show" onClick={() => setSelectedBlog(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close" onClick={() => setSelectedBlog(null)}>&times;</span>
                        <img src={selectedBlog.image} alt={selectedBlog.title} className="modal-img" />
                        <h2><strong>Title : </strong> {selectedBlog.title}</h2>
                        <p><strong>Author : </strong> {selectedBlog.author?.name || "Unknown"}</p>
                        <p><strong>Content : </strong> {selectedBlog.content.split("\n").map((line, index) => (
                            <span key={index}>{line}<br /></span>
                        ))}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default ViewBlog;
