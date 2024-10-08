import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import MenuItem from './MenuItem';

import styles from './Menu.module.scss';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import { useUser } from '~/store/hooks';
import { logout as logoutAccount } from '~/store/user';

const cx = classNames.bind(styles);

function Menu({ children, items = [] }) {
    const [history, setHistory] = useState([{ data: items, header: '' }]);
    const current = history[history.length - 1];
    const dispatch = useDispatch();

    const user = useUser();

    const renderItems = () => {
        return current.data.map((item, index) => {
            // auth
            if (item.auth && !user.email) {
                return;
            }

            // line
            if (item.title === 'hr') {
                return <hr key={'hr'} className={cx('hr')} />;
            }

            const isParent = !!item.children;

            if (isParent) {
                return (
                    <MenuItem
                        key={`${item.title}-${index}`}
                        data={item}
                        onClick={() =>
                            setHistory((prev) => [
                                ...prev,
                                {
                                    data: item.children,
                                    header: item.childHeader || '',
                                },
                            ])
                        }
                    />
                );
            }
            if (item.onClick) {
                return (
                    <MenuItem
                        key={`${item.title}-${index}`}
                        data={item}
                        onClick={item.onClick}
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
                        <button
                            className={cx('back-btn')}
                            onClick={handleBackBtn}
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <h3 className={cx('header-title')}>{current.header}</h3>
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
