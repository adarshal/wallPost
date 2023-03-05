import { Link } from 'react-router-dom';

import styles from '../styles/navbar.module.css';
import { useAuth } from '../hooks';
import { useEffect, useState } from 'react';
import { searchUsers } from '../api';

const Navbar = () => {
  const auth = useAuth();
  const [results,setResults]=useState([]);
  const [searchText,setSearchText]=useState('');

  useEffect(()=>{
    const fetchUsers= async()=>{
        const response=await searchUsers(searchText);
        if(response.success){

          setResults(response.data.users)
        }
    }
    if(searchText.length>2){

      fetchUsers();
    }else{
      setResults([])
    }
      },[searchText])
  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <Link to="/">
          <img
            alt=""
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          />
        </Link>
      </div>

<div className={styles.searchContainer}>
  <img className={styles.searchIcon} src="https://cdn-icons-png.flaticon.com/512/3031/3031293.png" alt="search-i" />
  <input placeholder='search Users' value={searchText} onChange={(e)=>setSearchText(e.target.value)} />
  {results.length >0 &&  (
          <div className={styles.searchResults}>
            <ul>
              {results.map((user) => (
                <li
                  className={styles.searchResultsRow}
                  key={`user-${user._id}`}
                  onClick={()=>setResults([])}
                >
                  <Link to={`/user/${user._id}`} >
                    <img
                      src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                      alt=""
                    />
                    <span>{user.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

</div>
<div></div>

      <div className={styles.rightNav}>
        {auth.user && (
          <div className={styles.user}>
            <Link to="/settings">
              <img
                src="https://cdn-icons-png.flaticon.com/128/3917/3917688.png"
                alt=""
                className={styles.userDp}
              />
             </Link>
            <span>{auth.user.name}</span>
          </div>
        )}

        <div className={styles.navLinks}>
          <ul>
            {auth.user ? (
              <>
                <li onClick={auth.logout}>Log out</li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Log in</Link>
                </li>
                <li>
                  <a href="/register">Register</a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
