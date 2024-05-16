import { configureStore,combineReducers  } from '@reduxjs/toolkit';
import productReducer from '../features/product/productSlice.js';
import authReducer from "../features/auth/authSlice.js"
import cartReducer from "../features/cart/cartSlice.js"
import userReducer from "../features/user/userSlice.js"
import orderReducer from "../features/order/orderSlice.js"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 


const rootReducer = combineReducers({
  product: productReducer,
    auth: authReducer,
    cart : cartReducer,
    user : userReducer,
    order : orderReducer
});

const persistConfig = {
  key : 'root',
  version : 1,
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
  }),
});

export const persistor = persistStore(store);