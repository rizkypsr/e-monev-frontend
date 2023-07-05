import { createSlice } from '@reduxjs/toolkit';
import uuid from 'react-uuid';

const initialState = {
  triwulan: {},
  organization: {},
  occasions: [
    {
      id: uuid(),
    },
  ],
  purpose: {},
  program: {},
  indicator: '',
};

export const masterSlice = createSlice({
  name: 'master',
  initialState,
  reducers: {
    setTriwulan: (state, action) => {
      state.triwulan = action.payload;
    },
    setOrganization: (state, action) => {
      state.organization = action.payload;
    },
    setOccasions: (state, action) => {
      state.occasions = action.payload;
    },
    setPurpose: (state, action) => {
      state.purpose = action.payload;
    },
    setProgram: (state, action) => {
      state.program = action.payload;
    },
    setIndicator: (state, action) => {
      state.indicator = action.payload;
    },
    resetAll: () => ({ ...initialState }),
  },
});

export const {
  setTriwulan,
  setOrganization,
  setOccasions,
  setPurpose,
  setProgram,
  setIndicator,
  resetAll,
} = masterSlice.actions;
export default masterSlice.reducer;
