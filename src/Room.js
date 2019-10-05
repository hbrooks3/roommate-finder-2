import React, { useEffect, useState } from 'react';
import fire, { useFirestoreDoc, useUser } from './fire';
import './App.css';
import CommentForm from './CommentForm';

function Comment(props) {
  const data = props.doc.data();
  const user = useUser();

  return (
    <div className="Comment">
      <p>{data.comment}</p>
      {user && user.uid === data.uid &&
        <p className='text small'>Posted By You</p>
      }
      <p></p>
    </div>
  );
}

function CommentSection(props) {
  const roomID = props.roomID;
  const ref = fire.firestore().collection('comments').where('room', '==', roomID).orderBy('time');
  const { isLoading, data } = useFirestoreDoc(ref);
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

function FavoriteButton(props) {
  const roomID = props.roomID;
  const uid = props.uid;
  const ref = fire.firestore().collection('favorites').where('uid', '==', uid).where('room', '==', roomID);
  const {isLoading, data} = useFirestoreDoc(ref);

  function addFavorite() {
    fire.firestore().collection('favorites').add({
      room: roomID,
      uid: uid,
    });
  }

  function removeFavorite() {
    ref.get().then(doc => {
      doc.forEach(doc =>{
        doc.ref.delete();
      });
    });
  }

  if (!isLoading && data.size > 0) {
    return(
      <button className='button' onClick={removeFavorite}>Unfavorite</button> 
    );
  }
  return(
    <button className='button' onClick={addFavorite}>Favorite</button> 
  );
}

function RoomCard(props) {
  const room = props.room;
  const user = useUser();

  return (room.rent < props.filter.maxRent &&
    <div className="YellowBox">
      <h1>Room</h1>
      <p>Address: {room.address}</p>
      <p>Rent: ${room.rent}/month</p>
      <p>Description: {room.description}</p>
      <p>Shared: {room.shared ? `yes` : `no`}</p>
      <p>Perfered Sex: {
        room.sex == null ? 'not specified' : room.sex
      }</p>
      <div>
        {user &&
         <CommentSection roomID={props.roomID}/>
        }
      </div>
        {user &&
          <FavoriteButton roomID={props.roomID} uid={user.uid}/>
        }
    </div>
  );
}

function RoomList(props) {
  const ref = fire.firestore().collection('rooms').where('rent','<',props.maxRent);
  const { isLoading, data } = useFirestoreDoc(ref);

  useEffect(() => {
    console.log(`max rent prop: ${props.maxRent}`)
  })

  if (isLoading) {
    return (
      <p>LOADING</p>
    );
  }

  return (
    data &&
    <div>
      {data.docs.map(
        doc => <RoomCard filter={props.filter} room={doc.data()} roomID={doc.id} key={doc.id}/>
      )}
    </div>
  );
}

export default RoomList;