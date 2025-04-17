import React, { useState, useEffect } from "react";
import "./About.css";
import Header from "../component/Header";
import { useAuth } from "../context/AuthContext";

const About = () => {
    const [auth] = useAuth();
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalBlogs, setTotalBlogs] = useState(0);

    useEffect(() => {
        if (!auth?.token?.token || auth?.user?.role !== "admin") return;
        
        const fetchUser = async () => {
            try {
                let res = await fetch(`http://localhost:8000/admin/alluser`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${auth.token.token}`
                    }
                });
                let data = await res.json();
                if (data.success) {
                    setTotalUsers(data.users.length);
                }
            } catch (err) {
                console.log("Error fetching users:", err);
            }
        };

        const fetchBlogs = async () => {
            try {
                let res = await fetch(`http://localhost:8000/admin/totalblogs`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${auth.token.token}`
                    }
                });
                let data = await res.json();
                if (data.success) {
                    setTotalBlogs(data.totalBlogs);
                }
            } catch (err) {
                console.log("Error fetching blogs:", err);
            }
        };

        fetchUser();
        fetchBlogs();
    }, [auth]);

    return (
        <>
            <Header />
            <div className="main_about">
                <section className="about-section">
                    <div className="overlay">
                        <div className="About_container">
                            <h1>About Our Blog</h1>
                        </div>
                    </div>
                </section>
                <section className="netflixo-section">
                    <div className="left-About_container">
                        <div className="text-content">
                            <h1>Join Our Thriving Blogging Community</h1>
                            <p>
                                Whether you are an aspiring writer, a passionate storyteller, or an eager reader, our blog platform is the perfect place for you. We strive to create an engaging space where ideas, knowledge, and creativity come to life.
                            </p>
                            <p>
                                From insightful articles to compelling personal stories, our community-driven platform encourages diverse perspectives. We empower bloggers to share their voices and readers to explore new horizons through thought-provoking content.
                            </p>
                        </div>
                        {auth?.user?.role === "admin" ? (
                            <div className="stats-About_container">
                                <div className="stat-card">
                                    <span>{totalBlogs}+</span>
                                    <h4>Total Blogs</h4>
                                    <p>Explore a vast collection of well-crafted articles and informative posts.</p>
                                </div>
                                <div className="stat-card">
                                    <span>{totalUsers}+</span>
                                    <h4>Active Users</h4>
                                    <p>Become part of a dynamic community of readers and writers.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="extra-content ">
                                <h2>Dive Into the World of Blogging</h2>
                                <p>
                                    Discover a treasure trove of inspiring blog projects, covering topics like technology, lifestyle, travel, and more. Whether you're looking for inspiration or eager to start your own blogging journey, this is the place for you.
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="right-About_container">
                        <div className="image-About_container">
                            <img src="./src/assets/about_2.jpg" alt="Blogging" />
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default About;
