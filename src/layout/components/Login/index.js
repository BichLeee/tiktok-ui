import classNames from 'classnames/bind';
import { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

import Button from '~/components/Button';
import Loading from '~/components/loader';
import styles from './Login.module.scss';
import { login } from '~/services/authService';
import { login as loginAction } from '~/store/actions';
import { useUser } from '~/store/hooks';
import { UserActions } from '~/store/user';

const cx = classNames.bind(styles);

function Login({ show, handleClose }) {
    const [user, dispatch] = useUser();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const hideError = () => {
        if (error) {
            setError(false);
        }
    };

    const handleLogin = async () => {
        try {
            setLoading(true);
            const res = await login(email, password);
            const data = res.data.data;
            dispatch(loginAction({ email: data.email, data }));
            setError(false);
            handleClose();
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            className={cx('wrapper')}
            backdrop="static"
            centered
        >
            <Modal.Header closeButton className={cx('header')} />
            <Modal.Body className={cx('body')}>
                <h1 className={cx('title')}>
                    <b>Đăng nhập</b>
                </h1>
                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            value={email}
                            className={cx('grey-input')}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            placeholder="Email"
                            onClick={hideError}
                        />
                    </Form.Group>
                    <Form.Group
                        className={('mb-3', cx('password'))}
                        controlId="password"
                    >
                        <Form.Control
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            className={cx('grey-input')}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            placeholder="Mật khẩu"
                            onClick={hideError}
                        />
                        <button
                            className={cx('show-pw-btn')}
                            onClick={() => setShowPassword((prev) => !prev)}
                            type="button"
                        >
                            <FontAwesomeIcon
                                icon={showPassword ? faEye : faEyeSlash}
                            />
                        </button>
                    </Form.Group>
                    {error && (
                        <div className={cx('error')}>
                            Sai tài khoản hoặc mật khẩu. Hãy thử lại.
                        </div>
                    )}
                    <a href="#" className={cx('forgot-password-link')}>
                        Quên mật khẩu?
                    </a>
                    <Button
                        primary={email !== '' && password != ''}
                        size="large"
                        className={cx('login-button')}
                        disabled={email == '' || password == ''}
                        type="submit"
                    >
                        {loading ? <Loading /> : 'Đăng nhập'}
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer className={cx('footer')}>
                <p>
                    Bạn không có tài khoản?{' '}
                    <a href="#" className={cx('sign-up-link')}>
                        Đăng ký
                    </a>
                </p>
            </Modal.Footer>
        </Modal>
    );
}

export default Login;
