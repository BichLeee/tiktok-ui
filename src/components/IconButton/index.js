import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './IconButton.module.scss';

const cx = classNames.bind(styles);

function IconButton({
    to,
    href,
    light = false,
    secondary = false,
    icon,
    className,
    onClick,
    ...passProps
}) {
    let Component = 'button';
    const props = {
        onClick,
        ...passProps,
    };

    if (to) {
        props.to = to;
        Component = Link;
    } else if (href) {
        props.href = href;
        Component = 'a';
    }

    const classes = cx('wrapper', { light, secondary, [className]: className });

    return (
        <Component className={classes} {...props} role="button">
            <span className={cx('icon')}>{icon}</span>
        </Component>
    );
}

export default IconButton;
