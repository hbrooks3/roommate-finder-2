import React from 'react';
import fire from './fire';

class CommentForm extends React.Component {
  constructor() {
    super();
    this.state = {
      comment: ``,
      dateTime: ``,
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
    db.settings({
      timestampsInSnapshots: true
    });
    const commentRef = db.collection(`comments`).add({
      room: this.props.roomID,
      time: Date.now(),
      uid: this.props.uid,
      comment: this.state.comment
    });
    this.setState({
      comment: ``,
      dateTime: ``,
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
        <button type="submit">Post</button>
      </form>
      );
    }
  }
export default CommentForm;