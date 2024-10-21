import { createSlice } from '@reduxjs/toolkit';
import { clear, getItem, setItem } from '../AsyncStorage';


const initialState = {
  userInfo: getItem('userInfo').then(),
};

if(initialState.userInfo.hasOwnProperty('_j')){
  initialState.userInfo = null;
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload.user;
      state.isLoggedIn = true;
      setItem('userInfo', action.payload.user);
    },
    logout: (state, action) => {
      state.userInfo = null;
      clear();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
