import classNames from 'classnames/bind';

import styles from './Home.module.scss';

import VideosList from '~/components/Video/VideosList';
import { getTrendingVideo } from '~/services/videoService';

const cx = classNames.bind(styles);

function Home() {
    const getVideo = (page) => {
        return getTrendingVideo(page);
    };

    return (
        <div className={cx('wrapper')}>
            <VideosList getVideo={getVideo} />;
        </div>
    );
}

export default Home;
