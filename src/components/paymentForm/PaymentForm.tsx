import React from "react";
import { Input, Card } from "antd";
import styles from "./PaymentForm.module.css";
import {useTranslation} from "react-i18next";

export const PaymentForm = () => {

    const {t} = useTranslation();
    return (
        <Card
            title={t('placeOrder.creditCard')}
            bordered={false}
            className={styles["payment-credit-card"]}
        >
            <Input placeholder="don't need to type anything" />
        </Card>
    );
};