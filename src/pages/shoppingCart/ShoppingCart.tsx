import React from "react";
import {MainLayout} from "../../layouts/mainLayout";
import {Affix, Col, Row} from "antd";
import {useAppDispatch, useSelector} from "../../redux/hooks";
import {ProductList} from "../../components/index";
import styles from './ShoppingCart.module.css';
import {PaymentCard} from "../../pages/paymentCard/index";
import {checkout, clearShoppingCartItem} from "../../redux/shoppingCart/slice";
import {useNavigate} from "react-router-dom";


export const ShoppingCartPage: React.FC = (props) => {
    const loading = useSelector(s => s.shoppingCart.loading);
    const shoppingCartItems = useSelector(s => s.shoppingCart.items);
    const jwt = useSelector(s => s.user.token) as string;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return (
        <MainLayout>
            <Row>
                <Col span={16}>
                    <div className={styles['product-list-container']}>
                        <ProductList data={shoppingCartItems.map(s => s.touristRoute)}/>
                    </div>
                </Col>
                <Col span={8}>
                    <Affix>
                        <div className={styles['payment-card-container']}>
                            <PaymentCard
                                loading={loading}
                                originalPrice={shoppingCartItems
                                    .map((s) => s.originalPrice)
                                    .reduce((a, b) => a + b, 0)}
                                price={shoppingCartItems
                                    .map((s) => s.originalPrice * (s.discountPresent ? s.discountPresent : 1))
                                    .reduce((a, b) => a + b, 0)}
                                onCheckout={() => {
                                    if (shoppingCartItems.length <=0) {
                                        return;
                                    }
                                    dispatch(checkout(jwt));
                                    navigate('/placeOrder');
                                }}
                                onShoppingCartClear={() => {
                                    dispatch(clearShoppingCartItem({jwt, itemIds: shoppingCartItems.map(s => s.id)}))
                                }}
                            />
                        </div>
                    </Affix>
                </Col>
            </Row>
        </MainLayout>
    )
}