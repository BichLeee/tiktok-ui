import { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faSpinner, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Header.module.scss';
import images from '~/assets/images';
import AccountItem from '~/components/AccountItem';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Header() {
    const [accounts, setAccounts] = useState([1]);

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="Tiktok-logo" />
                </div>

                <div className={cx('search')}>
                    <Tippy
                        visible={accounts.length > 0}
                        interactive
                        render={(attrs) => (
                            <div className={cx('search-results')} tabIndex="-1" {...attrs}>
                                <PopperWrapper>
                                    <h5 className={cx('search-title')}>Tài khoản</h5>
                                    <AccountItem />
                                    <AccountItem />
                                </PopperWrapper>
                            </div>
                        )}
                    >
                        <InputGroup className={cx('search-inner')}>
                            <Form.Control placeholder="Tìm kiếm" className={cx('input')} />
                            <button className={cx('clear')}>
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </button>
                            <FontAwesomeIcon icon={faSpinner} className={cx('loading')} />
                            <span className={cx('vertical-line')} />

                            <button className={cx('search-btn')}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </InputGroup>
                    </Tippy>
                </div>
                <div className={cx('actions')}>
                    <Button size="medium" primary>
                        Đăng nhập
                    </Button>
                    {/* <Button size="medium" primary className={cx('custom-login')}>
                        Đăng nhập
                    </Button> */}
                </div>
            </div>
        </header>
    );
}

export default Header;
