
export {}
// import React from "react";
// import styles from "./Header.module.css";
// import logo from "../../assets/logo.svg";
// import {Layout, Typography, Input, Menu, Button, Dropdown} from "antd";
// import {GlobalOutlined} from "@ant-design/icons";
// import {RouteComponentProps, withRouter} from "../../helpers/withRouter";
// import store from "../../redux/store";
// import {LanguageState} from "../../redux/language/languageReducer";
// import {WithTranslation, withTranslation} from "react-i18next";
// import {addLanguageActionCreator, changeLanguageActionCreator} from "../../redux/language/languageActions";
// import {connect} from "react-redux";
//
// interface State extends LanguageState {}
//
// const mapStateToProps = (state) => {
//     return {
//         language: state.language,
//         languageList: state.languageList
//     }
// }
//
//
// class HeaderComponent extends React.Component<RouteComponentProps & WithTranslation, State> {
//
//     constructor(props) {
//         super(props);
//         const storeState = store.getState();
//         this.state = {
//             language: storeState.language,
//             languageList: storeState.languageList
//         }
//         store.subscribe(this.handleStoreChange)
//     }
//
//     handleStoreChange = () => {
//         const storeState = store.getState();
//         this.setState({
//             language: storeState.language,
//             languageList: storeState.languageList
//         });
//     }
//     menuClickHandler = (e) => {
//         if (e.key === 'new') {
//             store.dispatch(addLanguageActionCreator('新语言', 'new_lang'));
//         } else {
//             store.dispatch(changeLanguageActionCreator(e.key));
//         }
//
//     }
//     render() {
//         const { navigate, t } = this.props;
//         return (<div className={styles["app-header"]}>
//             {/* top-header */}
//             <div className={styles["top-header"]}>
//                 <div className={styles.inner}>
//                     <Typography.Text className={styles['App-slogan']}>{t('header.slogan')}</Typography.Text>
//                     <Dropdown.Button
//                         style={{marginLeft: 15}}
//                         overlay={
//                             <Menu onClick={this.menuClickHandler}
//                                 items={this.state.languageList.map((l) => {
//                                     return {key: l.code, label: l.name}
//                                 })}>
//                                 <Menu.Item key={"new"}>
//                                     {t("header.add_new_language")}
//                                 </Menu.Item>
//                             </Menu>
//                         }
//                         icon={<GlobalOutlined/>}
//                     >
//                         {this.state.language === 'zh' ? '中文': 'English'}
//                     </Dropdown.Button>
//                     <Button.Group className={styles["button-group"]}>
//                         <Button onClick={() => navigate('/register')}>{t('header.register')}</Button>
//                         <Button onClick={() => navigate('/signin')}>{t('header.signin')}</Button>
//                     </Button.Group>
//                 </div>
//             </div>
//             <Layout.Header className={styles["main-header"]}>
//                 <span onClick={() => navigate('/')}>
//                     <img src={logo} alt="logo" className={styles["App-logo"]}/>
//                     <Typography.Title level={3} className={styles.title}>
//                         {t('header.title')}
//                     </Typography.Title>
//                 </span>
//                 <Input.Search
//                     placeholder={"请输入旅游目的地、主题、或关键字"}
//                     className={styles["search-input"]}
//                 />
//             </Layout.Header>
//             <Menu
//                 mode={"horizontal"}
//                 className={styles["main-menu"]}
//                 items={[
//                     { key: "1", label: t("header.home_page") },
//                     { key: "2", label: t("header.weekend") },
//                     { key: "3", label: t("header.group") },
//                     { key: "4", label: t("header.backpack") },
//                     { key: "5", label: t("header.private") },
//                     { key: "6", label: t("header.cruise") },
//                     { key: "7", label: t("header.hotel") },
//                     { key: "8", label: t("header.local") },
//                     { key: "9", label: t("header.theme") },
//                     { key: "10", label: t("header.custom") },
//                     { key: "11", label: t("header.study") },
//                     { key: "12", label: t("header.visa") },
//                     { key: "13", label: t("header.enterprise") },
//                     { key: "14", label: t("header.high_end") },
//                     { key: "15", label: t("header.outdoor") },
//                     { key: "16", label: t("header.insurance") },
//                 ]}
//             />
//         </div>)
//     }
// }
//
// export const Header= connect()(withTranslation()(withRouter(HeaderComponent)))
