export const createComment = (comment, postId) => {
    return (dispatch, getState, {getFirestore}) => {
      const firestore = getFirestore();
      const profile = getState().firebase.profile;
      const authorId = getState().firebase.auth.uid;
      console.log(profile)
      firestore.collection('posts').doc(postId+"").collection("comments").add({
        ...comment,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: authorId,
        createdAt: new Date(),
        postId: postId,
        photoURL: profile.photoURL
      })
    }
  };


  export const deleteComment  = (commentId,postId) => {
    return (dispatch,getState,{getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('posts').doc(postId+"").collection("comments").doc(commentId+"").delete()
    }
  };

  export const updateComment = (comment,commentId,postId) => {
    return (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();
      const profile = getState().firebase.profile;
      const authorId = getState().firebase.auth.uid;
      firestore.collection('posts').doc(postId + "").collection('comments').doc(commentId+"").set({
        ...comment,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: authorId,
        createdAt: new Date(),
        postId: postId,
        photoURL: profile.photoURL
      })
    }
  };
  
  export const projectCreateComment = (comment,  projectId) => {
    return (dispatch, getState, {getFirestore}) => {
      const firestore = getFirestore();
      const profile = getState().firebase.profile;
      const authorId = getState().firebase.auth.uid;
      firestore.collection('projects').doc( projectId+"").collection("comments").add({
        ...comment,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: authorId,
        createdAt: new Date(),
        projectId:projectId,
        photoURL: profile.photoURL
    
      })
    }
  };

  export const projectDeleteComment  = (commentId,projectId) => {
    return (dispatch,getState,{getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('projects').doc(projectId+"").collection("comments").doc(commentId+"").delete()
    }
  };

  export const projectUpdateComment = (comment,commentId,projectId) => {
    return (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();
      const profile = getState().firebase.profile;
      const authorId = getState().firebase.auth.uid;
      firestore.collection('projects').doc(projectId + "").collection('comments').doc(commentId+"").set({
        ...comment,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: authorId,
        createdAt: new Date(),
        projectId:projectId,
        photoURL: profile.photoURL
      })
    }
  };
  