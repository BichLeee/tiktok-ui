import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Menu({ children, items = [] }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];

    const renderItems = () => {
        return current.data.map((item, index) => {
            if (item === 'hr') {
                return <hr key={'hr'} className={cx('hr')} />;
            }
            const isParent = !!item.children;
            // undefined -> false / else true
            if (isParent) {
                return (
                    <MenuItem
                        key={`${item.title}-${index}`}
                        data={item}
                        onClick={() => setHistory((prev) => [...prev, { data: item.children }])}
                    />
                );
            }
            return <MenuItem key={`${item.title}-${index}`} data={item} />;
        });
    };

    const handleBackBtn = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    const renderResult = (attrs) => (
        <div className={cx('content')} tabIndex="-1" {...attrs}>
            <PopperWrapper>
                {history.length > 1 && (
                    <div className={cx('header')}>
                        <button className={cx('back-btn')} onClick={handleBackBtn}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <h3 className={cx('header-title')}>Language</h3>
                    </div>
                )}
                {renderItems()}
            </PopperWrapper>
        </div>
    );

    const handleResetMenu = () => {
        setHistory((prev) => [prev[0]]);
    };

    return (
        <Tippy
            interactive
            placement="bottom-end"
            delay={[0, 500]}
            render={renderResult}
            onHide={handleResetMenu}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
