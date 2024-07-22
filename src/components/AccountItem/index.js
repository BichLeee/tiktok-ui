import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEllipsis } from '@fortawesome/free-solid-svg-icons';

import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('avatar')}
                src="https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/4cfaa5c14950b5d6fea7def263c50c7e~c5_300x300.webp?lk3s=a5d48078&nonce=5047&refresh_token=86a7278b155d0510262fe698c9800543&x-expires=1721826000&x-signature=BFcJXzhYZ7ZB%2F9RJlyraGtnYky4%3D&shp=a5d48078&shcp=c1333099"
                alt=""
            />
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
