import { useState } from 'react';
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
import { followUser, unfollowUser } from '~/services/accountService';
import { useUser } from '~/store/hooks';

const cx = classNames.bind(styles);

function Wrapper({
    followed,
    liked,
    saved,
    likeNumber,
    commentNumber,
    saveNumber,
    shareNumber,
    author,
    children,
}) {
    const [isfollowed, setIsFollowed] = useState(followed);
    const [isLiked, setIsLiked] = useState(liked);
    const [isSaved, setIsSaved] = useState(saved);

    const user = useUser();

    const formatNumberToString = (number) => {
        if (number >= 1000000) {
            return `${(number / 1000000).toFixed(1)}K`;
        } else if (number >= 10000) {
            return `${(number / 1000).toFixed(1)}K`;
        }
        return number;
    };

    const handleFollow = async () => {
        if (user.email) {
            if (isfollowed === true) {
                await unfollowUser(author.id);
                setIsFollowed(false);
            } else {
                await followUser(author.id);
                setIsFollowed(true);
            }
        }
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
                        className={cx('follow-btn', isfollowed ? 'followed' : 'follow')}
                        onClick={() => user.email && handleFollow()}
                    >
                        {isfollowed ? (
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
                    <div className={cx('number')}>
                        {formatNumberToString(isLiked ? likeNumber + 1 : likeNumber)}
                    </div>
                </div>
                <div>
                    <IconButton secondary icon={<FontAwesomeIcon icon={faCommentDots} />} />
                    <div className={cx('number')}>{formatNumberToString(commentNumber)}</div>
                </div>
                <div>
                    <IconButton
                        secondary
                        className={cx(isSaved && 'yellow')}
                        icon={<FontAwesomeIcon icon={faBookmark} />}
                        onClick={() => {
                            setIsSaved((prev) => !prev);
                        }}
                    />
                    <div className={cx('number')}>
                        {formatNumberToString(isSaved ? saveNumber + 1 : saveNumber)}
                    </div>
                </div>
                <div>
                    <IconButton secondary icon={<FontAwesomeIcon icon={faShare} />} />
                    <div className={cx('number')}>{formatNumberToString(shareNumber)}</div>
                </div>
            </div>
        </div>
    );
}

export default Wrapper;
