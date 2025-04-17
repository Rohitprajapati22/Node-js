import React, { useEffect, useState } from 'react'
import Header from '../../component/Header'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import AdminSidebar from '../../component/AdminSidebar'
import { useAuth } from '../../context/AuthContext'

const Adminuser = () => {
    const [auth, setAuth] = useAuth();
    const [users, setUsers] = useState([])
    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            let res = await fetch(`http://localhost:8000/admin/alluser`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth?.token?.token}`
                }
            })
            let data = await res.json();
            if (data.success) {
                let filteruser = data.users.filter(val => val.role == "user");
                setUsers(filteruser)
            }

        } catch (err) {
            console.log(err)
            return false
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])

    const deleteUser = async (id) => {
        try {
            let res = await fetch(`http://localhost:8000/admin/deleteuser?userid=${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth?.token?.token}`
                }
            })
            let data = await res.json();
            if (data.success) {
                toast.error("User successfully delete");
                fetchUser();
            }
        } catch (err) {
            console.log(err);
            return false;

        }
    }

    return (

        <>
            <Header />
            <div className="container">
                <div className="row mt-5">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className='col-md-9'>
                        <table className="table border ms-3">
                            <thead className='p-3'>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Password</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">Contact</th>
                                    <th scope="col">City</th>
                                    <th>Image</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((val, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{val.name}</td>
                                                <td>{val.email}</td>
                                                <td>{val.password}</td>
                                                <td>{val.gender}</td>
                                                <td>{val.contact}</td>
                                                <td>{val.city}</td>
                                                <td>
                                                    <img src={val.image} width="100" />
                                                </td>
                                                <td className='action'>
                                                    <button className='btn btn-danger btn-sm' onClick={() => deleteUser(val?._id)}>Delete</button>&nbsp;
                                                    <button className='btn btn-primary btn-sm' onClick={() => navigate(`/admin/edituser`, { state: val })}>Edit</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>


                    </div>
                </div>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

        </>
    )
}

export default Adminuser