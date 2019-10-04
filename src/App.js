import React, { useState, useEffect } from 'react';
import './App.css';
import fire, { useFirestoreDoc, useAuth, SignInScreen } from './fire';
// import User from './User';
import RoomList from './Room';


function App() {
  // fire.auth().signInAnonymously().catch(function(err) {
  //   console.log(err);
  // });

  const { isLoading, user } = useAuth(fire.auth());

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Roommate Finder
        </h1>
        <h2>
          Hi {user && user.displayName}
        </h2>
        <SignInScreen />
      </header>
      <RoomList />
      
    </div>
  );
}

export default App;
