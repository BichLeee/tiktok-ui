import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Menu.module.scss';
const cx = classNames.bind(styles);

function MenuItem({
    icon,
    activeIcon,
    title,
    subTitle = '',
    to,
    onClick,
    disable,
}) {
    const handleClick = (e) => {
        if (disable) {
            e.preventDefault();
            return;
        }
        if (onClick) {
            e.preventDefault();
            onClick();
            console.log(true);
        }
    };

    return (
        <NavLink
            className={(nav) => cx('item-wrapper', { active: nav.isActive })}
            to={to}
            onClick={handleClick}
        >
            <span className={cx('icon')}>{icon}</span>
            <span className={cx('active-icon')}>{activeIcon}</span>
            <div className={subTitle && cx('account-name')}>
                <div className={cx('title')}>{title}</div>
                {subTitle && <div className={cx('sub-title')}>{subTitle}</div>}
            </div>
        </NavLink>
    );
}

export default MenuItem;
