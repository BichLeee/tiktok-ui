import classNames from 'classnames/bind';

import styles from './Footer.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

function FooterItem({ title, linklist }) {
    const [view, setView] = useState(false);

    const handleShowLinks = () => {
        setView((prev) => !prev);
    };

    return (
        <div className={cx('footer-item', { active: view })}>
            <div className={cx('title')} onClick={handleShowLinks}>
                {title}
            </div>
            {view &&
                linklist.map((link) => (
                    <a key={link.text} href={link.href} className={cx('link')}>
                        {link.text}
                    </a>
                ))}
        </div>
    );
}

export default FooterItem;
