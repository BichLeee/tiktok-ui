import classNames from 'classnames/bind';

import styles from './Input.module.scss';

const cx = classNames.bind(styles);

function Input({ type, value, setValue, className, maxLength = null, ...passProps }) {
    let Input;

    switch (type) {
        case 'input':
            Input = 'input';
            break;
        case 'textarea':
            Input = 'textarea';
            break;
        default:
            Input = 'input';
            break;
    }

    const classes = cx(
        'input',
        'textarea',
        { [className]: className },
        maxLength && value.length > maxLength ? 'error' : '',
    );

    const props = {
        value,
        ...passProps,
    };

    return <Input {...props} className={classes} onChange={(e) => setValue(e.target.value)} />;
}

export default Input;
