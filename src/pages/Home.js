// import PropTypes from 'prop-types'
import styles from '../styles/home.module.css';
import { Comment,CreatePost,FriendsList,Loader,Post } from '../components';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth, usePosts } from '../hooks';


//module if yoou want to add log staement betwn jsx html code
// const ConsoleLog = ({ children }) => {
//   console.log(children);
//   return false;
// };
// <ConsoleLog>{ post.user }</ConsoleLog>


const Home = () => {
  const auth=useAuth();
  const posts=usePosts()
  

  if (posts.loading) {
    return <Loader />;
  }

  return (
    <div className={styles.home}>
    <div className={styles.postsList}>
    <CreatePost />
      {posts.data.map((post) => (
         <Post post={post} key={`post-${post._id}`} />
         ))}
 
    </div>
    {auth.user && <FriendsList />}
    </div>
  );
};


//we want props coming in Home should be array & if it is required then add .isRequired , not used as in home here we assemble post,not taken as prop now
// Home.propTypes={
//   posts:PropTypes.array.isRequired
// }
export default Home;
