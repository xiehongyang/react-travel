import React, {useEffect} from "react";
import {
    Skeleton,
    Switch,
    Card,
    Avatar,
    Button,
    Typography,
    Space,
    Tag,
    Table,
} from "antd";
import {DeleteOutlined, CheckCircleOutlined} from "@ant-design/icons";
import {ColumnsType} from "antd/es/table";
import {useTranslation} from "react-i18next";

const {Meta} = Card;
const {Title, Text} = Typography;

interface Item {
    key: number;
    item: string;
    amount: string | number | JSX.Element;
}

const columns: ColumnsType<Item> = [
    {
        title: "项目",
        dataIndex: "item",
        key: "item",
    },
    {
        title: "金额",
        dataIndex: "amount",
        key: "amount",
    },
];

interface PropsType {
    loading: boolean;
    originalPrice: number;
    price: number;
    onShoppingCartClear: () => void;
    onCheckout: () => void;
}

export const PaymentCard: React.FC<PropsType> = ({
                                                     loading,
                                                     originalPrice,
                                                     price,
                                                     onShoppingCartClear,
                                                     onCheckout,
                                                 }) => {
    const {t} = useTranslation();
    const paymentData: Item[] = [
        {
            key: 1,
            item: t("shoppingCart.originalPrice"),
            amount: <Text delete>¥ {originalPrice}</Text>,
        },
        {
            key: 3,
            item: t("shoppingCart.currentPrice"),
            amount: (
                <Title type="danger" level={2}>
                    ¥ {price}
                </Title>
            ),
        },
    ];

    return (
        <Card
            style={{width: 300, marginTop: 16}}
            actions={[
                <Button type="primary" danger onClick={onCheckout} loading={loading}>
                    <CheckCircleOutlined/>
                    {t('shoppingCart.pay')}
                </Button>,
                <Button onClick={onShoppingCartClear} loading={loading}>
                    <DeleteOutlined/>
                    {t('shoppingCart.clear')}
                </Button>,
            ]}
        >
            <Skeleton loading={loading} active>
                <Meta
                    title={<Title level={2}>{t('shoppingCart.total')}</Title>}
                    description={
                        <Table<Item>
                            columns={columns}
                            dataSource={paymentData}
                            showHeader={false}
                            size="small"
                            bordered={false}
                            pagination={false}
                        />
                    }
                />
            </Skeleton>
        </Card>
    );
};