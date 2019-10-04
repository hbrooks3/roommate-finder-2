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
        <SignInScreen />
      </header>
      <p>
        {/* User Signed In: {user && user.isSignedIn()} */}
      </p>
      <RoomList />
    </div>
  );
}

export default App;
