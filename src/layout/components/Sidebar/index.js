import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    faCompass,
    faHeartCircleCheck,
    faHouse,
    faUserGroup,
    faVideo,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { t } from 'i18next';

import Login from '../Login';

import Footer from './Footer';
import Menu, { SuggestedAccounts } from './Menu';

import styles from './Sidebar.module.scss';

import images from '~/assets/images';
import Image from '~/components/Image';
import { useUser } from '~/store/hooks';

const cx = classNames.bind(styles);

function Sidebar() {
    const user = useUser();
    const avatar = user.avatar;

    const { t } = useTranslation();

    const [show, setShow] = useState(false);

    const renderMenuItems = useCallback(
        () => [
            {
                icon: <FontAwesomeIcon icon={faHouse} />,
                activeIcon: (
                    <FontAwesomeIcon icon={faHouse} style={{ color: 'red' }} />
                ),
                title: t('label.foryou'),
                to: '/',
                auth: false,
            },
            {
                icon: <FontAwesomeIcon icon={faCompass} />,
                activeIcon: (
                    <FontAwesomeIcon
                        icon={faCompass}
                        style={{ color: 'red' }}
                    />
                ),
                title: t('label.explore'),
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
                title: t('label.following'),
                to: '/following',
                disable: false,
                auth: false,
            },
            {
                icon: <FontAwesomeIcon icon={faUserGroup} />,
                activeIcon: (
                    <FontAwesomeIcon
                        icon={faUserGroup}
                        style={{ color: 'red' }}
                    />
                ),
                title: t('label.friends'),
                to: '/friends',
                disable: true,
                auth: true,
            },
            {
                icon: <FontAwesomeIcon icon={faVideo} />,
                activeIcon: (
                    <FontAwesomeIcon icon={faVideo} style={{ color: 'red' }} />
                ),
                title: t('label.live'),
                to: '/live',
                disable: true,
                auth: false,
            },
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
                title: t('label.profile'),
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
                                    {t('label.followingAcc')}
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
