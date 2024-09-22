import { useCallback } from 'react';
import classNames from 'classnames/bind';
import i18next from 'i18next';
import { t } from 'i18next';

import FooterItem from './FooterItem';

import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    const renderItems = useCallback(
        () => [
            {
                title: t('label.company'),
                linklist: [
                    { text: 'Giới thiệu', href: '/#' },
                    { text: 'Bảng tin', href: '/#' },
                    { text: 'Liên hệ', href: '/#' },
                    { text: 'Sự nghiệp', href: '/#' },
                ],
            },
            {
                title: t('label.program'),
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
                title: t('label.terms'),
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
        ],
        [i18next.language],
    );

    return (
        <div className={cx('footer')}>
            {renderItems().map((item) => (
                <FooterItem
                    key={item.title}
                    linklist={item.linklist}
                    title={item.title}
                />
            ))}
            <span className={cx('copy-right')}>© 2024 TikTok</span>
        </div>
    );
}

export default Footer;
