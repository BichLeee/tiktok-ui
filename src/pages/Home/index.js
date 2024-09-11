import { Suspense, useEffect, useState } from 'react';
import { getTrendingVideo } from '~/services/videoService';
import { Video, VideoWrapper } from '~/components/Video';

import classNames from 'classnames/bind';

import styles from './Home.module.scss';
import Loading from '~/components/loader';
import { useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Loader from '~/components/loader';

const cx = classNames.bind(styles);

function Home() {
    const [muted, setMuted] = useState(true);
    const [videos, setVideos] = useState([]);
    const [page, setPage] = useState(1);

    const fetchVideo = useCallback(async () => {
        const res = await getTrendingVideo(page);
        const newVideos = res.data.data;
        if (res.status === 200) {
            setPage((prev) => prev + 1);
            setVideos((prev) => [...prev, ...newVideos]);
        }
    }, [page]);

    return (
        <div className={cx('wrapper')}>
            <InfiniteScroll
                pageStart={1}
                loadMore={fetchVideo}
                hasMore={true}
                initialLoad={true}
                loader={<Loader />}
                threshold={100}
            >
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
                            author={{
                                img: video.user.avatar,
                                id: video.user.id,
                            }}
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
            </InfiniteScroll>
        </div>
    );
}

export default Home;
