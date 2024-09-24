import Select from 'react-select';
import classNames from 'classnames/bind';

import styles from './Selections.module.scss';

const cx = classNames.bind(styles);

function Selection({ value, onChange, options, className, ...passProps }) {
    const classes = cx('selection', { [className]: className });

    return (
        <Select
            onChange={onChange}
            options={options}
            className={classes}
            value={value}
            isSearchable={false}
            {...passProps}
        />
    );
}

export default Selection;
