import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './AccountItem.module.scss';
import Image from '../Image';

const cx = classNames.bind(styles);

function AccountItem({ info }) {
    return (
        <div className={cx('wrapper')}>
            <Image className={cx('avatar')} src={info.avatarThumb} alt="" />
            <div className={cx('info')}>
                <div className={cx('name')}>
                    <span>{info.nickname}</span>
                    {info.verified && (
                        <FontAwesomeIcon className={cx('check-icon')} icon={faCheckCircle} />
                    )}
                </div>
                <span className={cx('username')}>{info.uniqueId}</span>
            </div>
        </div>
    );
}

export default AccountItem;
