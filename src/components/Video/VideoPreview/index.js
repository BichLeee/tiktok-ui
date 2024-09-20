import { useState } from 'react';
import ReactPlayer from 'react-player';
import classNames from 'classnames/bind';

import styles from './VideoPreview.module.scss';

const cx = classNames.bind(styles);

function VideoPreview({ video_url, playing, muted }) {
    const [play, setPlay] = useState(playing);

    return (
        <div
            onMouseEnter={() => setPlay(true)}
            onMouseLeave={() => setPlay(false)}
            className={cx('wrapper')}
        >
            <ReactPlayer
                url={video_url}
                loop={true}
                playing={play}
                controls={false}
                muted={muted}
            />
        </div>
    );
}

export default VideoPreview;
