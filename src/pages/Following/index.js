import VideosList from '~/components/Video/VideosList';
import { getTrendingVideo } from '~/services/videoService';

function Following() {
    const getVideo = (page) => {
        return getTrendingVideo(page, 'following');
    };

    return (
        <div>
            <VideosList getVideo={getVideo} />
        </div>
    );
}

export default Following;
