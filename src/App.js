import React, { useState } from 'react';
import './App.css';
import { useUser, SignInScreen } from './fire';
import RoomList from './Room';
import RoomForm from './RoomForm';
import useForm from './Form';

function App() {
  const user = useUser();
  
  const defaults = {
    maxRent: 999,
    favorites: false,
  }
  
  const {inputs, handleInputChange, handleSubmit, setInputs} = useForm(defaults, resetDefaults);

  function resetDefaults() {
    setInputs(defaults);
  }

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
          <form onSubmit={handleSubmit}>
            <div>
              <label>Max Rent </label>
              <input
                required
                type="number"
                name="maxRent"
                onChange={handleInputChange}
                value={inputs.maxRent}
              />
            </div>
            <button className='button' type="submit">Reset</button>
          </form>
        </div>
      </div>
      <div className='column main'>
        <RoomList
          maxRent={inputs.maxRent}
          filter={inputs}
        />
      </div>
    </div>
  );
}

export default App;
