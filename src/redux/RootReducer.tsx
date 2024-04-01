import { configureStore } from '@reduxjs/toolkit';
import Inventory from './Inventory';

const store = configureStore({
  reducer: {
    inventory: Inventory,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
