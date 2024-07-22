import classNames from 'classnames/bind';

import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ data, onClick }) {
    return (
        <button className={cx('menu-item')} onClick={onClick}>
            {data.icon}
            {data.title}
        </button>
    );
}

export default MenuItem;
