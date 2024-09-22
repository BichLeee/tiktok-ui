import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import styles from './Following.module.scss';

import Button from '~/components/Button';
import Loader from '~/components/loader';
import { VideoPreview } from '~/components/Video';
import VideosList from '~/components/Video/VideosList';
import Login from '~/layout/components/Login';
import { getUsers } from '~/services/accountService';
import { useUser } from '~/store/hooks';

const cx = classNames.bind(styles);

function Following() {
    const user = useUser();
    const [users, setUsers] = useState([]);

    const [showLoginModal, setShowLoginModal] = useState(false);

    const openLoginModal = () => setShowLoginModal(true);
    const closeLoginModal = () => setShowLoginModal(false);

    const fetchUsers = async (page) => {
        const res = await getUsers(page);
        if (res.status === 200) {
            setUsers((prev) => [...prev, ...res.data.data]);
        }
    };

    useEffect(() => window.scrollTo(top), []);

    return (
        <div className={cx('wrapper')}>
            {user.email ? (
                <VideosList videoType={'following'}></VideosList>
            ) : (
                <>
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={fetchUsers}
                        hasMore={true}
                        loader={<Loader primary />}
                        initialLoad={true}
                        key={'following-page'}
                        className={cx('account-container')}
                    >
                        {users.map((item, index) => (
                            <div
                                key={`${item.id} ${index}`}
                                className={cx('account-card')}
                            >
                                <div className={cx('video')}>
                                    <VideoPreview
                                        muted={true}
                                        playing={false}
                                        video_url={item.popular_video.file_url}
                                    />
                                </div>

                                <div className={cx('info')}>
                                    <img
                                        src={item.avatar}
                                        className={cx('avatar')}
                                    />
                                    <div className={cx('name')}>
                                        {item.first_name} {item.last_name}{' '}
                                        {item.tick && (
                                            <FontAwesomeIcon
                                                className={cx('check-icon')}
                                                icon={faCheckCircle}
                                            />
                                        )}
                                    </div>
                                    <div className={cx('nickname')}>
                                        {item.nickname}
                                    </div>
                                    <Button
                                        primary
                                        size="medium"
                                        className={cx('follow-btn')}
                                        onClick={openLoginModal}
                                    >
                                        <b>Follow</b>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </InfiniteScroll>
                    <Login
                        show={showLoginModal}
                        handleClose={closeLoginModal}
                    />
                </>
            )}
        </div>
    );
}

export default Following;
