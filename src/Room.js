import React, { useState, useEffect } from 'react';
import fire, { useFirestoreDoc, useUser } from './fire';
import './App.css';
import CommentForm from './CommentForm'

function Comment(props) {
  const data = props.doc.data();
  const user = useUser();

  return (
    <div className="Comment">
      <p>{data.comment}</p>
      {user && user.uid == data.uid &&
        <p className='text small'>Posted By You</p>
      }
      <p></p>
    </div>
  );
}

function CommentSection(props) {
  const roomID = props.roomID;
  const ref = fire.firestore().collection('comments').where('room', '==', roomID).orderBy('time');
  const { dataIsLoading, data } = useFirestoreDoc(ref);
  const user = useUser();

  return (
    data &&
    <div>
      <p>Comments:</p>
      <ul>
      {data.docs.map(
        doc => <li key={doc.id}><Comment  doc={doc}/></li>
      )}
      </ul>
      <CommentForm roomID={roomID} uid={user.uid}/>
    </div>
  );
}

function RoomCard(props) {
  const room = props.room;
  const user = useUser();

  return (
    <div className="YellowBox">
      <h1>Room</h1>
      <p>Address: {room.address}</p>
      <p>Rent: ${room.rent}/month</p>
      <p>Description: {room.description}</p>
      <p>Shared: {room.shared ? `yes` : `no`}</p>
      <p>Perfered Sex: {
        room.sex == null ? 'not specified' : room.sex
      }</p>
      <div>{user == null ? '' : <CommentSection roomID={props.roomID}/>}</div>
    </div>
  );
}

function RoomList(props) {
  const ref = fire.firestore().collection('rooms').where('rent','<',props.maxRent);
  const { isLoading, data } = useFirestoreDoc(ref);

  if (isLoading) {
    return (
      <p>LOADING</p>
    );
  }

  return (
    data &&
    <div>
      {data.docs.map(
        doc => <RoomCard room={doc.data()} roomID={doc.id} key={doc.id}/>
      )}
    </div>
  );
}

export default RoomList;