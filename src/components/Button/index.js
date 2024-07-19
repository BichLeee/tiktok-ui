import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    primary = false,
    outline = false,
    secondary = false,
    rounded = false,
    size = 'medium',
    className,
    children,
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

    const classes = cx('wrapper', { primary, outline, secondary, rounded, [className]: className }, size);

    return (
        <Component className={classes} {...props} role="button">
            {children}
        </Component>
    );
}

export default Button;
