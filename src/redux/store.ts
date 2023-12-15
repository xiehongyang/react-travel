
import {applyMiddleware, createStore} from 'redux';
import languageReducer from "../redux/language/languageReducer";
import recommendProductsReducer from "./recommendProducts/recommendProductsReducer";
import { thunk } from 'redux-thunk';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {productDetailSlice} from "../redux/productDetail/slice";
import {productSearchSlice} from "../redux/productSearch/slice";

const rootReducer = combineReducers({
    language: languageReducer,
    recommendProducts: recommendProductsReducer,
    productDetail: productDetailSlice.reducer,
    productSearch: productSearchSlice.reducer
})



// const store = createStore(rootReducer, undefined, applyMiddleware(thunk))
const store = configureStore({
    reducer: rootReducer,
    devTools: true
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export default store;
