import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {Col, Row, Spin, DatePicker, Divider, Typography, Anchor, Menu, Button} from "antd";
import {Footer, Header, ProductIntro, ProductComments} from "../../components";
import styles from './DetailPage.module.css';
import {commentMockData} from "./mockup";
import {useDispatch} from "react-redux";
import {getProductDetail, productDetailSlice} from "../../redux/productDetail/slice";
import {useAppDispatch, useSelector} from "../../redux/hooks";
import {MainLayout} from "../../layouts/mainLayout";
import {ShoppingCartOutlined} from "@ant-design/icons";
import {addShoppingCartItem} from "../../redux/shoppingCart/slice";
import {useTranslation} from "react-i18next";

const {RangePicker} = DatePicker;

type MatchParams = {
    touristRouteId: string;
}

export const DetailPage: React.FC = () => {

    const {touristRouteId} = useParams<MatchParams>();
    const loading = useSelector(state => state.productDetail.loading);
    const error = useSelector(state => state.productDetail.error);
    const product = useSelector(state => state.productDetail.data);
    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    const jwt = useSelector(s => s.user.token) as string;
    const shoppingCartLoading = useSelector(s => s.shoppingCart.loading);

    useEffect(() => {
        if (touristRouteId) {
            dispatch(getProductDetail(touristRouteId))
        }
    }, []);

    if (loading) {
        return <Spin size="large"
                     style={{
                         marginTop: 200,
                         marginBottom: 200,
                         marginLeft: "auto",
                         marginRight: "auto",
                         width: "100%"
                     }}>
        </Spin>
    }

    if (error) {
        return <div>网站出错：{error}</div>
    }
    return <MainLayout>
        <div className={styles['product-intro-container']}>
            <Row>
                <Col span={13}>
                    <ProductIntro
                        title={product.title}
                        shortDescription={product.description}
                        price={product.originalPrice}
                        coupons={product.coupons}
                        points={product.points}
                        discount={product.price}
                        rating={product.rating}
                        pictures={product.touristRoutePictures.map((p) => p.url)}/>
                </Col>
                <Col span={11}>
                    <Button style={{marginTop: 50, marginBottom: 30, display: "block"}} type={"primary"}
                            danger loading={shoppingCartLoading}
                            onClick={() => {
                                dispatch(addShoppingCartItem({jwt, touristRouteId: product.id}))
                            }}
                    >
                        <ShoppingCartOutlined />
                        {t('detailPage.addToShoppingCart')}
                    </Button>
                    <RangePicker open style={{marginTop: 20}}/>
                </Col>
            </Row>
        </div>
        <Anchor className={styles['product-intro-anchor']}>
            <Menu mode="horizontal">
                <Menu.Item key="1">
                    <Anchor.Link href={"#feature"} title={t('detailPage.productFeature')}></Anchor.Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Anchor.Link href={"#fees"} title={t('detailPage.cost')}></Anchor.Link>
                </Menu.Item>
                <Menu.Item key="4">
                    <Anchor.Link href={"#notes"} title={t('detailPage.bookingGuidelines')}></Anchor.Link>
                </Menu.Item>
                <Menu.Item key="5">
                    <Anchor.Link href={"#comments"} title={t('detailPage.userComment')}></Anchor.Link>
                </Menu.Item>
            </Menu>
        </Anchor>
        <div id='feature' className={styles['product-detail-container']}>
            <Divider orientation={"center"}>
                <Typography.Title level={3}>{t('detailPage.productFeature')}</Typography.Title>
            </Divider>
            <div dangerouslySetInnerHTML={{__html: product.features}} style={{margin: 50}}></div>
        </div>
        <div id='fees' className={styles['product-detail-container']}>
            <Divider orientation={"center"}>
                <Typography.Title level={3}>{t('detailPage.cost')}</Typography.Title>
            </Divider>
            <div dangerouslySetInnerHTML={{__html: product.fees}} style={{margin: 50}}></div>
        </div>
        <div id='notes' className={styles['product-detail-container']}>
            <Divider orientation={"center"}>
                <Typography.Title level={3}>{t('detailPage.bookingGuidelines')}</Typography.Title>
            </Divider>
            <div dangerouslySetInnerHTML={{__html: product.notes}} style={{margin: 50}}></div>
        </div>
        <div id='comments' className={styles['product-detail-container']}>
            <Divider orientation={"center"}>
                <Typography.Title level={3}>{t('detailPage.userComment')}</Typography.Title>
            </Divider>
            <div style={{margin: 40}}>
                <ProductComments data={commentMockData}></ProductComments>
            </div>
        </div>
    </MainLayout>
}