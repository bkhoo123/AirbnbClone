import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';

import OpenModalButton from '../OpenModalButton';
import CreateSpotFormModal from '../CreateSpotFormModal';
import Tyler from '../Images/Tyler.jpg'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  
  
  return (
    <div className="nav-bar">
      <span > 
        <NavLink style={{textDecoration: "none"}} exact to="/"><img style={{width: '3vw'}} src={Tyler} alt="" /><span className="logo-name">airBKhoo</span></NavLink>
        
      </span>
      {isLoaded && (
        <span className="nav-rightcontainer">
          <div id={sessionUser === null ? "delete-hidden" : ""}>
            <OpenModalButton
            buttonText="Host Your Home"
            modalComponent={<CreateSpotFormModal/>}
            />
          </div>
          <ProfileButton user={sessionUser} />
        </span>
      )}
    </div>
    
  );
}

export default Navigation;
