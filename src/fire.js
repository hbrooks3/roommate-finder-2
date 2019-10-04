// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";
import React, { useState, useEffect } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'; 

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDUU56JDD0MTVHnXgFbbqhkpuvpYz-rZeM",
    authDomain: "roommate-finder-a6dc3.firebaseapp.com",
    databaseURL: "https://roommate-finder-a6dc3.firebaseio.com",
    projectId: "roommate-finder-a6dc3",
    storageBucket: "roommate-finder-a6dc3.appspot.com",
    messagingSenderId: "469846752920",
    appId: "1:469846752920:web:abc5f988e485fda929daed"
  };
  
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

/**
 * Hook for snapshot of firebase.
 * Adapted from "useFirestoreDoc" code at: https://medium.com/@sampsonjoliver/firebase-meet-react-hooks-db589c625106
 */
function useFirestoreDoc(ref) {
  const [docState, setDocState] = useState({
    isLoading: true,
    data: null
  });
  
  useEffect(() => {
    return ref.onSnapshot(doc => {
      setDocState({
        isLoading: false,
        data: doc      
      });
    });
  }, []);
  
  return docState;
}

/**
 * Returns current user or null if no user.
 * Adapted from "useAuth" code at: https://medium.com/@sampsonjoliver/firebase-meet-react-hooks-db589c625106
 */
function useUser() {
  const [user, setUser] = useState(null);
  const auth = fire.auth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user =>
      setUser(user)
    );
    return unsubscribe;
  }, [auth]);
  return user;
}

/**
 * Implements sign-in with Google account.
 * Code taken from example code: https://github.com/firebase/firebaseui-web
 */
class SignInScreen extends React.Component {

  // The component's Local state.
  state = {
    isSignedIn: false // Local signed-in state.
  };

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google as auth provider.
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = fire.auth().onAuthStateChanged(
        (user) => this.setState({isSignedIn: !!user})
    );
  }
  
  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    if (!this.state.isSignedIn) {
      return (
        <div>
          <p>Please sign-in:</p>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={fire.auth()}/>
        </div>
      );
    }
    return (
      <div>
        <p>Welcome {fire.auth().currentUser.displayName}! You are now signed-in!</p>
        <a onClick={() => fire.auth().signOut()}>Sign-out</a>
      </div>
    );
  }
}

export default fire;
export { useFirestoreDoc, SignInScreen, useUser};