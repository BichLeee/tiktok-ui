import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import Image from '../Image';

import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem({ info }) {
    return (
        <div className={cx('wrapper')}>
            <Image className={cx('avatar')} src={info.avatar} alt="" />
            <div className={cx('info')}>
                <div className={cx('name')}>
                    <span>{info.nickname}</span>
                    {info.tick && (
                        <FontAwesomeIcon className={cx('check-icon')} icon={faCheckCircle} />
                    )}
                </div>
                <span className={cx('username')}>{info.full_name}</span>
            </div>
        </div>
    );
}

export default AccountItem;
