import firebase from '../../config/fbConfig';

let tokenList = [];
setTimeout(async ()=>{
  await firebase.firestore().collection('tokens').get().then((snapshot)=>{
    return snapshot.docs.map((doc)=>{
      tokenList.push(doc.data().token);
      return doc.data().token;
    })
  });
})

function sendToServer(title,body) {
  const json = {
    'registration_ids': tokenList,
    'notification': {
      'title': title,
      'body': body
    }
  }
  const opts = {
    method: 'POST',
    body: JSON.stringify(json),
    headers: {
      "Content-Type": "application/json",
      "Authorization": "key=" + "AAAAliy_W-4:APA91bE8UgsIF_To3UvhNmQMTZ3mIn7Q6kWcnRLLMZZNPYnpp-D3oIXi6OOwTBGxniSNCNLgqe7oSFTP7U_MlsnZ_BcfuRZRNQDtSGpO6aVRQSH6i2LqrZwVH6tq9QROdjCAPWW9gpU3",
    }
  };
  fetch('https://fcm.googleapis.com/fcm/send', opts).then(function(response) {
    return response.json();
  });
}
export const createPost = (post) => {
  sendToServer("새 포스트가 등록되었습니다.",{body:"["+post.title+"]"+"\n"+post.content});
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore.collection('posts').add({
      ...post,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorId,
      createdAt: new Date(),
    })
  }
};
export const deletePost = (postId) => {
  sendToServer("포스트가 삭제되었습니다.",{body:""});
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection('posts').doc(postId + "").delete()
  }
};

export const updatePost = (post, id) => {
  sendToServer("포스트가 수정되었습니다.",{body:"["+post.title+"]"+"\n"+post.content});
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore.collection('posts').doc(id + "").set({
      ...post,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorId,
      createdAt: new Date(),
    })
  }
};
