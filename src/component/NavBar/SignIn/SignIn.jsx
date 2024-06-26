import React, { useState } from 'react';
import { Button, Modal, Input } from 'antd';
import { auth } from '../../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import styles from './styles.module.css'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import useEmailValidation from '../../../hooks/useEmailValidation';
import useErrorHandler from '../../../hooks/useErrorHandler';
import RegistModal from '../RegistModal/RegistModal'

export default function SignIn() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { email, setEmail, emailError, handleChange, validateEmail } = useEmailValidation();
    const [password, setPassword] = useState('');
    const [errorHandle, contextHolder] = useErrorHandler();


    function signIn(e) {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user;
            console.log(user)
            setEmail('');
            setPassword('');
            setIsModalOpen(false);
        }).catch((error) => errorHandle(error.message));
    }

    return (
        <>
            <Button onClick={() => setIsModalOpen(true)}>
                Sign In
            </Button>
            <Modal title="Create an account" open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
                <form className={styles.form_container}>
                    <p className={styles.title_input} >Select your email</p>
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        placeholder="Email"
                        onBlur={validateEmail}
                    />
                    {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                    <p className={styles.title_input} >Select your password</p>
                    <Input.Password
                        className={styles.pass_input}
                        placeholder="input password"
                        onChange={(e) => setPassword(e.target.value)}
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                    <div className={styles.footer_container} >
                        <span>If you still dont have you can <RegistModal /></span>
                        <button onClick={signIn} className={styles.btn} >Sign In</button>
                    </div>
                    {contextHolder}
                </form>
            </Modal>
        </>
    );
}
