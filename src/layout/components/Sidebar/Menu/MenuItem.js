import classNames from 'classnames/bind';

import styles from './Menu.module.scss';
import { NavLink } from 'react-router-dom';
const cx = classNames.bind(styles);

function MenuItem({ icon, activeIcon, title, to, onClick, disable }) {
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
            <span className={cx('title')}>{title}</span>
        </NavLink>
    );
}

export default MenuItem;
