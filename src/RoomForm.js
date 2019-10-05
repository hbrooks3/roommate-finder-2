import React from 'react';
import fire from './fire';
import './App.css';

/**
 * Adapted from code at: https://medium.com/get-it-working/get-googles-firestore-working-with-react-c78f198d2364
 * TODO: Refactor into reusable form using hooks.
 */
class RoomForm extends React.Component {
  constructor() {
    super();
    this.state = {
      address: '',
      rent: 0,
      description: '',
      shared: false,
      sex: '',
    };
  }

  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  addRoom = e => {
    e.preventDefault();
    const db = fire.firestore();
    db.collection(`rooms`).add({
        address: this.state.address,
        rent: Number(this.state.rent),
        description: this.state.description,
        shared: this.state.shared,
        sex: this.state.sex,
        uid: this.props.uid,
    });
    this.setState({
        address: '',
        rent: 0,
        description: '',
        shared: false,
        sex: '',
    });
  };
  
  render() {
    return (
      <form onSubmit={this.addRoom}>
        <div>
            <label>Address </label>
            <input
            type="text"
            name="address"
            onChange={this.updateInput}
            value={this.state.address}
            required
            />
        </div>
        <div>
            <label>Rent </label>
            <input
            type="number"
            name="rent"
            onChange={this.updateInput}
            value={this.state.rent}
            required
            />
        </div>
        <div>
            <label>Description </label>
            <input
            type="text"
            name="description"
            onChange={this.updateInput}
            value={this.state.description}
            />
        </div>
        <div>
            <label>Shared </label>
            <input
            type="checkbox"
            name="shared"
            onChange={this.updateInput}
            value={this.state.shared}
            id="box27"
            />
        </div>
        <div>
            <label>Perfered Sex </label>
            <input
            type="text"
            name="sex"
            onChange={this.updateInput}
            value={this.state.sex}
            />
        </div>
        <button className='button' type="submit">Post</button>
      </form>
      );
    }
  }
export default RoomForm;