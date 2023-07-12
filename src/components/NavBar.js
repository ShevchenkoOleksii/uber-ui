import React, {useCallback, useContext, useEffect, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/HttpHook";
import {useMessage} from "../hooks/MessageHook";
import {Loader} from "./Loader";

export const NavBar = () => {
  const navigate = useNavigate();
  const {logout, token, ready} = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState('');
  const {request, loading} = useHttp();
  const message = useMessage();
  const roleStyles = {
    shipper: 'nav-wrapper purple darken-1',
    driver: 'nav-wrapper brown darken-1',
  };

  const fetchedUser = useCallback(async () => {
    try {
      const fetched = await request('/api/users/me', 'GET', null, {
        Authorization: `Bearer ${token}`,
      });
      setUserProfile(fetched.user);
    } catch (e) {
      message(e.message, 'message_error');
    }
  }, [token]);

  useEffect(() => {
    fetchedUser();
  }, [fetchedUser]);

  const logoutHandler = (event) => {
    event.preventDefault();
    logout();
    navigate("api/auth", { replace: true });
  }

  const goHome = (event) => {
    event.preventDefault();
  }

  if (loading || !ready) {
    return (
      <div style={{height: "0"}}>

      </div>
    )
  }

  if (userProfile.role === 'DRIVER') {
    return (
      <nav>
        <div className={roleStyles.driver}
             style={{padding: '0 2rem'}}>
          <a href="/" onClick={goHome} className="brand-logo">
            <strong>{userProfile.role}</strong>
            <i className="large material-icons">person</i>
          </a>

          <ul id="nav-mobile" className="right nav-list brown darken-1">
            <li><NavLink to={'/api/users/me'}>Profile</NavLink></li>
            <li><NavLink to={'/api/create'}>Create</NavLink></li>
            <li><NavLink to={'/api/trucks'}>Trucks</NavLink></li>
            <li><NavLink to={'/api/loads'}>Loads</NavLink></li>
            <li><NavLink to={'/api/loads/active'}>Active Loads</NavLink></li>
            <li><NavLink to={'/api/weather'}>Weather</NavLink></li>
            <li><a
              href="/"
              onClick={logoutHandler}
            >
              Log Out
            </a></li>
          </ul>
        </div>
      </nav>
    )
  }

  return (
    <nav>
      <div className={roleStyles.shipper}
           style={{padding: '0 2rem'}}>
        <a href="/" onClick={goHome} className="brand-logo">
          <strong>{userProfile.role}</strong>
          <i className="large material-icons">person</i>
        </a>

        <ul id="nav-mobile" className="right nav-list">
          <li><NavLink to={'/api/users/me'}>Profile</NavLink></li>
          <li><NavLink to={'/api/create_load'}>Create</NavLink></li>
          <li><NavLink to={'/api/loads'}>Loads</NavLink></li>
          <li><NavLink to={'/api/weather'}>Weather</NavLink></li>
          <li><a
            href="/"
            onClick={logoutHandler}
          >
            Log Out
          </a></li>
        </ul>
      </div>
    </nav>
  );
};