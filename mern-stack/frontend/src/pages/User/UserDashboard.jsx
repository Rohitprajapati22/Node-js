import React, { useEffect, useState } from 'react';
import UserSidebar from '../../component/UserSidebar';
import Header from '../../component/Header';
import { useAuth } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import "./UserDashboard.css";

const UserDashboard = () => {
    const [auth] = useAuth();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBlog, setSelectedBlog] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch("http://localhost:8000/blog/userblogs", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${auth?.token?.token}`,
                    },
                });

                const data = await response.json();

                if (data.success) {
                    setBlogs(data.blogs);
                } else {
                    toast.error("Failed to load blogs.");
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
                toast.error("Something went wrong!");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
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
                            <h2 className="text-center mb-4">Your Blogging Hub 🌍</h2>
                            <ToastContainer position="top-center" autoClose={3000} />

                            {loading ? (
                                <div className="text-center">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="row">
                                    {blogs.map((blog) => (
                                        <div className="col-md-6 mb-4" key={blog._id}>
                                            <div className="blog-card">
                                                <img src={blog.image} alt="Blog" className="blog-image" />
                                                <div className="blog-content">
                                                    <h5 className="blog-title">{blog.title}</h5>
                                                    <p className="blog-author">
                                                        <strong>Author:</strong> {blog.author?.name || blog.user?.name || "Unknown"}
                                                    </p>
                                                    <button className="read-more" onClick={() => setSelectedBlog(blog)}>Read More</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {selectedBlog && (
                <div className="modal-overlay" onClick={() => setSelectedBlog(null)}>
                    <div className="modal-content zoom-in" onClick={(e) => e.stopPropagation()}>
                        <span className="close" onClick={() => setSelectedBlog(null)}>&times;</span>
                        <img src={selectedBlog.image} alt="Blog" className="modal-image" />
                        <h2><strong>Title:</strong>  {selectedBlog.title}</h2>
                        <p><strong>Author:</strong> {selectedBlog.author?.name || "Unknown"}</p>
                        <p><strong>Content:</strong> {selectedBlog.content}</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default UserDashboard;