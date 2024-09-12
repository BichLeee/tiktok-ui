import classNames from 'classnames/bind';
import { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCompass,
    faHeartCircleCheck,
    faHouse,
    faUserGroup,
    faVideo,
} from '@fortawesome/free-solid-svg-icons';

import styles from './Sidebar.module.scss';
import images from '~/assets/images';
import Image from '~/components/Image';
import { useUser } from '~/store/hooks';
import Footer from './Footer';
import Menu, { SuggestedAccounts } from './Menu';
import Login from '../Login';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faHouse} />,
        activeIcon: <FontAwesomeIcon icon={faHouse} style={{ color: 'red' }} />,
        title: 'Dành cho bạn',
        to: '/',
        auth: false,
    },
    {
        icon: <FontAwesomeIcon icon={faCompass} />,
        activeIcon: (
            <FontAwesomeIcon icon={faCompass} style={{ color: 'red' }} />
        ),
        title: 'Khám phá',
        to: '/explore',
        disable: true,
        auth: false,
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
        disable: false,
        auth: false,
    },
    {
        icon: <FontAwesomeIcon icon={faUserGroup} />,
        activeIcon: (
            <FontAwesomeIcon icon={faUserGroup} style={{ color: 'red' }} />
        ),
        title: 'Bạn bè',
        to: '/friends',
        disable: true,
        auth: true,
    },
    {
        icon: <FontAwesomeIcon icon={faVideo} />,
        activeIcon: <FontAwesomeIcon icon={faVideo} style={{ color: 'red' }} />,
        title: 'LIVE',
        to: '/live',
        disable: true,
        auth: false,
    },
];

function Sidebar() {
    const user = useUser();
    const avatar = user.avatar;

    const [show, setShow] = useState(false);

    const renderMenuItems = useCallback(
        () => [
            ...MENU_ITEMS.filter(
                (item) => !item.auth || (item.auth && user.email),
            ),
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
                ...(!user.email && { onClick: () => setShow(true) }),
                disable: false,
            },
        ],
        [avatar],
    );

    return (
        <>
            <div className={cx('wrapper')}>
                <aside className={cx('inner', 'styled-scroller')}>
                    <div className={cx('menu-container')}>
                        <Menu items={renderMenuItems()} />
                    </div>

                    {user.email && (
                        <>
                            <div className={cx('hr')} />
                            <div className={cx('following-container')}>
                                <span className={cx('following-title')}>
                                    Các tài khoản đang follow
                                </span>
                                <SuggestedAccounts />
                            </div>
                        </>
                    )}

                    <div className={cx('hr')} />
                    <div className={cx('following-container')}>
                        <Footer />
                    </div>
                </aside>
            </div>
            <Login show={show} handleClose={() => setShow(false)} />
        </>
    );
}

export default Sidebar;
