import React, {useEffect, useState} from "react";
import styles from "./Header.module.css";
import logo from "../../assets/logo.svg";
import {Layout, Typography, Input, Menu, Button, Dropdown} from "antd";
import {GlobalOutlined} from "@ant-design/icons";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useSelector} from '../../redux/hooks';
import {addLanguageActionCreator, changeLanguageActionCreator} from "../../redux/language/languageActions";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import jwt_decode, {JwtPayload as DefaultJwtPayload} from 'jwt-decode';
import {userSlice} from "../../redux/user/slice";
import rootStore from '../../redux/store';

interface JwtPayload extends DefaultJwtPayload {
    username: string;
}

export const Header: React.FC = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const location = useLocation();
    const params = useParams();
    const language = useSelector((state) => state.language.language);
    const languageList = useSelector((state) => state.language?.languageList);
    const jwt = useSelector(s => s.user.token);
    const shoppingCartItems = useSelector(s => s.shoppingCart.items);
    const shoppingCartLoading = useSelector(s => s.shoppingCart.loading);

    const [username, setUsername] = useState('');
    const dispatch = useDispatch();
    const menuClickHandler = (e) => {
        if (e.key === 'new') {
            dispatch(addLanguageActionCreator('新语言', 'new_lang') as any);
        } else {
            dispatch(changeLanguageActionCreator(e.key) as any);
        }
    }

    const onLogout = () => {
        dispatch(userSlice.actions.logOut());
        rootStore.persistor.purge();
        navigate('/');
    }

    useEffect(() => {
        if (jwt) {
            const token = jwt_decode<JwtPayload>(jwt);
            setUsername(token.aud as any);
        }
    }, [jwt]);

    return (
        <div className={styles["app-header"]}>
            {/* top-header */}
            <div className={styles["top-header"]}>
                <div className={styles.inner}>
                    <Typography.Text className={styles['no-wrap']} style={{width: 120}}>{t('header.slogan')}</Typography.Text>
                    <Dropdown.Button
                        style={{marginLeft: 15}}
                        overlay={
                            <Menu onClick={menuClickHandler}
                                  items={languageList.map((l) => {
                                      return {key: l.code, label: l.name}
                                  })}>
                                <Menu.Item key={"new"}>
                                    {t("header.add_new_language")}
                                </Menu.Item>
                            </Menu>
                        }
                        icon={<GlobalOutlined/>}
                    >
                        {language === 'zh' ? '中文' : 'English'}
                    </Dropdown.Button>
                    {
                        jwt ? <Button.Group className={styles["button-group"]}>
                                <span className={styles['no-wrap']} style={{marginRight: 20}}>{t('header.welcome')}
                                    <Typography.Text strong>{username}</Typography.Text>
                                </span>
                                <Button loading={shoppingCartLoading}
                                        onClick={() => navigate('/shoppingCart')}>
                                    {t("header.shoppingCart")}
                                    ({shoppingCartItems.length})
                                </Button>
                                <Button onClick={onLogout}>{t("header.signOut")}</Button>
                            </Button.Group> :
                            <Button.Group className={styles["button-group"]}>
                                <Button onClick={() => navigate('/register')}>{t('header.register')}</Button>
                                <Button onClick={() => navigate('/signin')}>{t('header.signin')}</Button>
                            </Button.Group>
                    }
                </div>
            </div>
            <Layout.Header className={styles["main-header"]}>
                <span onClick={() => navigate('/')}>
                    <img src={logo} alt="logo" className={styles["App-logo"]}/>
                    <Typography.Title level={3} className={styles.title}>
                        {t('header.title')}
                    </Typography.Title>
                </span>
                <Input.Search
                    placeholder={t('header.searchPlaceholder')}
                    className={styles["search-input"]}
                    onSearch={(keyword) => navigate('/search/' + keyword)}
                />
            </Layout.Header>
            <Menu
                mode={"horizontal"}
                className={styles["main-menu"]}
                items={[
                    {key: "1", label: t("header.home_page")},
                    {key: "2", label: t("header.weekend")},
                    {key: "3", label: t("header.group")},
                    {key: "4", label: t("header.backpack")},
                    {key: "5", label: t("header.private")},
                    {key: "6", label: t("header.cruise")},
                    {key: "7", label: t("header.hotel")},
                    {key: "8", label: t("header.local")},
                    {key: "9", label: t("header.theme")},
                    {key: "10", label: t("header.custom")},
                    {key: "11", label: t("header.study")},
                    {key: "12", label: t("header.visa")},
                    {key: "13", label: t("header.enterprise")},
                    {key: "14", label: t("header.high_end")},
                    {key: "15", label: t("header.outdoor")},
                    {key: "16", label: t("header.insurance")},
                ]}
            />
        </div>
    );
};
