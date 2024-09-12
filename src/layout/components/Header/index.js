import classNames from 'classnames/bind';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
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
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import styles from './Header.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import { faBell, faMessage } from '@fortawesome/free-regular-svg-icons';
import IconButton from '~/components/IconButton';
import Image from '~/components/Image';
import Search from '../Search';
import config from '~/config';
import Login from '../Login';
import { logout as logoutAccount } from '~/store/user';
import { useUser } from '~/store/hooks';
import { useDispatch } from 'react-redux';
import { logout } from '~/services/authService';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'Xem hồ sơ',
        auth: true,
    },
    {
        icon: <FontAwesomeIcon icon={faSeedling} />,
        title: 'Công cụ dành cho nhà sáng tạo',
        auth: false,
    },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: 'Cài đặt',
        auth: true,
    },
    {
        icon: <FontAwesomeIcon icon={faEarthAfrica} />,
        title: 'Tiếng Việt',
        children: [
            { code: 'en', title: 'English' },
            { code: 'vi', title: 'Tiếng Việt' },
            { code: 'en', title: 'English' },
            { code: 'vi', title: 'Tiếng Việt' },
            { code: 'en', title: 'English' },
            { code: 'vi', title: 'Tiếng Việt' },
            { code: 'en', title: 'English' },
            { code: 'vi', title: 'Tiếng Việt' },
            { code: 'en', title: 'English' },
            { code: 'vi', title: 'Tiếng Việt' },
            { code: 'en', title: 'English' },
            { code: 'vi', title: 'Tiếng Việt' },
            { code: 'en', title: 'English' },
            { code: 'vi', title: 'Tiếng Việt' },
            { code: 'en', title: 'English' },
            { code: 'vi', title: 'Tiếng Việt' },
            { code: 'en', title: 'English' },
            { code: 'vi', title: 'Tiếng Việt' },
        ],
        auth: false,
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Phản hồi và trợ giúp',
        to: '/feedback',
        auth: false,
    },
    {
        icon: <FontAwesomeIcon icon={faMoon} />,
        title: 'Chế độ tối',
        auth: false,
    },
    {
        title: 'hr',
        auth: true,
    },
];

function Header() {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const user = useUser();
    const dispatch = useDispatch();

    const renderMenuItems = () => [
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
            title: 'Đăng xuất',
            auth: true,
            onClick: async () => {
                try {
                    const res = await logout();
                    dispatch(logoutAccount());
                } catch (err) {
                    console.log(err);
                }
            },
        },
    ];

    return (
        <>
            <header className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('logo')}>
                        <Link to={config.routes.home}>
                            <img src={images.logo} alt="Tiktok-logo" />
                        </Link>
                    </div>

                    <div className={cx('search')}>
                        <Search />
                    </div>
                    <div className={cx('actions')}>
                        {user?.email ? (
                            <>
                                <Button
                                    size="medium"
                                    secondary
                                    className={cx('custom-upload')}
                                    leftIcon={<FontAwesomeIcon icon={faPlus} />}
                                >
                                    Tải lên
                                </Button>
                                <div style={{ width: '20px' }} />
                                <Tippy
                                    interactive
                                    arrow
                                    placement="bottom"
                                    content="Tin nhắn"
                                    className={cx('custom-tooltip')}
                                >
                                    <div>
                                        <IconButton
                                            light
                                            icon={
                                                <FontAwesomeIcon
                                                    icon={faMessage}
                                                />
                                            }
                                        />
                                    </div>
                                </Tippy>
                                <Tippy
                                    interactive
                                    arrow
                                    placement="bottom"
                                    content="Hộp thư"
                                    className={cx('custom-tooltip')}
                                >
                                    <div>
                                        <IconButton
                                            light
                                            icon={
                                                <FontAwesomeIcon
                                                    icon={faBell}
                                                />
                                            }
                                        />
                                    </div>
                                </Tippy>
                                <Menu items={renderMenuItems()}>
                                    <Image
                                        className={cx('account')}
                                        src={user.avatar}
                                        alt=""
                                        fallback={images.default_avatar}
                                    />
                                </Menu>
                            </>
                        ) : (
                            <>
                                <Button
                                    size="medium"
                                    primary
                                    onClick={() =>
                                        setShowLoginModal((prev) => !prev)
                                    }
                                >
                                    Đăng nhập
                                </Button>
                                <Menu items={MENU_ITEMS}>
                                    <button className={cx('more-btn')}>
                                        <FontAwesomeIcon
                                            icon={faEllipsisVertical}
                                        />
                                    </button>
                                </Menu>
                            </>
                        )}
                    </div>
                </div>
            </header>
            <Login
                show={showLoginModal}
                handleClose={() => setShowLoginModal(false)}
            />
        </>
    );
}

export default Header;
