import React, { useLayoutEffect } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import classNames from 'classnames/bind';

import styles from './EditVideoInfo.module.scss';

import Button from '~/components/Button';
import Input from '~/components/Input';
import Selection from '~/components/Selections';
import { postVideo } from '~/services/videoService';
import { useUser } from '~/store/hooks';

const cx = classNames.bind(styles);
const COVER_DIMENTIONS = {
    width: '150px',
    height: '200px',
};

const PERMISSIONS = [
    { value: 1, label: 'Everyone' },
    { value: 2, label: 'Friends' },
    { value: 3, label: 'Only you' },
];

function EditVideoInfo({ video, goBack = () => {} }) {
    const [description, setDescription] = useState('');
    const [cover, setCover] = useState(null);
    const [location, setLocation] = useState('Ho Chi Minh');
    const [permission, setPermission] = useState(PERMISSIONS[0]);
    const [videoURL, setVideoURL] = useState(URL.createObjectURL(video));

    const [coverGenerated, setCoverGenerated] = useState(false);

    const videoRef = useRef();
    const coverInputRef = useRef();

    const user = useUser();

    useEffect(() => {
        return () => {
            if (videoRef.current) URL.revokeObjectURL(videoRef.current.url);
        };
    }, [video]);

    const generateCover = useCallback(async () => {
        if (coverGenerated) return;
        const canvas = document.createElement('canvas');
        const videoElement = videoRef.current.getInternalPlayer();

        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;

        const context = canvas.getContext('2d');
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

        const url = canvas.toDataURL('image/png');

        const file = new File([canvas.toBlob], 'cover.png');
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);

        coverInputRef.current.files = dataTransfer.files;
        setCover({ url, file });
        setCoverGenerated(true);

        canvas.remove();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCover({ file, url: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const hanldePostVideo = async () => {
        // const res = await postVideo({ userID: user.id, description, video, thumbnailTime: '0' });
        // if (res.status === 200) {
        //     console.log(res);
        // }
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <div>
                    <div className={cx('section')}>
                        <div className={cx('label')}>Description</div>
                        <div className={cx('input-wrapper')}>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className={cx('description')}
                            />
                            <div className={cx('input-footer')}>
                                <div>
                                    <Button
                                        outline={false}
                                        size="small"
                                        className={cx('hastags')}
                                        onClick={() => {
                                            setDescription((prev) => prev + '#');
                                        }}
                                    >
                                        # Hashtags
                                    </Button>
                                    <Button
                                        outline={false}
                                        size="small"
                                        className={cx('mention')}
                                        onClick={() => {
                                            setDescription((prev) => prev + '@');
                                        }}
                                    >
                                        @ Mention
                                    </Button>
                                </div>
                                <div className={cx('text-length')}>{description.length}/4000</div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('section')}>
                        <div className={cx('label')}>Cover</div>
                        <div
                            className={cx('cover-wrapper')}
                            onClick={() => {
                                coverInputRef.current.click();
                            }}
                        >
                            <img src={cover?.url} className={cx('cover-img')} />
                            <div className={cx('edit-cover')}>Edit cover</div>
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            ref={coverInputRef}
                            className={cx('file-input')}
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className={cx('section')}>
                        <div className={cx('label')}>Location</div>
                        <div className={cx('location-wrapper')}>
                            <Input
                                type={'input'}
                                value={location}
                                setValue={setLocation}
                                className={cx('location-input')}
                            />
                        </div>
                    </div>
                    <div className={cx('section')}>
                        <div className={cx('label')}>Who can watch this video</div>
                        <div className={cx('permission-wrapper')}>
                            <Selection
                                value={permission}
                                onChange={(value) => setPermission(value)}
                                options={PERMISSIONS}
                            />
                        </div>
                    </div>
                </div>
                <div className={cx('video-section')}>
                    <ReactPlayer
                        url={videoURL}
                        ref={videoRef}
                        playing={true}
                        controls
                        {...(!coverGenerated && { onReady: generateCover })}
                        className={cx('video-preview')}
                        muted
                    />
                </div>
            </div>
            <hr className={cx('hr')} />
            <div>
                <Button primary className={cx('button', 'post')} onClick={hanldePostVideo}>
                    Post
                </Button>
                <Button secondary className={cx('button', 'discard')} onClick={goBack}>
                    Discard
                </Button>
            </div>
        </>
    );
}

export default EditVideoInfo;
