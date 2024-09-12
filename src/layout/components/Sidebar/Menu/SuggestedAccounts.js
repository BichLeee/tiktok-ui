import { useEffect, useState } from 'react';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import MenuItem from './MenuItem';

import images from '~/assets/images';
import Image from '~/components/Image';
import { getFollowingsList } from '~/services/accountService';

function SuggestedAccounts() {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        const fetchAccounts = async () => {
            const res = await getFollowingsList();
            if (res.status === 200) {
                setAccounts(res.data.data);
            }
        };

        fetchAccounts();
    }, []);

    return (
        <>
            {accounts.map((item) => (
                <MenuItem
                    key={item.id + 'sb'}
                    icon={
                        <Image
                            src={item.avatar}
                            alt=""
                            fallback={images.default_avatar}
                        />
                    }
                    activeIcon={
                        <Image
                            src={item.avatar}
                            alt=""
                            fallback={images.default_avatar}
                        />
                    }
                    title={
                        <>
                            {item.nickname}{' '}
                            {item.tick && (
                                <FontAwesomeIcon
                                    className={'check-icon'}
                                    icon={faCheckCircle}
                                />
                            )}
                        </>
                    }
                    subTitle={`${item.first_name} ${item.last_name}`}
                    to={`/${item.id}`}
                    disable={true}
                />
            ))}
        </>
    );
}

export default SuggestedAccounts;
