import React, {useEffect} from "react";
import {FilterArea, Footer, Header, ProductList} from "../../components";
import styles from './SearchPage.module.css';
import {useLocation, useParams} from "react-router-dom";
import {useAppDispatch, useSelector} from "../../redux/hooks";
import {searchProduct} from "../../redux/productSearch/slice";
import {Spin} from "antd";

type MatchParams = {
    keywords: string;
}
export const SearchPage: React.FC = () => {
    const {keywords = ''} = useParams<MatchParams>();

    const loading = useSelector(state => state.productSearch.loading);
    const error = useSelector((s) => s.productSearch.error);
    const pagination = useSelector((s) => s.productSearch.pagination);
    const productList = useSelector((s) => s.productSearch.data);
    const dispatch = useAppDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(searchProduct({nextPage: 1, pageSize: 10, keywords}))
    }, [location]);

    const onPageChange = (nextPage, pageSize) => {
        dispatch(searchProduct({nextPage, pageSize, keywords}));
    }

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

    return <>
        <Header/>
        <div className={styles['page-content']}>
            <div className={styles['product-list-container']}>
                <FilterArea/>
            </div>
            <div className={styles['product-list-container']}>
                <ProductList data={productList} paging={pagination} onPageChange={onPageChange}/>
            </div>
        </div>
        <Footer/>
    </>
}