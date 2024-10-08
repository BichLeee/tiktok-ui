import { useEffect, useRef, useState } from 'react';
import { useCallback } from 'react';
import classNames from 'classnames/bind';

import styles from './VideosList.module.scss';

import Loader from '~/components/loader';
import { Video, VideoWrapper } from '~/components/Video';
import { getTrendingVideo } from '~/services/videoService';

const cx = classNames.bind(styles);

function VideosList({ videoType }) {
    const [muted, setMuted] = useState(true);
    const [videos, setVideos] = useState([]);
    const [page, setPage] = useState(1);
    const [viewing, setViewing] = useState(0);
    const [dehydrate, setDehydrate] = useState(false);

    const refVideos = useRef();

    const fetchVideo = useCallback(async () => {
        const res = await getTrendingVideo(page, videoType);
        const newVideos = res.data.data;
        if (res.status === 200) {
            setPage((prev) => prev + 1);
            setVideos((prev) => [...prev, ...newVideos]);
            setDehydrate(true);
        }
    }, [page]);

    const handleScroll = (e) => {
        if (e.deltaY < 0) {
            // scrolling up
            if (viewing > 0) {
                setViewing((prev) => prev - 1);
            }
        } else if (e.deltaY > 0) {
            // scrolling down
            if (viewing > videos.length - 3) {
                setPage((prev) => prev + 1);
                fetchVideo();
            }
            setViewing((prev) => prev + 1);
        }
    };

    function debounce(func, delay) {
        let timeout;
        return function (...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), delay);
        };
    }

    const debouncedHandleScroll = debounce(handleScroll, 80);

    useEffect(() => {
        fetchVideo();
    }, []);

    videos &&
        useEffect(() => {
            if (refVideos.current && refVideos.current.children[viewing]) {
                var scroll = setTimeout(() => {
                    const comp = refVideos.current?.children[viewing];
                    if (comp) {
                        comp.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center',
                        });
                    }
                }, 100);
            }

            return () => clearTimeout(scroll);
        }, [viewing]);

    videos &&
        useEffect(() => {
            if (refVideos.current) {
                const comp = refVideos.current.children[viewing];
                if (comp) {
                    comp.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                    });
                }
            }
        }, [dehydrate]);

    return dehydrate ? (
        <div
            className={cx('scroll-container')}
            onWheelCapture={debouncedHandleScroll}
            ref={refVideos}
        >
            {videos.length === 0 ? (
                <h4>You haven't followed anyone.</h4>
            ) : (
                videos.map((video, index) => (
                    <article key={`${video.id} ${index}`} className={cx('video-wrapper')}>
                        <VideoWrapper
                            followed={video.user.is_followed}
                            liked={video.is_liked}
                            saved={false}
                            likeNumber={video.likes_count}
                            commentNumber={video.comments_count}
                            saveNumber={video.views_count}
                            shareNumber={video.shares_count}
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
                    </article>
                ))
            )}
        </div>
    ) : (
        <div className={cx('loader-wrapper')}>
            <Loader primary />
        </div>
    );
}

export default VideosList;
