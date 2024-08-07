import classNames from 'classnames/bind';
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

import styles from './Header.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import { faBell, faMessage } from '@fortawesome/free-regular-svg-icons';
import IconButton from '~/components/IconButton';

import Image from '~/components/Image';
import Search from '../Search';

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
    const currentUser = true;

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <Link to="/">
                        <img src={images.logo} alt="Tiktok-logo" />
                    </Link>
                </div>
                <Search />
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
                            <div style={{ width: '20px' }} />
                            <Tippy
                                interactive
                                placement="bottom"
                                content="Tin nhắn"
                                className={cx('custom-tooltip')}
                            >
                                <div>
                                    <IconButton light icon={<FontAwesomeIcon icon={faMessage} />} />
                                </div>
                            </Tippy>
                            <Tippy
                                interactive
                                placement="bottom"
                                content="Hộp thư"
                                className={cx('custom-tooltip')}
                            >
                                <div>
                                    <IconButton light icon={<FontAwesomeIcon icon={faBell} />} />
                                </div>
                            </Tippy>
                            <Menu items={ACCOUNT_MENU_ITEMS}>
                                <Image
                                    className={cx('account')}
                                    src="./avatar.webp"
                                    alt=""
                                    fallback={images.default_avatar}
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
