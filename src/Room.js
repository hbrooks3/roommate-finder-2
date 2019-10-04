import React, { useState, useEffect } from 'react';
import fire, { useFirestoreDoc } from './fire';
import { Card } from '@material-ui/core';

function RoomBox(props) {
  const room = props.room;

  return (
    <div
      key={room.id}
      className="RoomBox"
    >
      <div>
        <h1>Room</h1>
        <p>Address: {room.address}</p>
        <p>Rent: {room.rent}</p>

      </div>
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
      {data.docs.map(doc => <RoomBox room={doc.data()}/>)}
    </div>
  );
}

export default RoomList;