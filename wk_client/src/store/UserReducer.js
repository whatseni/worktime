const SET_USER = "SET_USER";
const CLEAR_USER = "CLEAR_USER";

export const loginUser = (user) => ({ type: SET_USER, currentUser: user });
export const logoutUser = () => ({ type: CLEAR_USER });

const initialState = {
  currentUser: null
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        currentUser: action.currentUser,
      };
    case CLEAR_USER:
      return {
        currentUser: null,
      };
    default:
      return state;
  }
}

export default userReducer;