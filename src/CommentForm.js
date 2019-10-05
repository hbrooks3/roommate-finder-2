import React from 'react';
import fire from './fire';
import './App.css';

/**
 * Adapted from code at: https://medium.com/get-it-working/get-googles-firestore-working-with-react-c78f198d2364
 * TODO: Refactor into reusable form using hooks.
 */
class CommentForm extends React.Component {
  constructor() {
    super();
    this.state = {
      comment: ``,
    };
  }

  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  addComment = e => {
    e.preventDefault();
    const db = fire.firestore();
    db.collection(`comments`).add({
      room: this.props.roomID,
      time: Date.now(),
      uid: this.props.uid,
      comment: this.state.comment
    });
    this.setState({
      comment: ``,
    });
  };
  
  render() {
    return (
      <form onSubmit={this.addComment}>
        <input
          type="text"
          name="comment"
          onChange={this.updateInput}
          value={this.state.comment}
          required
        />
        <button className='post' type="submit">Post</button>
      </form>
      );
    }
  }
export default CommentForm;