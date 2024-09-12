import { useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import styles from './Login.module.scss';

import Button from '~/components/Button';
import Loading from '~/components/loader';
import { login, signup } from '~/services/authService';
import { login as loginAccount } from '~/store/user';

const cx = classNames.bind(styles);

function Login({ show, handleClose }) {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [isRegister, setIsRegister] = useState(false);

    const hideError = () => {
        if (error) {
            setError(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isRegister) {
            try {
                setLoading(true);
                const res = await signup(email, password);

                if (res.status === 200) {
                    setIsRegister(false);
                    setError(false);
                }
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        } else {
            try {
                setLoading(true);
                const res = await login(email, password);

                if (res.status === 200) {
                    const data = res.data.data;
                    const token = res.data.meta.token;

                    dispatch(loginAccount({ data, token }));

                    setError(false);
                    handleClose();
                }
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }
    };

    const changeForm = (e) => {
        e.preventDefault();
        setIsRegister((prev) => !prev);
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
                    <b>{isRegister ? 'Đăng ký' : 'Đăng nhập'}</b>
                </h1>
                <Form onSubmit={handleSubmit}>
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
                            {isRegister
                                ? 'Email đã tồn tại.'
                                : 'Sai tài khoản hoặc mật khẩu. Hãy thử lại.'}
                        </div>
                    )}
                    {!isRegister && (
                        <a href="#" className={cx('forgot-password-link')}>
                            Quên mật khẩu?
                        </a>
                    )}
                    <Button
                        primary={email !== '' && password != ''}
                        size="large"
                        className={cx('login-button')}
                        disabled={email == '' || password == ''}
                        type="submit"
                    >
                        {loading ? (
                            <Loading />
                        ) : isRegister ? (
                            'Đăng ký'
                        ) : (
                            'Đăng nhập'
                        )}
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer className={cx('footer')}>
                {isRegister ? (
                    <p>
                        Bạn đã có tài khoản?{' '}
                        <a
                            href="#"
                            className={cx('sign-up-link')}
                            onClick={changeForm}
                        >
                            Đăng nhập
                        </a>
                    </p>
                ) : (
                    <p>
                        Bạn không có tài khoản?{' '}
                        <a
                            href="#"
                            className={cx('sign-up-link')}
                            onClick={changeForm}
                        >
                            Đăng ký
                        </a>
                    </p>
                )}
            </Modal.Footer>
        </Modal>
    );
}

export default Login;
