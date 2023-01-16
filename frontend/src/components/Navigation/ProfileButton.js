import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { useHistory, Link } from "react-router-dom";
import DemoFormModal from "../DemoFormModal";
import spotsReducer from "../../store/spots";


export default function ProfileButton({user}) {
  const history = useHistory()
  const dispatch = useDispatch ()
  const [showMenu, setShowMenu] = useState(false)
  const ulRef = useRef();

  const fakeCredentials = 'Demo-lition'
  const fakePassword = 'password'

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
        if (!ulRef.current.contains(e.target)) {
          setShowMenu(false);
        }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault()
    dispatch(sessionActions.logoutUser())
    closeMenu();
    history.push('/')
  }

  const handleCurrent = () => {
    closeMenu()
    history.push('/api/spots/current')
    
  }


  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden")

  return (
    <>
      <button className="drop-down" onClick={openMenu}>
        <i className="fa-solid fa-bars"/>
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>Username: {user.username}</li>
            <li>Name: {user.firstName} {user.lastName}</li>
            <li>Email: {user.email}</li>
            <li className="logout-list">
              <button className="logout-button" style={{fontFamily: 'Montserrat', borderStyle: 'solid', backgroundColor: 'mistyrose'}} onClick={logout}>Log Out</button>
            </li>
            <li className="logout-list">
              <button className="logout-button" onClick={() => handleCurrent()} style={{fontFamily: 'Montserrat', borderStyle: 'solid', backgroundColor: 'mistyrose'}}>My Hosted Locations</button>
            </li>
          </>
        ) : (
          <>
            <div>
              <OpenModalButton
                buttonText="Sign Up"
                onButtonClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div>
            <div>
              <OpenModalButton
                buttonText="Log In"
                onButtonClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </div>
            {/* <button onClick={() => dispatch(sessionActions.login(fakeCredentials, fakePassword))} className="demo-user" style={{hover: 'antiquewhite'}}>Demo User</button> */}
            <OpenModalButton
              buttonText="Demo User"
              onButtonClick={closeMenu}
              modalComponent={<DemoFormModal/>}
            />
          </>
        )}
      </ul>
    </>
  );
}