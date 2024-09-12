import MenuItem from './MenuItem';

import images from '~/assets/images';
import Image from '~/components/Image';

const ACCOUNT_ICON_SAMPLE = <Image src="./avatar.webp" alt="" fallback={images.default_avatar} />;

const ACCOUNTS = [
    {
        icon: ACCOUNT_ICON_SAMPLE,
        activeIcon: ACCOUNT_ICON_SAMPLE,
        title: 'Hồ sơ',
        to: '/profile',
        disable: true,
    },
    {
        icon: ACCOUNT_ICON_SAMPLE,
        activeIcon: ACCOUNT_ICON_SAMPLE,
        title: 'Hồ sơ',
        to: '/profile',
        disable: true,
    },
    {
        icon: ACCOUNT_ICON_SAMPLE,
        activeIcon: ACCOUNT_ICON_SAMPLE,
        title: 'Hồ sơ',
        to: '/profile',
        disable: true,
    },
    {
        icon: ACCOUNT_ICON_SAMPLE,
        activeIcon: ACCOUNT_ICON_SAMPLE,
        title: 'Hồ sơ',
        to: '/profile',
        disable: true,
    },
    {
        icon: ACCOUNT_ICON_SAMPLE,
        activeIcon: ACCOUNT_ICON_SAMPLE,
        title: 'Hồ sơ',
        to: '/profile',
        disable: true,
    },
    {
        icon: ACCOUNT_ICON_SAMPLE,
        activeIcon: ACCOUNT_ICON_SAMPLE,
        title: 'Hồ sơ',
        to: '/profile',
        disable: true,
    },
    {
        icon: ACCOUNT_ICON_SAMPLE,
        activeIcon: ACCOUNT_ICON_SAMPLE,
        title: 'Hồ sơ',
        to: '/profile',
        disable: true,
    },
];

function SuggestedAccounts() {
    return (
        <>
            {ACCOUNTS.map((item, index) => (
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

export default SuggestedAccounts;
