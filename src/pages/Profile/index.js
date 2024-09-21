import { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { faBookmark, faHeart } from '@fortawesome/free-regular-svg-icons';
import {
    faFire,
    faPenToSquare,
    faRepeat,
    faShare,
    faTableCellsLarge,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import EditModal from './EditModal';
import VideoTab from './VideosTab';

import styles from './Profile.module.scss';

import Button from '~/components/Button';
import IconButton from '~/components/IconButton';
import { useUser } from '~/store/hooks';

const cx = classNames.bind(styles);

const TABS = [
    {
        key: 'video',
        title: 'Video',
        icon: <FontAwesomeIcon icon={faTableCellsLarge} />,
        content: <VideoTab />,
        disabled: false,
    },
    {
        key: 'reup',
        title: 'Bài đăng lại',
        icon: <FontAwesomeIcon icon={faRepeat} />,
        content: 'Không có bài đăng lại.',
        disabled: false,
    },
    {
        key: 'saved',
        title: 'Yêu thích',
        icon: <FontAwesomeIcon icon={faBookmark} />,
        content: 'Không có bài đã lưu.',
        disabled: false,
    },
    {
        key: 'liked',
        title: 'Đã thích',
        icon: <FontAwesomeIcon icon={faHeart} />,
        content: 'Không có bài đã thích.',
        disabled: false,
    },
];

function Profile() {
    const user = useUser();
    const [activeTab, setActiveTab] = useState(TABS[0]);

    // modal
    const [showEditModal, setShowEditModal] = useState(false);

    const handleCloseEditModal = () => setShowEditModal(false);

    useEffect(() => {
        window.scrollTo(top);
    }, []);

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <div>
                        <img src={user.avatar} className={cx('avatar')} />
                    </div>
                    <div className={cx('name-group')}>
                        <h1>
                            <b>{user.nickname}</b>
                        </h1>
                        <h4 className={cx('full-name')}>
                            {user.first_name} {user.last_name}
                        </h4>
                        <div className={cx('actions')}>
                            <Button
                                secondary
                                leftIcon={
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                }
                                className={cx('custom-button')}
                                onClick={() => setShowEditModal(true)}
                            >
                                Sửa hồ sơ
                            </Button>
                            <Button
                                secondary
                                leftIcon={<FontAwesomeIcon icon={faFire} />}
                                className={cx('custom-button')}
                            >
                                Quảng bá bài đăng
                            </Button>
                        </div>
                    </div>
                    <IconButton
                        className={cx('share-button')}
                        icon={<FontAwesomeIcon icon={faShare} />}
                    />
                </div>
                <div className={cx('statistics')}>
                    <div>
                        <span className={cx('number')}>
                            {user.followings_count || 0}
                        </span>{' '}
                        Đang follow
                    </div>
                    <div>
                        <span className={cx('number')}>
                            {user.followers_count || 0}
                        </span>{' '}
                        Follower
                    </div>
                    <div>
                        <span className={cx('number')}>
                            {user.likes_count || 0}
                        </span>{' '}
                        Thích
                    </div>
                </div>
                <div className={cx('bio')}>{user.bio}</div>
                <div className={cx('tabs-container')}>
                    <Tabs
                        accessKey={activeTab}
                        onSelect={(key) => setActiveTab(key)}
                        className={cx('tabs')}
                    >
                        {TABS.map((tab) => {
                            const Title = (
                                <>
                                    {tab.icon}
                                    <span className={cx('tab-title')}>
                                        {tab.title}
                                    </span>
                                </>
                            );

                            return (
                                <Tab
                                    eventKey={tab.key}
                                    title={Title}
                                    disabled={tab.disabled}
                                    key={tab.key}
                                    className={cx('tab')}
                                >
                                    <div className={cx('tab-content')}>
                                        {tab.content}
                                    </div>
                                </Tab>
                            );
                        })}
                    </Tabs>
                </div>
            </div>
            <EditModal show={showEditModal} closeModal={handleCloseEditModal} />
        </>
    );
}

export default Profile;
