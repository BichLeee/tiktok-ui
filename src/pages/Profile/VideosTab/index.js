import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './VideoTab.module.scss';

import { VideoPreview } from '~/components/Video';
import { getUserVideos } from '~/services/videoService';
import { useUser } from '~/store/hooks';

const cx = classNames.bind(styles);

function VideoTab() {
    const user = useUser();
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const getVideos = async () => {
            const res = await getUserVideos(user.id);
            if (res.status === 200) {
                setVideos(res.data.data);
            }
        };
        user.id && getVideos();
    }, []);

    return (
        <div className={cx('videos-container')}>
            {videos.length === 0 ? (
                'Bạn không có video nào.'
            ) : (
                <>
                    {videos.map((video) => (
                        <div className={cx('video')} key={video.id}>
                            <VideoPreview
                                muted={true}
                                playing={false}
                                video_url={video.file_url}
                            />
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}

export default VideoTab;
