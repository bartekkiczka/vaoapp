import { TUser } from './../types/UserTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  userData: TUser;
}

const initialState: UserState = {
  userData: {
    id: 0,
    name: '',
    surname: '',
    startDate: '',
    email: '',
    password: '',
    role: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<TUser>) => {
      state.userData = action.payload;
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
