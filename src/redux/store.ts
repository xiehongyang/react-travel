
import {applyMiddleware, createStore} from 'redux';
import languageReducer from "../redux/language/languageReducer";
import recommendProductsReducer from "./recommendProducts/recommendProductsReducer";
import { thunk } from 'redux-thunk';
import {combineReducers, configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {productDetailSlice} from "../redux/productDetail/slice";
import {productSearchSlice} from "../redux/productSearch/slice";
import {userSlice} from "../redux/user/slice";
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import {shoppingCartSlice} from "../redux/shoppingCart/slice";
import {orderSlice} from "../redux/order/slice";
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
}

const rootReducer = combineReducers({
    language: languageReducer,
    recommendProducts: recommendProductsReducer,
    productDetail: productDetailSlice.reducer,
    productSearch: productSearchSlice.reducer,
    user: userSlice.reducer,
    shoppingCart: shoppingCartSlice.reducer,
    order: orderSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = createStore(rootReducer, undefined, applyMiddleware(thunk))
const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
});
const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export default {store, persistor};
