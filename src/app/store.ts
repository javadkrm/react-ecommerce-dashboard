import { configureStore } from "@reduxjs/toolkit"
import authReducer from "@/features/auth/authSlice"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

const persistStorage = storage.default

const persistConfig = {
  key: "auth",
  storage: persistStorage,
}

const persistedReducer = persistReducer(persistConfig, authReducer)

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
