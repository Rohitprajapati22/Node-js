import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const [auth] = useAuth();

  return (
    <div className="bg-dark">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container p-1">
          <Link to="/" className="navbar-brand text-white">
            <img src="../src/assets/logo.png" width={200} alt="Logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {!auth?.token ? (
                <>
                  <li className="nav-item">
                    <Link to={`/`} className="nav-link active text-white fw-bold">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={`/register`} className="nav-link active text-white fw-bold">
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  {/* Common Menu for All Logged-in Users */}
                  <li className="nav-item">
                    <Link to={`/`} className="nav-link text-white fw-bold">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={`/about`} className="nav-link text-white fw-bold">
                      About
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={`/contact`} className="nav-link text-white fw-bold">
                      Contact
                    </Link>
                  </li>

                  {/* Admin Menu */}
                  {auth?.role === "admin" && (
                    <>
                      <li className="nav-item">
                        <Link to={`/admin/dashboard`} className="nav-link text-white fw-bold">
                          Admin Dashboard
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to={`/admin/users`} className="nav-link text-white fw-bold">
                          Manage Users
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to={`/admin/blogs`} className="nav-link text-white fw-bold">
                          Manage Blogs
                        </Link>
                      </li>
                    </>
                  )}

                  {/* User Menu */}
                  {auth?.role === "user" && (
                    <>
                      <li className="nav-item">
                        <Link to={`/user/dashboard`} className="nav-link text-white fw-bold">
                          User Dashboard
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to={`/user/my-blogs`} className="nav-link text-white fw-bold">
                          My Blogs
                        </Link>
                      </li>
                    </>
                  )}
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};


export default Header;
