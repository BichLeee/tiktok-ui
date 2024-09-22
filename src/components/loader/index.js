import classNames from 'classnames/bind';

import styles from './Loader.module.scss';

const cx = classNames.bind(styles);

function Loader({ primary = false, className }) {
    const classes = cx('loader', { primary, [className]: className });

    return <div className={classes}></div>;
}

export default Loader;
