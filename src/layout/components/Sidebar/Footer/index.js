import classNames from 'classnames/bind';

import styles from './Footer.module.scss';
import FooterItem from './FooterItem';

const cx = classNames.bind(styles);

const ITEMS = [
    {
        title: 'Công ty',
        linklist: [
            { text: 'Giới thiệu', href: '/#' },
            { text: 'Bảng tin', href: '/#' },
            { text: 'Liên hệ', href: '/#' },
            { text: 'Sự nghiệp', href: '/#' },
        ],
    },
    {
        title: 'Chương trình',
        linklist: [
            { text: 'TikTok for Good', href: '/#' },
            { text: 'Quảng cáo', href: '/#' },
            { text: 'TikTok LIVE Creator Networks', href: '/#' },
            { text: 'Developers', href: '/#' },
            { text: 'Minh bạch', href: '/#' },
            { text: 'Phần thưởng trên TikTok', href: '/#' },
            { text: 'TikTok Embeds', href: '/#' },
        ],
    },
    {
        title: 'Điều khoản và chính sách',
        linklist: [
            { text: 'Trợ giúp', href: '/#' },
            { text: 'An toàn', href: '/#' },
            { text: 'Điều khoản', href: '/#' },
            { text: 'Chính sách Quyền riêng tư', href: '/#' },
            { text: 'Trung tâm quyền riêng tư', href: '/#' },
            { text: 'Creator Academy', href: '/#' },
            { text: 'Hướng dẫn Cộng đồng', href: '/#' },
        ],
    },
];

function Footer() {
    return (
        <>
            {ITEMS.map((item) => (
                <FooterItem key={item.title} linklist={item.linklist} title={item.title} />
            ))}
            <span className={cx('copy-right')}>© 2024 TikTok</span>
        </>
    );
}

export default Footer;
