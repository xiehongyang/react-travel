import React, {useEffect} from "react";
import styles from './App.module.css';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {DetailPage, HomePage, PlaceOrderPage, RegisterPage, SearchPage, ShoppingCartPage, SignInPage} from './pages';
import {useAppDispatch, useSelector} from "./redux/hooks";
import {getShoppingCart} from "./redux/shoppingCart/slice";

const PrivateRoute = ({children}) => {
    const jwt = useSelector(s => s.user.token);
    return jwt ? children : <Navigate to="/signIn"></Navigate>
}

function App() {

    const jwt = useSelector(s => s.user.token);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (jwt) {
            dispatch(getShoppingCart(jwt))
        }
    }, [jwt])

    return (
        <div className={styles.App}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/signIn" element={<SignInPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/detail/:touristRouteId" element={<DetailPage/>}/>
                    <Route path='/search/'>
                        <Route path=':keywords' element={<SearchPage/>}></Route>
                        <Route path='' element={<SearchPage/>}></Route>
                    </Route>
                    <Route path="/shoppingCart" element={
                        <PrivateRoute>
                            <ShoppingCartPage/>
                        </PrivateRoute>
                    }></Route>
                    <Route
                        path="/placeOrder"
                        element={
                            <PrivateRoute>
                                <PlaceOrderPage />
                            </PrivateRoute>
                        }
                    />
                    <Route path="*" element={<h1>404 not found 页面去火星了! </h1>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
