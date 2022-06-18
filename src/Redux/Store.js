import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'
import {combineReducers} from "redux";
import { persistReducer } from 'redux-persist'
import errorSlice from './Slice/errorSlice';
import userSlice from "./Slice/userSlice";

const reducers = combineReducers({
  errorReducer: errorSlice,
  userReducer: userSlice
});

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
});



export default store;
