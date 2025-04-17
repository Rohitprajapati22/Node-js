import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../component/Header";
import UserSidebar from "../../component/UserSidebar"; // ✅ Sidebar Added
import { useNavigate } from "react-router-dom";

const AddBlog =  () => {
    const [auth] = useAuth();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            toast.warn("Please select an image!");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("image", image);

        
        try {
            const response = await fetch(`http://localhost:8000/blog/addblog`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${auth?.token?.token}`,
                },
                body: formData,
            });

            console.log(response);
            

            const data = await response.json();      
                  

            if (response.ok) {
                toast.success("Blog posted successfully!");
                setTitle("");
                setContent("");
                setImage(null);
                document.getElementById("fileInput").value = "";

                setTimeout(() => {
                    navigate("/user/viewblog");
                }, 1000);
            } else {
                toast.error(data.message || "Failed to post blog.");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Something went wrong!");
        }
    };

    return (
        <>
            <Header />
            <div className="container mt-5">
                <div className="row">
                    {/* Sidebar Section */}
                    <div className="col-md-3">
                        <UserSidebar />
                    </div>

                    {/* Blog Form Section */}
                    <div className="col-md-9">
                        <div className="card ms-3 shadow-lg p-4 rounded-lg">
                            <h2 className="text-center mb-4">New Blog Entry 📝</h2>
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

                                <div className="mb-3">
                                    <label className="form-label">Upload Image</label>
                                    <input
                                        type="file"
                                        id="fileInput"
                                        className="form-control"
                                        onChange={handleImageChange}
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary w-100">
                                    Submit Blog
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
};

export default AddBlog;
