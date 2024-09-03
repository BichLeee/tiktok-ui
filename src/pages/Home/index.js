import { Suspense, useEffect, useState } from 'react';
import { getTrendingVideo } from '~/services/videoService';
import { Video, VideoWrapper } from '~/components/Video';

import classNames from 'classnames/bind';

import styles from './Home.module.scss';
import Loading from '~/components/loading';
import { useCallback } from 'react';

const cx = classNames.bind(styles);

function Home() {
    const [muted, setMuted] = useState(true);
    const [videos, setVideos] = useState([]);
    const [page, setPage] = useState(1);

    const fetchVideo = useCallback(async () => {
        const res = await getTrendingVideo(page);
        if (res.status === 200) {
            setVideos((prev) => [...prev, ...res.data.data]);
            setPage((prev) => prev + 1);
        }
    }, [page]);

    useEffect(() => {
        const loadMore = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop + 1 >=
                document.documentElement.scrollHeight
            ) {
                fetchVideo();
            }
        };
        window.addEventListener('scroll', loadMore);
        return () => window.removeEventListener('scroll', loadMore);
    }, [fetchVideo]);

    if (page === 1) {
        fetchVideo();
    }

    console.log(page);

    return (
        <div className={cx('wrapper')}>
            {videos.map((video, index) => (
                <Suspense
                    fallback={
                        <div className={cx('loading-wrapper')}>
                            <Loading />
                        </div>
                    }
                    key={`${video.id} ${index}`}
                >
                    <VideoWrapper
                        liked={video.likes_count}
                        commented={video.comments_count}
                        saved={video.views_count}
                        shared={video.shares_count}
                        author={{ img: video.user.avatar, id: video.user.id }}
                    >
                        <Video
                            author={video.user.nickname}
                            title={video.description}
                            music_title={video.music}
                            video_url={video.file_url}
                            muted={muted}
                            setMuted={setMuted}
                        />
                    </VideoWrapper>
                </Suspense>
            ))}
        </div>
    );
}

export default Home;
