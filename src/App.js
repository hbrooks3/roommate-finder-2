import React, { useState } from 'react';
import './App.css';
import { useUser, SignInScreen } from './fire';
import RoomList from './Room';
import RoomForm from './RoomForm';

function App() {
  const user = useUser();
  const [maxRent, setMaxRent] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Roommate Finder
        </h1>
      </header>
      <div className='column side'>
        <div className="YellowBox">
          <h1>Account</h1>
          <SignInScreen />
        </div>
        {user &&
          <div className="YellowBox">
            <h1>Add Room</h1>
            <RoomForm uid={user.uid}/>
          </div>
        }
        <div className="YellowBox">
          <h1>Filter</h1>
          <div>
            <label>Max Rent </label>
            <input
              type='number'
            />
          </div>
        </div>
      </div>
      <div className='column main'>
        <RoomList />
      </div>
    </div>
  );
}

export default App;
