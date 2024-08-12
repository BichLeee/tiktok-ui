import MenuItem from './MenuItem';

function Menu({ items }) {
    return (
        <>
            {items.map((item, index) => (
                <MenuItem
                    key={`${item.title} ${index}`}
                    icon={item.icon}
                    activeIcon={item.activeIcon}
                    title={item.title}
                    to={item.to}
                    disable={item.disable}
                />
            ))}
        </>
    );
}

export default Menu;
