import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  currentPhone: null,
  currentCompany: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload.name;
      state.currentPhone = action.payload.phone;
      state.currentCompany = action.payload.company;
    },
    logout: (state) => {
      state.currentUser = null;
      state.currentPhone = null;
      state.currentCompany = null;
    }
  },
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer