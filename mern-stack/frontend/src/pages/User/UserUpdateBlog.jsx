import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserSidebar from "../../component/UserSidebar";
import Header from "../../component/Header";

const UpdateBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [auth] = useAuth();
    
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [existingImage, setExistingImage] = useState("");
    const [loading, setLoading] = useState(true);

    // Fetch existing blog details
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`http://localhost:8000/blog/getblog/${id}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${auth?.token?.token}`,
                    },
                });

                if (!response.ok) throw new Error("Failed to fetch blog");

                const data = await response.json();

                if (data.success) {
                    setTitle(data.blog.title);
                    setContent(data.blog.content);
                    setExistingImage(data.blog.image);
                } else {
                    toast.error("Blog not found!");
                }
            } catch (error) {
                console.error("Error fetching blog:", error);
                toast.error("Something went wrong!");
            } finally {
                setLoading(false);
            }
        };

        if (auth?.token?.token) {
            fetchBlog();
        }
    }, [id, auth]);

    // Handle image change
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    // Handle update submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        if (image) {
            formData.append("image", image);
        }

        try {
            const response = await fetch(`http://localhost:8000/blog/updateblog/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${auth?.token?.token}`,
                },
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Blog updated successfully!");
                setTimeout(() => {
                    navigate("/user/viewblog");
                }, 1000);
            } else {
                toast.error(data.message || "Failed to update blog.");
            }
        } catch (error) {
            console.error("Error updating blog:", error);
            toast.error("Something went wrong!");
        }
    };

    return (
        <>
            <Header />
            <div className="container mt-5">
                <div className="row">
                    {/* Sidebar */}
                    <div className="col-md-3">
                        <UserSidebar />
                    </div>

                    {/* Blog Update Form */}
                    <div className="col-md-9">
                        <div className="card ms-3 shadow-lg p-4 rounded-lg">
                            <h2 className="text-center mb-4">Update Your Blog ✏️</h2>

                            {loading ? (
                                <p className="text-center">Loading blog data...</p>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter blog title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Content</label>
                                        <textarea
                                            className="form-control"
                                            placeholder="Write your content..."
                                            rows="5"
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                            required
                                        ></textarea>
                                    </div>

                                    {existingImage && (
                                        <div className="mb-3">
                                            <label className="form-label">Current Image</label>
                                            <div className="mb-2">
                                                <img src={existingImage} alt="Current Blog" className="img-thumbnail" width="150" />
                                            </div>
                                        </div>
                                    )}

                                    <div className="mb-3">
                                        <label className="form-label">Upload New Image</label>
                                        <input
                                            type="file"
                                            id="fileInput"
                                            className="form-control"
                                            onChange={handleImageChange}
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary w-100">
                                        Update Blog
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
};

export default UpdateBlog;
