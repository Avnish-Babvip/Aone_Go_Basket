import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { encryptTransform } from "redux-persist-transform-encrypt";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import references from "./slices/references";
import authentication from "./slices/authentication";
import adminUser from "./slices/adminUser";
import customer from "./slices/customer";
import role from "./slices/role";
import permission from "./slices/permission";
import category from "./slices/category";
import attribute from "./slices/attribute";
import product from "./slices/product";
import rider from "./slices/rider";
import order from "./slices/order";

const rootReducer = combineReducers({
  references,
  authentication,
  adminUser,
  customer,
  role,
  permission,
  category,
  attribute,
  product,
  rider,
  order,
});

// Redux-persist configuration
const persistConfig = {
  key: "AONE ADMIN",
  version: 1,
  storage,
  transforms: [
    encryptTransform({
      secretKey: `${import.meta.env.VITE_REACT_APP_REDUX_PERSIST_SECRET_KEY}`,
      onError: (err) => {
        // Handle encryption errors if any
      },
    }),
  ],
};

// Persisted root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure and create the Redux store
const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
