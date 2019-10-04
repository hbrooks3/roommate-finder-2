import React, { useState, useEffect } from 'react';
import './App.css';
import fire, { useFirestoreDoc, useAuth, SignInScreen } from './fire';
import { Card, CardActions, CardContent, Button, Typography, AppBar, Drawer, Toolbar } from '@material-ui/core';
import RoomList from './Room';
import { makeStyles } from '@material-ui/styles';
import color from '@material-ui/core/colors/purple';

const useStyles = makeStyles({
  root: {
    background: 'white',
    color: 'yelllow'
  },
  card: {
    width: '50%',
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
  },
});

function App() {
  // fire.auth().signInAnonymously().catch(function(err) {
  //   console.log(err);
  // });

  const { isLoading, user } = useAuth(fire.auth());
  const classes = useStyles();

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Roommate Finder
        </h1>
      </header>
      <column className='column side'>
        <div className="RoomBox">
          <SignInScreen />
        </div>
        <div className="RoomBox">
          <button>Add Room</button>
        </div>
        <div className="RoomBox">
          <p>Filter Options</p>
        </div>
      </column>
      <column className='column middle'>
        <RoomList />
      </column>
    </div>
  );
}

export default App;
