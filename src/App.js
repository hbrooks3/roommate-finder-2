import React, { useState } from 'react';
import './App.css';
import { useUser, SignInScreen } from './fire';
import RoomList from './Room';
import RoomForm from './RoomForm';
import useForm from './Form';

function App() {
  const user = useUser();
  const [maxRent, setMaxRent] = useState(999);
  const {inputs, handleInputChange, handleSubmit} = useForm(updateFilter);

  function updateFilter() {
    console.log(`Filtering by ${inputs.maxRent}`);
    setMaxRent(inputs.maxRent);
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
            <label>Max Rent </label>
            <input
              required
              type="number"
              name="maxRent"
              onChange={handleInputChange}
              value={inputs.maxRent}
            />
            <button type="submit">Filter</button>
          </form>
        </div>
      </div>
      <div className='column main'>
        <RoomList maxRent={maxRent}/>
      </div>
    </div>
  );
}

export default App;
