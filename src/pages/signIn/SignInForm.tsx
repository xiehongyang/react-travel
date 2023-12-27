import styles from "./SignInForm.module.css";
import {Form, Input, Button, Checkbox, message} from "antd";
import {useAppDispatch, useSelector} from "../../redux/hooks";
import {useNavigate} from "react-router-dom";
import {signIn} from "../../redux/user/slice";
import {useEffect} from "react";
import {useTranslation} from "react-i18next";

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

export const SignInForm = () => {

    const loading = useSelector(s => s.user.loading);
    const jwt = useSelector(s => s.user.token);
    const error = useSelector(s => s.user.error);
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {t} = useTranslation();

    const onFinish = (values: any) => {
        console.log("Success:", values);
        dispatch(signIn({
            email: values.username,
            password: values.password
        }));
        console.log('error', error);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    useEffect(() => {
        if (jwt !== null) {
            navigate("/");
        }
        if (error !== null) {
            messageApi.open({
                type: 'error',
                content: error,
            });
        }
    }, [jwt, error])

    return (
        <>{contextHolder}
            <Form
                {...layout}
                name="basic"
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className={styles["register-form"]}
            >
                <Form.Item
                    label={t('signIn.username')}
                    name="username"
                    rules={[{required: true, message: "Please input your username!"}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label={t('signIn.password')}
                    name="password"
                    rules={[{required: true, message: "Please input your password!"}]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        {t('signIn.submit')}
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};