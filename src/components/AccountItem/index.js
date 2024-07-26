import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEllipsis } from '@fortawesome/free-solid-svg-icons';

import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <img className={cx('avatar')} src="./avatar.webp" alt="" />
            <div className={cx('info')}>
                <div className={cx('name')}>
                    <span>halinhoffical</span>
                    <FontAwesomeIcon className={cx('check-icon')} icon={faCheckCircle} />
                </div>
                <span className={cx('username')}>Ha Linh Offical</span>
            </div>
        </div>
    );
}

export default AccountItem;
