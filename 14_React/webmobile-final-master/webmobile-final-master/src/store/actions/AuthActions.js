import Swal from 'sweetalert2'
export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(()=>{
        Swal.fire({
          type: 'success',
          title: 'SignIn success',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch(function(error) {
        var errorMessage = error.message;
        alert(errorMessage)
      })
  };
};
export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
    .auth()
    .signOut()
    .then(() => {
      Swal.fire({
        type: 'success',
        title: 'SignOut success',
        showConfirmButton: false,
        timer: 1500
      })
    }).catch(err => {
      console.log(err)
    });
    };
};
export const signUp = (newUser) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    console.log(newUser)
    firebase
    .auth()
    .createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then(resp => {
        Swal.fire({
          type: 'success',
          title: 'SignUp success',
          showConfirmButton: false,
          timer: 1500
        })
        return firestore
          .collection('users')
          .doc(resp.user.uid)
          .set({
            uid: resp.user.uid,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            initials: newUser.firstName,
            grade: 'normal',
            email: newUser.email,
            photoURL: newUser.photoURL,
            github: newUser.github,
          });
    })
  };
};

export const facebookLogin = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().languageCode = 'ko';
    facebookProvider.setCustomParameters({
      display: 'popup',
    });
    firebase
      .auth()
      .signInWithPopup(facebookProvider)
      .then(function(resp) {
        console.log(resp.user);
        firebase
          .firestore()
          .collection('users')
          .doc(resp.user.uid)
          .set({
            uid: resp.user.uid,
            firstName: resp.user.displayName,
            lastName: 'facebook',
            initials: resp.user.displayName,
            email: resp.user.email,
            grade: 'normal',
            photoURL: 'http://mariopartylegacy.com/wp-content/uploads/2011/08/marioprofile.png',
            github: '',
            
          });
      })
      .then(() => {
        Swal.fire({
          type: 'success',
          title: 'SignUp success',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch(err => {
        Swal.fire({
          type: 'error',
          title: 'SignUp error',
          showConfirmButton: false,
          timer: 1500
        })
      });
  };
};

 
export const updateAuth = (authdetail) => {
  console.log(authdetail)
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const profile = getState().firebase.profile;
    console.log(profile)
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;
      user.updateProfile({
        photoURL: authdetail.photoURL,
      }).then(
        function() {
        firestore.collection('users').doc(user.uid).set({
            uid: profile.uid,
            firstName: profile.firstName,
            lastName: profile.lastName,
            initials: profile.initials,
            email: profile.email,
            grade: profile.grade,
            photoURL: authdetail.photoURL,
            github: profile.github,
        })
        Swal.fire({
          type: 'success',
          title: 'Change success',
          showConfirmButton: false,
          timer: 1500
        })
      }).catch(function(error) {
        // An error happened.
      });
      
  };
};

// firebase.auth().currentUser.getIdTokenResult()
//   .then((idTokenResult) => {
//      // Confirm the user is an Admin.
//      if (!!idTokenResult.claims.admin) {
//        // Show admin UI.
//        showAdminUI();
//      } else {
//        // Show regular user UI.
//        showRegularUI();
//      }
//   })
//   .catch((error) => {
//     console.log(error);
//   });