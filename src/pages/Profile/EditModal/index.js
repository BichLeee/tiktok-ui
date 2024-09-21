import { useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import styles from './EditModal.module.scss';

import Button from '~/components/Button';
import IconButton from '~/components/IconButton';
import Input from '~/components/Input';
import { getCurrentUser, updateProfile } from '~/services/accountService';
import { useUser } from '~/store/hooks';

const cx = classNames.bind(styles);

function EditModal({ show, closeModal }) {
    const user = useUser();

    const [image, setImage] = useState(null);
    const [nickname, setNickname] = useState(user.nickname);
    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [bio, setBio] = useState(user.bio);

    const fileInputRef = useRef();

    const openFileExplorer = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage({ file, src: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClose = () => {
        closeModal();
        setImage(null);
        setNickname(user.nickname);
        setFirstName(user.first_name);
        setLastName(user.last_name);
        setBio(user.bio);
    };

    const handleSave = async () => {
        const res = await updateProfile({
            avatar: image?.file,
            firstName,
            lastName,
            nickname,
            bio,
        });

        if (res.status === 200) {
            updateCurrentUser();
            location.reload();
        }
    };

    const validate = () => {
        if (nickname === '' || nickname.length > 30) return false;

        if (firstName === '' || firstName.length > 20) return false;

        if (lastName === '' || lastName.length > 20) return false;

        if (
            image ||
            nickname != user.nickname ||
            firstName != user.first_name ||
            lastName != user.last_name ||
            bio != user.bio
        )
            return true;

        return false;
    };

    const updateCurrentUser = async () => {
        const res = await getCurrentUser();
        if (res.status === 200) {
            const data = res.data.data;
            localStorage.setItem('user', JSON.stringify(data));
        }
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            className={cx('modal')}
            size="lg"
        >
            <Modal.Header closeButton className={cx('modal-header')}>
                <Modal.Title>
                    <span className={cx('modal-title')}>Sửa hồ sơ</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={cx('modal-body')}>
                <div className={cx('field')}>
                    <div className={cx('title')}>Ảnh hồ sơ</div>
                    <div className={cx('content')}>
                        <img
                            src={image?.src || user.avatar}
                            className={cx('avatar')}
                            onClick={openFileExplorer}
                        />
                        <IconButton
                            icon={<FontAwesomeIcon icon={faPen} />}
                            className={cx('edit-button')}
                            onClick={openFileExplorer}
                        />
                        <input
                            type="file"
                            className="d-none"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />
                    </div>
                </div>
                <div className={cx('field')}>
                    <div className={cx('title')}>TikTok ID</div>
                    <div className={cx('content')}>
                        <Input
                            type="input"
                            value={nickname}
                            setValue={(value) => setNickname(value)}
                            maxLength={24}
                            placeholder="TikTok ID"
                        />
                        {nickname.length > 24 && (
                            <p className={cx('error')}>Tối đa 24 ký tự</p>
                        )}
                        <div className={cx('small-text', 'mt-1')}>
                            <p>www.tiktok.com/@{user.nickname}</p>
                            <p>
                                TikTok ID chỉ có thể bao gồm chữ cái, chữ số,
                                dấu gạch dưới và dấu chấm. Khi thay đổi TikTok
                                ID, liên kết hồ sơ của bạn cũng sẽ thay đổi.
                            </p>
                        </div>
                    </div>
                </div>
                <div className={cx('field')}>
                    <div className={cx('title')}>Tên</div>
                    <div className={cx('content')}>
                        <Input
                            type="input"
                            value={firstName}
                            setValue={(value) => setFirstName(value)}
                            maxLength={20}
                            placeholder="Tên"
                        />
                        {firstName.length > 20 && (
                            <p className={cx('error')}>Tối đa 20 ký tự</p>
                        )}
                        <Input
                            type="input"
                            value={lastName}
                            setValue={(value) => setLastName(value)}
                            maxLength={20}
                            placeholder="Họ"
                            className={cx('mt-2')}
                        />
                        {lastName.length > 20 && (
                            <p className={cx('error')}>Tối đa 20 ký tự</p>
                        )}
                        <div className={cx('small-text', 'mt-1')}>
                            <p>
                                Bạn chỉ có thể thay đổi biệt danh 7 ngày một
                                lần.
                            </p>
                        </div>
                    </div>
                </div>
                <div className={cx('field')}>
                    <div className={cx('title')}>Tiểu sử</div>
                    <div className={cx('content')}>
                        <Input
                            type="textarea"
                            value={bio}
                            setValue={(value) => setBio(value)}
                            maxLength={80}
                            placeholder="Tiểu sử"
                        />
                        <div className={cx('small-text')}>
                            <p>
                                <span
                                    className={bio.length > 80 && cx('error')}
                                >
                                    {bio.length}/
                                </span>
                                80
                            </p>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button secondary size="small" onClick={handleClose}>
                    Hủy
                </Button>
                <Button
                    primary
                    size="small"
                    onClick={() => handleSave()}
                    disabled={!validate()}
                >
                    Lưu
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditModal;
