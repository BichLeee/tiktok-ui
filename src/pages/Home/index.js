import classNames from 'classnames/bind';

import styles from './Home.module.scss';

import VideosList from '~/components/Video/VideosList';
import { getTrendingVideo } from '~/services/videoService';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <VideosList videoType={'for-you'} />;
        </div>
    );
}

export default Home;
