import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Login from './pages/Login';
import Register from './pages/Register';
import "./style.css";
import PrivateRoute from './Private/PrivateRoute';
import Admin from './pages/Admin/Admin';
import Adminuser from './pages/Admin/Adminuser';
import Adminedit from './pages/Admin/Adminedit';
import AdminProfile from './pages/Admin/AdminProfile';
import UserProfile from './pages/User/UserProfile';
import AddBlog from './pages/User/UserAddBlog';
import ViewBlog from './pages/User/Userviewblog';
import User from './pages/User/UserDashboard';
import AdminBlog from './pages/Admin/AdminBlog';
import UpdateBlog from './pages/User/UserUpdateBlog';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminProfileEdit from './pages/Admin/AdminProfileEdit';
import AdminProfileView from './pages/Admin/AdminProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path='/admin' element={<PrivateRoute allowedRoles={['admin']} />}>
          <Route path='dashboard' element={<Admin />} />
          <Route path='users' element={<Adminuser />} />
          <Route path='edituser' element={<Adminedit />} />
          <Route path="profile" element={<AdminProfileView />} />
          <Route path="profile/edit" element={<AdminProfileEdit />} />
          <Route path='adminblogs' element={<AdminBlog />} />
        </Route>

        <Route path='/user' element={<PrivateRoute allowedRoles={['user']} />}>
          <Route path='dashboard' element={<User />} />
          <Route path='changeprofile' element={<UserProfile />} />
          {/* <Route path="/profile" element={<AdminProfileView />} /> */}
          {/* <Route path="/profile/edit" element={<AdminProfileEdit />} /> */}
          <Route path='viewblog' element={<ViewBlog />} />
          <Route path='addblog' element={<AddBlog />} />
          <Route path="updateblog/:id" element={<UpdateBlog />} />
        </Route>

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App;
