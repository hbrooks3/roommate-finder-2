import React, { useState, useEffect } from 'react';
import fire, { useFirestoreDoc, useAuth } from './fire';
import './App.css';
import CommentForm from './CommentForm'
import { useComment } from './Data'

function Comment(props) {
  const data = props.doc.data();

  return (
    <div className="Comment">
      <p>{data.comment}</p>
      <p className='text small'>Posted By {data.uid} At {Date(data.time)}</p>
      <p></p>
    </div>
  );
}


/**
 * 
 * <p>{doc.data().comment}</p>
 */
function CommentSection(props) {
  const roomID = props.roomID;
  const ref = fire.firestore().collection('comments').where('room', '==', roomID);
  const { dataIsLoading, data } = useFirestoreDoc(ref);
  const { userIsLoading, user } = useAuth(fire.auth());

  return (
    data &&
    <div>
      <p>Comments:</p>
      <ul>
      {data.docs.map(
        doc => <li><Comment key={doc.id} doc={doc}/></li>
      )}
      </ul>
      <CommentForm roomID={roomID} uid={user.uid}/>
    </div>
  );
}

function RoomCard(props) {
  const room = props.room;
  const {loadind, user} = useAuth(fire.auth());

  return (
    <div className="YellowBox">
      <h1>Room</h1>
      <p>{room.address}</p>
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
      {data.docs.map(
        doc => <RoomCard room={doc.data()} roomID={doc.id} key={doc.id}/>
      )}
    </div>
  );
}

export default RoomList;