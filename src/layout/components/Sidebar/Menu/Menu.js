import { useState } from 'react';
import Login from '../../Login';
import MenuItem from './MenuItem';
import { useUser } from '~/store/hooks';

function Menu({ items }) {
    const [show, setShow] = useState(false);
    const user = useUser();

    console.log(user.email);

    return (
        <>
            {items.map(
                (item, index) =>
                    (!item.auth || user.email != undefined) && (
                        <MenuItem
                            key={`${item.title} ${index}`}
                            icon={item.icon}
                            activeIcon={item.activeIcon}
                            title={item.title}
                            to={item.to}
                            disable={item.disable}
                            onClick={item.onClick}
                        />
                    ),
            )}
            <Login show={show} handleClose={() => setShow(false)} />
        </>
    );
}

export default Menu;
