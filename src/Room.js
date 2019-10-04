import React, { useState, useEffect } from 'react';
import fire, { useFirestoreDoc, useAuth } from './fire';
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 24,
  },
  pos: {
    marginBottom: 12,
  },
});

// function CommentForm(props) {

// }

function Comment(props) {
  const time = props.time;
  const comment = props.comment;

  return (
    <div></div>
  );
}

function CommentSection(props) {
  const roomID = props.roomID;
  const ref = fire.firestore().collection('comments').where('room', '==', roomID);
  const { isLoading, data } = useFirestoreDoc(ref);

  return (
    data &&
    <div>
      <p>Comments:</p>
      {data.docs.map(doc => 
        <p>{doc.data().comment}</p>
      )}
      <form>
        <input type="text" name="comment" required />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

function RoomCard(props) {
  const room = props.room;
  const classes = useStyles();
  const {loadind, user} = useAuth(fire.auth());

  return (
    <div className="RoomBox">
      <h1>Room</h1>
      <p>{room.address}</p>
      <p>Rent: ${room.rent}/month</p>
      <p>Description: ${room.description}</p>
      <p>Shared: {room.shared ? `yes` : `no`}</p>
      <p>Perfered Sex: {
        room.sex == null ? 'not specified' : room.sex
      }</p>
      <p>{user == null ? '' : <CommentSection roomID={props.roomID}/>}</p>
    </div>
  );
}

function RoomList(props) {
  const ref = fire.firestore().collection('rooms');
  const { isLoading, data } = useFirestoreDoc(ref);

  if (isLoading) {
    return (
      <p>LOADING</p>
    );
  }

  return (
    data &&
    <div>
      {data.docs.map(doc => 
        <RoomCard room={doc.data()} roomID={doc.id} />)
      }
    </div>
  );
}

export default RoomList;