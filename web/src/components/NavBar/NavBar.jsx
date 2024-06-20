import { Link, routes } from "@redwoodjs/router";
import { useAuth } from "src/auth";
import * as React from 'react';

import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Switch from '@mui/material/Switch';


const NavBar = () => {

  const linkStyle = {
    textDecoration: 'none',
    color: 'white',
    fontSize: '20px',
    margin: '0 20px' // Adjust margin as needed for spacing between links
  };
  {/*This function will handle the meenu to close after selection and the logout feature initializes*/ }
  const handleLogout = (closePopup) => {
    logOut();
    closePopup();
    window.location.reload();
  };

  {/*This function is initialized to ract with the switch component which will change the backgroung color */ }
  const [checked, setChecked] = React.useState(true);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  {/*We are using a useEffect to update the background color in real time when the switch is set*/}
  useEffect(() => {
    if (checked) {
      document.body.style.background = 'linear-gradient(0deg, #01ACFC, white)';
    } else {
      document.body.style.background = 'linear-gradient(0deg, white, gray)';
    }
  }, [checked]);


  const { isAuthenticated, currentUser, logOut } = useAuth();
  return (
    <div>
      <nav id="main-Nav"
        style={{
          backgroundColor: 'black',
          height: '70px',
          width: '100%',
          padding: '0px',
          margin: '0px',
          position: 'fixed', // Ensure it stays at the top of the page
          top: '0',         // Align it to the top
          left: '0',        // Align it to the left
          boxSizing: 'border-box',
          display: 'flex',  // Use flexbox for layout
          justifyContent: 'space-between', // Space between items
          alignItems: 'center',
          paddingLeft: '20px', // Add some padding to the left
          paddingRight: '20px' // Add some padding to the right
        }}>
        <Link to={routes.home()} style={{
          fontSize: '33px', color: 'white', textDecoration: 'none', fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          // Add text shadow for more emphasis
        }}

          onMouseOver={(e) => {
            e.currentTarget.style.textDecoration = 'underline';
          }}

          onMouseOut={(e) => {
            e.currentTarget.style.textDecoration = 'none'
          }}

        >WeatherTracker</Link>
        {/*About and help section in the nav bar*/}
        <div style={{ display: 'flex', alignItems: 'center' }}>

          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />

          <Link to={routes.about()} style={{
            textDecoration: 'none',
            color: 'white',
            fontSize: '20px',
            margin: '0 20px'
          }}
            onMouseOver={(e) => {
              e.currentTarget.style.textDecoration = 'underline'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.textDecoration = 'none'
            }}
          >About</Link>

          <Link to={routes.help()} style={{
            textDecoration: 'none',
            color: 'white',
            fontSize: '20px',
            margin: '0 20px',
          }}
            onMouseOver={(e) => {
              e.currentTarget.style.textDecoration = 'underline'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.textDecoration = 'none'
            }}
          >Help</Link>

          {/*Created a conditiont statement for the login button or name with logout option*/}
          {isAuthenticated ?
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <Button variant="contained" {...bindTrigger(popupState)}>
                    {currentUser.name}
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={() => handleLogout(popupState.close)}>Logout</MenuItem>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>

            :
            <Link to={routes.login()} style={linkStyle}>Login</Link>
          }
        </div>
      </nav>
    </div >
  );
}

export default NavBar;
