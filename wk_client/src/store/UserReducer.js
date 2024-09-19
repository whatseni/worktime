const SET_USER = "SET_USER";
const CLEAR_USER = "CLEAR_USER";

export const loginUser = (user, phone, company) => ({ type: SET_USER, currentUser: user, currentPhone: phone, company: company });
export const logoutUser = () => ({ type: CLEAR_USER });

const initialState = {
  currentUser: null,
  currentPhone: null,
  currentCompany: null
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        currentUser: action.currentUser,
        currentPhone: action.currentPhone,
        currentCompany: action.company
      };
    case CLEAR_USER:
      return {
        currentUser: null,
        currentPhone: null
      };
    default:
      return state;
  }
}

export default userReducer;