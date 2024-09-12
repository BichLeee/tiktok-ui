import { useEffect, useRef,useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import {
    faCircleXmark,
    faMagnifyingGlass,
    faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import styles from './Search.module.scss';

import AccountItem from '~/components/AccountItem';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { useDebounce } from '~/hooks';
import * as searchApi from '~/services/searchService';

const cx = classNames.bind(styles);

function Search() {
    const [accounts, setAccounts] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const debounced = useDebounce(searchValue, 500);

    const inputRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            if (debounced.trim() === '') {
                setAccounts([]);
                return;
            }

            const res = await searchApi.search(encodeURIComponent(debounced));
            if (res.status === 200) {
                setAccounts(res.data.data);
            } else {
                setAccounts([]);
            }
            setLoading(false);
        };

        fetchData();
    }, [debounced]);

    const handleValueChange = (e) => {
        const value = e.target.value;
        if (!value.startsWith(' ')) {
            setSearchValue(value);
        }
    };

    return (
        <div className={cx('search')}>
            <HeadlessTippy
                visible={showResult && accounts.length > 0}
                interactive
                render={(attrs) => (
                    <div
                        className={cx('search-results')}
                        tabIndex="-1"
                        {...attrs}
                    >
                        <PopperWrapper>
                            <h5 className={cx('search-title')}>Tài khoản</h5>
                            {accounts.map((account) => (
                                <AccountItem key={account.id} info={account} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={() => setShowResult(false)}
            >
                <InputGroup className={cx('search-inner')}>
                    <Form.Control
                        placeholder="Tìm kiếm"
                        className={cx('input')}
                        value={searchValue}
                        ref={inputRef}
                        onChange={handleValueChange}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && !loading && (
                        <button
                            className={cx('clear')}
                            onClick={() => {
                                setSearchValue('');
                                inputRef.current.focus();
                            }}
                        >
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {!!searchValue && loading && (
                        <FontAwesomeIcon
                            icon={faSpinner}
                            className={cx('loading')}
                        />
                    )}
                    <span className={cx('vertical-line')} />

                    <button className={cx('search-btn')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </InputGroup>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
