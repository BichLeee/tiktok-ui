import {
    faBookmark,
    faCheck,
    faCommentDots,
    faHeart,
    faPlus,
    faShare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import styles from './Wrapper.module.scss';
import IconButton from '~/components/IconButton';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Wrapper({ liked, commented, saved, shared, author, children }) {
    const [followed, setFollowed] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const formatNumberToString = (number) => {
        if (number >= 1000000) {
            return `${(number / 1000000).toFixed(1)}K`;
        } else if (number >= 10000) {
            return `${(number / 1000).toFixed(1)}K`;
        }
        return number;
    };
    return (
        <div className={cx('wrapper')}>
            {children}
            <div className={cx('action-buttons')}>
                <div className={cx('author')}>
                    <button className={cx('author-btn')} onClick={() => console.log(author.id)}>
                        <img src={author.img} />
                    </button>
                    <button
                        className={cx('follow-btn', followed ? 'followed' : 'follow')}
                        onClick={() => setFollowed((prev) => !prev)}
                    >
                        {followed ? (
                            <FontAwesomeIcon icon={faCheck} />
                        ) : (
                            <FontAwesomeIcon icon={faPlus} />
                        )}
                    </button>
                </div>
                <div>
                    <IconButton
                        secondary
                        className={cx(isLiked && 'red')}
                        icon={<FontAwesomeIcon icon={faHeart} />}
                        onClick={() => {
                            setIsLiked((prev) => !prev);
                        }}
                    />
                    <div className={cx('number')}>{formatNumberToString(liked)}</div>
                </div>
                <div>
                    <IconButton secondary icon={<FontAwesomeIcon icon={faCommentDots} />} />
                    <div className={cx('number')}>{formatNumberToString(commented)}</div>
                </div>
                <div>
                    <IconButton
                        secondary
                        className={cx(isSaved && 'red')}
                        icon={<FontAwesomeIcon icon={faBookmark} />}
                        onClick={() => {
                            setIsSaved((prev) => !prev);
                        }}
                    />
                    <div className={cx('number')}>{formatNumberToString(saved)}</div>
                </div>
                <div>
                    <IconButton secondary icon={<FontAwesomeIcon icon={faShare} />} />
                    <div className={cx('number')}>{formatNumberToString(shared)}</div>
                </div>
            </div>
        </div>
    );
}

export default Wrapper;
