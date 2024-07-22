import { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMagnifyingGlass,
    faSpinner,
    faCircleXmark,
    faEllipsisVertical,
    faEarthAfrica,
    faSeedling,
    faCircleQuestion,
    faMoon,
    faPlus,
    faUser,
    faGear,
    faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Header.module.scss';
import images from '~/assets/images';
import AccountItem from '~/components/AccountItem';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';

const cx = classNames.bind(styles);

const MORE_MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faSeedling} />,
        title: 'Công cụ dành cho nhà sáng tạo',
    },
    {
        icon: <FontAwesomeIcon icon={faEarthAfrica} />,
        title: 'Tiếng Việt',
        children: [
            { code: 'en', title: 'English' },
            { code: 'vi', title: 'Tiếng Việt' },
        ],
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Phản hồi và trợ giúp',
        to: '/feedback',
    },
    { icon: <FontAwesomeIcon icon={faMoon} />, title: 'Chế độ tối' },
];

const ACCOUNT_MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'Xem hồ sơ',
    },
    {
        icon: <FontAwesomeIcon icon={faSeedling} />,
        title: 'Công cụ dành cho nhà sáng tạo',
    },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: 'Công cụ dành cho nhà sáng tạo',
    },
    {
        icon: <FontAwesomeIcon icon={faEarthAfrica} />,
        title: 'Tiếng Việt',
        children: [
            { code: 'en', title: 'English' },
            { code: 'vi', title: 'Tiếng Việt' },
        ],
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Phản hồi và trợ giúp',
        to: '/feedback',
    },
    { icon: <FontAwesomeIcon icon={faMoon} />, title: 'Chế độ tối' },
    'hr',
    { icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />, title: 'Đăng xuất' },
];

function Header() {
    const [accounts, setAccounts] = useState([]);

    const currentUser = true;

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
                    {currentUser ? (
                        <>
                            <Button
                                size="medium"
                                secondary
                                className={cx('custom-upload')}
                                leftIcon={<FontAwesomeIcon icon={faPlus} />}
                            >
                                Tải lên
                            </Button>
                            <Menu items={ACCOUNT_MENU_ITEMS}>
                                <img
                                    className={cx('account')}
                                    src="https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/4cfaa5c14950b5d6fea7def263c50c7e~c5_300x300.webp?lk3s=a5d48078&nonce=5047&refresh_token=86a7278b155d0510262fe698c9800543&x-expires=1721826000&x-signature=BFcJXzhYZ7ZB%2F9RJlyraGtnYky4%3D&shp=a5d48078&shcp=c1333099"
                                    alt=""
                                />
                            </Menu>
                        </>
                    ) : (
                        <>
                            <Button size="medium" primary>
                                Đăng nhập
                            </Button>
                            <Menu items={MORE_MENU_ITEMS}>
                                <button className={cx('more-btn')}>
                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                </button>
                            </Menu>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
