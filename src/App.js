import React, { useState, useEffect } from 'react';
import './App.css';
import fire, { useFirestoreDoc, useAuth, SignInScreen } from './fire';
import RoomList from './Room';

function App() {
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
