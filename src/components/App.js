import { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  Navigate
} from "react-router-dom";

import { getPosts } from '../api';
import { useAuth } from '../hooks';
import { Home, Login, Signup,Settings, UserProfile } from '../pages';
import { Loader, Navbar, } from './';


const About = () => {
  return <h1>About</h1>;
};

const UserInfo = () => {
  return <h1>User</h1>;
};

const Page404 = () => {
  return <h1>404</h1>;
};

function PrivateRoute({ children }) {
  const auth=useAuth();
  //console.log(children,"dsfdf", rest )
  if (!auth.user) {
  return <Navigate to="/login"  />
}

// authorized so return child components
return children;
}

function App() {
  const auth = useAuth()
  //moved to pages
  // const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState([true]);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const response = await getPosts();
  //     console.log('response', response);
  //     if (response.success) {
  //       setPosts(response.data.posts);
  //     }
  //     setLoading(false);
  //   };

  //   fetchPosts();
  // }, []);

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/UserInfo" element={<UserInfo />} />
        <Route  path="/settings" element={<PrivateRoute>
                                <Settings />
                            </PrivateRoute>} />
        <Route  path="/user/:userId" element={<PrivateRoute>
                                <UserProfile />
                            </PrivateRoute>} />
        <Route  path='*' element={<Page404 />} />

        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
