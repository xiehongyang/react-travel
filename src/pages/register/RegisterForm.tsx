import {Form, Input, Button, Checkbox, message} from "antd";
import styles from "./RegisterForm.module.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

export const RegisterForm = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const [messageApi, contextHolder] = message.useMessage();
    const onFinish = async (values: any) => {
        console.log("Success:", values);
        try {
            await axios.post("register", {
                email: values.username,
                password: values.password,
                confirmPassword: values.confirm,
            });
            messageApi.open({
                type: 'success',
                content: t('register.registerSuccess'),
            });
            setTimeout(() => navigate("/signIn/"), 1000);
        } catch (error) {
            messageApi.open({
                type: 'error',
                content: t('register.registerFail'),
            });
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

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

                <Form.Item
                    label={t('register.confirmPassword')}
                    name="confirm"
                    hasFeedback
                    rules={[
                        {required: true, message: "Please input your confirm password!"},
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(t('register.passwordEquality'));
                            },
                        }),
                    ]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        {t('signIn.submit')}
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};