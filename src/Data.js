import fire from './fire';
import { useState, useEffect } from 'react';

function useComment(commentID) {
  const [commentState, setCommentState] = useState({
      notEmpty: false,
      room: null,
      time: null,
      uid: null,
      comment: null,
  });

  const ref = fire.firestore().collection('comments').doc(commentID);
    
  useEffect(() => {
    return ref.onSnapshot(doc => {
      setCommentState({
        notEmpty: true,
        room: doc.data().room,
        time: doc.data().time,
        uid: doc.data().uid,
        comment: doc.data().comment,    
      });
    });
  }, []);
    
  return commentState;
}

export { useComment };