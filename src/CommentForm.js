import React from 'react';
import fire from './fire';

class CommentForm extends React.Component {
  constructor(roomID) {
    super();
    this.state = {
      comment: ``,
      dateTime: ``,
    };
    this.room = roomID;
  }

  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  addUser = e => {
    e.preventDefault();
    const db = fire.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    const userRef = db.collection(`users`).add({
      room: '',
      time: Date.now(),
      uid: '',
      comment: this.state.comment
    });
    this.setState({
      fullname: ``,
      email: ``,
    });
  };
  
  render() {
    return (
      <form onSubmit={this.addUser}>
        <input
          type="text"
          name="fullname"
          placeholder="Full name"
          onChange={this.updateInput}
          value={this.state.fullname}
        />
        <input
          type="email"
          name="email"
          placeholder="Full name"
          onChange={this.updateInput}
          value={this.state.email}
        />
        <button type="submit">Submit</button>
        <label>Comment</label>
        <input
          type="text"
          name="comment"
          onChange={this.updateInput}
          value={this.state.email}
          required
        />
        <button type="submit">Post</button>
      </form>
      );
    }
  }
export default CommentForm;