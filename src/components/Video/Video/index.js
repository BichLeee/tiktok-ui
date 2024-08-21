import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';

import styles from './Video.module.scss';
import Controls from './Controls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';
import Wrapper from '../Wrapper';

const cx = classNames.bind(styles);

const url =
    'https://v16m-default.akamaized.net/2f0ee20be8502b4652fe1957da86d03a/66bf92c3/video/tos/maliva/tos-maliva-ve-0068c799-us/o8TVuRW70AuJDksiPE1BLwBPiZQVAnwxEuIkq/?a=0&bti=OUBzOTg7QGo6OjZAL3AjLTAzYCMxNDNg&ch=0&cr=0&dr=0&lr=all&cd=0%7C0%7C0%7C0&cv=1&br=2432&bt=1216&cs=0&ds=6&ft=XE5bCqT0m7jPD129AKM73wU2Y3yKMeF~O5&mime_type=video_mp4&qs=0&rc=Zmk2OzQ2NGgzNzozNTxnN0Bpam9kc2o5cmZoczMzaTczNEA0YV9eMDNjNjUxXzYyNTYtYSMucDIyMmQ0cW5gLS1kMTJzcw%3D%3D&vvpl=1&l=2024081611551678372DB24A1895121FA0&btag=e00090000&shp=6da16bae&shcp=-';

function Video({ author, title, music_title, video_url, muted, setMuted }) {
    const [playing, setPlaying] = useState(false);
    const [playedSeconds, setPlayedSecond] = useState(0);
    const [duration, setDuration] = useState(0);
    const playerRef = useRef();

    const [isFullTitle, setIsFullTitle] = useState(false);

    useEffect(() => {
        const wrapper = playerRef.current.wrapper;

        if (wrapper) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setPlaying(true);
                        } else {
                            setPlaying(false);
                        }
                    });
                },
                {
                    threshold: 0.5, // Ít nhất 50% của video phải xuất hiện trong viewport
                },
            );

            observer.observe(wrapper);

            return () => {
                observer.unobserve(wrapper);
            };
        }
    }, []);

    return (
        <div className={cx('video-wrapper')}>
            <div className={cx('video-inner')}>
                <ReactPlayer
                    className={cx('video')}
                    url={video_url}
                    loop={true}
                    playing={playing}
                    controls={false}
                    ref={playerRef}
                    onProgress={({ playedSeconds }) => setPlayedSecond(playedSeconds)}
                    onSeek={setPlayedSecond}
                    onDuration={setDuration}
                    muted={muted}
                />
                <div className={cx('footer')}>
                    <div className={cx('author')}>{author}</div>

                    <div className={cx('title-container', isFullTitle && 'full')}>
                        <div className={cx('title', isFullTitle && 'full')}>{title}</div>
                        {title.length > 50 && (
                            <div
                                className={cx('view-more')}
                                onClick={() => setIsFullTitle((prev) => !prev)}
                            >
                                {isFullTitle ? 'ẩn bớt' : 'thêm'}
                            </div>
                        )}
                    </div>

                    <div className={cx('music')}>
                        <FontAwesomeIcon icon={faMusic} className={cx('icon')} />
                        <div className={cx('name')}>Nhạc nền - {music_title}</div>
                    </div>
                    <div className={cx('interactive')}>
                        <div className={cx('controls-inner')}>
                            <Controls
                                playing={playing}
                                setPlaying={setPlaying}
                                playedSeconds={playedSeconds}
                                duration={duration}
                                playerRef={playerRef}
                            />
                        </div>
                    </div>

                    <button
                        onClick={() => setMuted((prev) => !prev)}
                        className={cx('volume', 'action-button')}
                    >
                        {muted ? (
                            <FontAwesomeIcon icon={faVolumeXmark} />
                        ) : (
                            <FontAwesomeIcon icon={faVolumeHigh} />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Video;
