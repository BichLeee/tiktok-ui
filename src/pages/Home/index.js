import { useEffect, useState } from 'react';
import { getTrendingVideo } from '~/services/videoService';
import { Video, VideoWrapper } from '~/components/Video';

import classNames from 'classnames/bind';

import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    const [muted, setMuted] = useState(true);
    const [videos, setVideos] = useState([]);

    const fetchVideo = async () => {
        const res = await getTrendingVideo();
        if (res.status === 200) {
            setVideos((prev) => [...prev, ...res.data.data]);
        }
    };

    useEffect(() => {
        fetchVideo();
    }, []);

    useEffect(() => {
        const loadMore = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.scrollHeight
            ) {
                console.log('ending');
                fetchVideo();
            }
        };
        window.addEventListener('scroll', loadMore);
        return () => window.removeEventListener('scroll', loadMore);
    }, []);

    return (
        <div className={cx('wrapper')}>
            {videos.map((video, index) => (
                <VideoWrapper
                    liked={video.digg_count}
                    commented={video.comment_count}
                    saved={video.download_count}
                    shared={video.share_count}
                    author={{ img: video.author.avatar, id: video.author.id }}
                >
                    <Video
                        key={`${video.video_id} ${index}`}
                        author={video.author.nickname}
                        title={video.title}
                        music_title={video.music_info.title}
                        video_url={video.play}
                        muted={muted}
                        setMuted={setMuted}
                    />
                </VideoWrapper>
            ))}
        </div>
    );
}

export default Home;
