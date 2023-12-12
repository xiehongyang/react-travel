
import {applyMiddleware, combineReducers, createStore} from 'redux';
import languageReducer from "../redux/language/languageReducer";
import recommendProductsReducer from "./recommendProducts/recommendProductsReducer";
import { thunk } from 'redux-thunk'

const rootReducer = combineReducers({
    language: languageReducer,
    recommendProducts: recommendProductsReducer
})



const store = createStore(rootReducer, undefined, applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState>;
export default store;
