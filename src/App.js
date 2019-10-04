import React from 'react';
import './App.css';
import { useUser, SignInScreen } from './fire';
import RoomList from './Room';

function App() {
  const user = useUser();

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Roommate Finder
        </h1>
      </header>
      <div className='column side'>
        <div className="YellowBox">
          <SignInScreen />
        </div>
        {user && <div className="YellowBox">
          <button>Add Room</button>
        </div>}
        <div className="YellowBox">
          <p>Filter Options</p>
        </div>
      </div>
      <div className='column main'>
        <RoomList />
      </div>
    </div>
  );
}

export default App;
