const initState={
  limit : 3
}

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_POST_SUCCESS':
      return state;
    case 'UPDATE_POST_SUCCESS':
      console.log('update post success');
      return state;
    case 'CREATE_POST_ERROR':
      console.log('create post error');
      return state;
    case 'DELETE_POST_SUCCESS':
      console.log('DELETE_PROJECT_SUCCESS');
      return state;
    case 'DELETE_POST_ERROR':
      console.log( 'DELETE_PROJECT_ERROR');
      return state;
    case 'LIMIT_CHAGE':
      return {...state,limit: state.limit+action.payload};
    case 'LIMIT_INIT':
      return initState;
    default:
      console.log("여기로 온다고");

      return state;
  }
};

export default postReducer;
