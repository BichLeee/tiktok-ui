import Menu, { SuggestedAccounts } from './Menu';

import classNames from 'classnames/bind';

import styles from './Sidebar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCompass,
    faHeartCircleCheck,
    faHouse,
    faUserGroup,
    faVideo,
} from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';
import Image from '~/components/Image';
import Footer from './Footer';
import { useUser } from '~/store/hooks';
import { useCallback } from 'react';
const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faHouse} />,
        activeIcon: <FontAwesomeIcon icon={faHouse} style={{ color: 'red' }} />,
        title: 'Dành cho bạn',
        to: '/',
    },
    {
        icon: <FontAwesomeIcon icon={faCompass} />,
        activeIcon: (
            <FontAwesomeIcon icon={faCompass} style={{ color: 'red' }} />
        ),
        title: 'Khám phá',
        to: '/explore',
        disable: true,
    },
    {
        icon: <FontAwesomeIcon icon={faHeartCircleCheck} />,
        activeIcon: (
            <FontAwesomeIcon
                icon={faHeartCircleCheck}
                style={{ color: 'red' }}
            />
        ),
        title: 'Đang Follow',
        to: '/following',
        disable: true,
    },
    {
        icon: <FontAwesomeIcon icon={faUserGroup} />,
        activeIcon: (
            <FontAwesomeIcon icon={faUserGroup} style={{ color: 'red' }} />
        ),
        title: 'Bạn bè',
        to: '/friends',
        disable: true,
    },
    {
        icon: <FontAwesomeIcon icon={faVideo} />,
        activeIcon: <FontAwesomeIcon icon={faVideo} style={{ color: 'red' }} />,
        title: 'LIVE',
        to: '/live',
        disable: true,
    },
];

function Sidebar() {
    const user = useUser();
    const avatar = user.avatar;

    const renderMenuItems = useCallback(
        () => [
            ...MENU_ITEMS,
            {
                icon: (
                    <Image
                        src={avatar}
                        alt=""
                        fallback={images.default_avatar}
                    />
                ),
                activeIcon: (
                    <Image
                        src={avatar}
                        alt=""
                        fallback={images.default_avatar}
                    />
                ),
                title: 'Hồ sơ',
                to: '/profile',
                disable: true,
            },
        ],
        [avatar],
    );

    return (
        <div className={cx('wrapper')}>
            <aside className={cx('inner', 'styled-scroller')}>
                <div className={cx('menu-container')}>
                    <Menu items={renderMenuItems()} />
                </div>
                <div className={cx('hr')} />
                <div className={cx('following-container')}>
                    <span className={cx('following-title')}>
                        Các tài khoản đang follow
                    </span>
                    <SuggestedAccounts />
                </div>
                <div className={cx('hr')} />
                <div className={cx('following-container')}>
                    <Footer />
                </div>
            </aside>
        </div>
    );
}

export default Sidebar;
