import { useRef, useState } from 'react';
import {
    faCircleCheck,
    faCloudArrowUp,
    faCropSimple,
    faFile,
    faFileAudio,
    faVideo,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import EditVideoInfo from './EditVideoInfo';

import './CustomInput.scss';
import styles from './Upload.module.scss';

import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Upload() {
    const [file, setFile] = useState(null);
    const inputRef = useRef();

    const handleFileChange = (e) => {
        const video = e.target.files[0];
        if (video) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const videoElement = document.createElement('video');
                videoElement.src = URL.createObjectURL(video);

                videoElement.onloadedmetadata = () => {
                    const mins = (videoElement.duration / 60).toFixed(0);
                    const seconds = (videoElement.duration - mins * 60).toFixed(0);
                    setFile({
                        video,
                        size: (video.size / (1024 * 1024)).toFixed(2), // Kích thước MB
                        duration: { mins, seconds }, // Thời lượng video (giây)
                    });

                    URL.revokeObjectURL(videoElement.src);
                };
            };
            reader.readAsDataURL(video);
        }
    };

    const removeFile = (e) => {
        setFile(null);
    };

    return (
        <div className={cx('wrapper')}>
            {file === null ? (
                <div className={cx('inner')}>
                    <div className={cx('video-drop')}>
                        <div className={cx('title-area')}>
                            <FontAwesomeIcon className={cx('upload-icon')} icon={faCloudArrowUp} />
                            <div className={cx('title-1')}>Select video to upload</div>
                            <div className={cx('title-2')}>Or drag and drop it here</div>
                            <Button
                                primary
                                className={cx('upload-button')}
                                onClick={() => {
                                    inputRef.current.click();
                                }}
                            >
                                Select video
                            </Button>
                        </div>
                        <input
                            type="file"
                            className="custom-input"
                            ref={inputRef}
                            onChange={handleFileChange}
                            accept=".mp4"
                        />
                    </div>
                    <div className={cx('criteria')}>
                        <div className={cx('item')}>
                            <FontAwesomeIcon icon={faVideo} className={cx('icon')} />
                            <div>
                                <div className={cx('title')}>Size and durarion</div>
                                <div className={cx('des')}>
                                    Maximum size: 10 GB, video duration: 60 minutes.
                                </div>
                            </div>
                        </div>
                        <div className={cx('item')}>
                            <FontAwesomeIcon icon={faFileAudio} className={cx('icon')} />
                            <div>
                                <div className={cx('title')}>File formats</div>
                                <div className={cx('des')}>
                                    Recommended: “.mp4”. Other major formats are supported.
                                </div>
                            </div>
                        </div>
                        <div className={cx('item')}>
                            <FontAwesomeIcon icon={faCircleCheck} className={cx('icon')} />
                            <div>
                                <div className={cx('title')}>Video resolutions</div>
                                <div className={cx('des')}>
                                    Minimum resolution: 720p. 2K and 4K are supported.
                                </div>
                            </div>
                        </div>
                        <div className={cx('item')}>
                            <FontAwesomeIcon icon={faCropSimple} className={cx('icon')} />
                            <div>
                                <div className={cx('title')}>Aspect ratios</div>
                                <div className={cx('des')}>
                                    Recommended: 16:9 for landscape, 9:16 for vertical.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className={cx('inner')}>
                        <p className={cx('file-name')}>{file.video.name}</p>
                        <div className={cx('info')}>
                            <span className={cx('title-small')}>Size:</span>
                            {file.size} MB
                        </div>
                        <div className={cx('info')}>
                            <span className={cx('title-small')}>Duration:</span>
                            {file.duration.mins}m {file.duration.seconds}s
                        </div>
                    </div>
                    <div className={cx('inner', 'mt-1')}>
                        <EditVideoInfo video={file.video} goBack={removeFile} />
                    </div>
                </>
            )}
        </div>
    );
}

export default Upload;
