import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from "redux-persist";
import userReducer from './userSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const persistConfig = {
  key: "root",
  storage
}

export const rootReducer = combineReducers({
  user: userReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})
export const persistor = persistStore(store)