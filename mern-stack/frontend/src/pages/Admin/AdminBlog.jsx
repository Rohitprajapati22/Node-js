import React, { useEffect, useState } from "react";
import Header from "../../component/Header";
import AdminSidebar from "../../component/AdminSidebar";
import { useAuth } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const [auth] = useAuth();
    const [selectedBlog, setSelectedBlog] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch("http://localhost:8000/admin/adminviewblog", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${auth?.token?.token}`,
                    },
                });

                const result = await response.json();

                if (response.ok && Array.isArray(result.data)) {
                    setBlogs(result.data);
                } else {
                    setBlogs([]);
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
                setBlogs([]);
            }
        };

        if (auth?.token?.token) {
            fetchBlogs();
        }
    }, [auth]);

    // Function to handle blog deletion
    const handleDelete = async (blogId) => {
        try {
            const response = await fetch(`http://localhost:8000/admin/deleteblog/${blogId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${auth?.token?.token}`,
                },
            });

            if (response.ok) {
                setBlogs(blogs.filter((blog) => blog._id !== blogId));
                toast.success("Blog deleted successfully!");
            } else {
                toast.error("Failed to delete blog.");
            }
        } catch (error) {
            console.error("Error deleting blog:", error);
            toast.error("Error deleting blog.");
        }
    };

    return (
        <div>
            <Header />
            <div className="container">
                <div className="row mt-5">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h2>All User Blogs</h2>
                        <div className="row ms-3">
                            {Array.isArray(blogs) && blogs.length > 0 ? (
                                blogs.map((blog) => (
                                    <div className="col-md-6 mb-4" key={blog._id}>
                                        <div className="card">
                                            {/* Blog Image */}
                                            {blog.image ? (
                                                <img
                                                    src={blog.image}
                                                    alt={blog.title}
                                                    className="card-img-top"
                                                    style={{ height: "200px", objectFit: "cover" }}
                                                />
                                            ) : (
                                                <p className="text-center mt-3">No Image Available</p>
                                            )}

                                            <div className="card-body">
                                                <h5 className="card-title">
                                                    <strong>Title :</strong> {blog.title}
                                                </h5>

                                                <p className="card-text">
                                                    <strong>Content :</strong> {blog.content?.substring(0, 100)}...
                                                </p>

                                                <p>
                                                <strong>Author :</strong> {blog.userId && blog.userId.name ? blog.userId.name : "Unknown"}
                                                </p>

                                                <div className="d-flex justify-content-between">
                                                    <button className="btn btn-primary me-2" onClick={() => setSelectedBlog(blog)}>
                                                        Read More
                                                    </button>
                                                    <button className="btn btn-danger" onClick={() => handleDelete(blog._id)}>
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No blogs available.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Blog Modal */}
            {selectedBlog && (
                <div className="blog-modal show" onClick={() => setSelectedBlog(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close" onClick={() => setSelectedBlog(null)}>&times;</span>
                        <img src={selectedBlog.image} alt={selectedBlog.title} className="modal-img" />
                        <h2><strong>Title : </strong> {selectedBlog.title}</h2>
                        <p><strong>Author : </strong> {selectedBlog.userId?.name || "Unknown"}</p>
                        <p><strong>Content : </strong> {selectedBlog.content}</p>
                    </div>
                </div>
            )}

            {/* Toast Message Container */}
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default AdminBlog;
