import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { faBell, faMessage } from '@fortawesome/free-regular-svg-icons';
import {
    faArrowRightFromBracket,
    faCircleQuestion,
    faEarthAfrica,
    faEllipsisVertical,
    faGear,
    faMoon,
    faPlus,
    faSeedling,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import i18n from 'i18next';

import Login from '../Login';
import Search from '../Search';

import 'tippy.js/dist/tippy.css';
import styles from './Header.module.scss';

import images from '~/assets/images';
import Button from '~/components/Button';
import IconButton from '~/components/IconButton';
import Image from '~/components/Image';
import Menu from '~/components/Popper/Menu';
import config from '~/config';
import { logout } from '~/services/authService';
import { useUser } from '~/store/hooks';
import { changeLanguage } from '~/store/languages';
import { logout as logoutAccount } from '~/store/user';

const cx = classNames.bind(styles);

function Header() {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const user = useUser();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const navigate = useNavigate();

    const renderMenuItems = useCallback(
        () => [
            {
                icon: <FontAwesomeIcon icon={faUser} />,
                title: t('label.viewprofile'),
                onClick: () => navigate('/profile'),
                auth: true,
            },
            {
                icon: <FontAwesomeIcon icon={faSeedling} />,
                title: t('label.creator'),
                auth: false,
            },
            {
                icon: <FontAwesomeIcon icon={faGear} />,
                title: t('label.settings'),
                auth: true,
            },
            {
                icon: <FontAwesomeIcon icon={faEarthAfrica} />,
                title:
                    i18n.language === 'vi'
                        ? t('label.vietnamese')
                        : t('label.english'),
                childHeader: t('label.language'),
                children: [
                    {
                        code: 'en',
                        title: t('label.english'),
                        onClick: () => {
                            dispatch(changeLanguage({ lang: 'en' }));
                            location.reload();
                        },
                    },
                    {
                        code: 'vi',
                        title: t('label.vietnamese'),
                        onClick: () => {
                            dispatch(changeLanguage({ lang: 'vi' }));
                            location.reload();
                        },
                    },
                ],
                auth: false,
            },
            {
                icon: <FontAwesomeIcon icon={faCircleQuestion} />,
                title: t('label.feedback'),
                auth: false,
            },
            {
                icon: <FontAwesomeIcon icon={faMoon} />,
                title: t('label.darkmode'),
                auth: false,
            },
            {
                title: 'hr',
                auth: true,
            },
            {
                icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
                title: t('label.logout'),
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
        ],
        [i18n.language],
    );

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
                                    {t('label.upload')}
                                </Button>
                                <div style={{ width: '20px' }} />
                                <Tippy
                                    interactive
                                    arrow
                                    placement="bottom"
                                    content={t('label.messages')}
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
                                    content={t('label.inbox')}
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
                                    <b>{t('label.login')}</b>
                                </Button>
                                <Menu items={renderMenuItems()}>
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
