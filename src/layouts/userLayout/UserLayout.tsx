import React from "react";
import styles from "./UserLayout.module.css";
import logo from "../../assets/logo.svg";
import {Link} from "react-router-dom";
import {CaretDownOutlined} from "@ant-design/icons";
import {Layout, Menu, Dropdown, Button} from "antd";
import {useTranslation} from "react-i18next";
import {addLanguageActionCreator, changeLanguageActionCreator} from "../../redux/language/languageActions";
import {useDispatch} from "react-redux";
import {useSelector} from "../../redux/hooks";

const {Header, Footer, Content} = Layout;

interface PropsTypes {
    children: React.ReactNode;
}

export const UserLayout: React.FC<PropsTypes> = (props) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const languageList = useSelector((state) => state.language?.languageList);
    const menuClickHandler = (e) => {
        dispatch(changeLanguageActionCreator(e.key) as any);
    }
    const menu = (
        <Menu onClick={menuClickHandler}
              items={languageList.map((l) => {
                  return {key: l.code, label: l.name}
              })}>
        </Menu>
    );

    return (
        <Layout className={styles["user-layout-container"]}>
            <Header className={styles["header"]}>
                <div className={styles["lang"]}>
                    <Dropdown overlay={menu}>
                        <Button>
                            {" "}
                            {t('signIn.chooseLanguage')} <CaretDownOutlined/>
                        </Button>
                    </Dropdown>
                </div>
            </Header>
            <Content className={styles["content"]}>
                <div className={styles["top"]}>
                    <div className={styles["content-header"]}>
                        <Link to="/">
                            <img alt="logo" className={styles["logo"]} src={logo}/>
                            <span className={styles["title"]}>{t('title')}</span>
                        </Link>
                    </div>
                    <div className={styles["desc"]}>
                    </div>
                    {props.children}
                </div>
            </Content>
            <Footer style={{textAlign: "center"}}></Footer>
        </Layout>
    );
};