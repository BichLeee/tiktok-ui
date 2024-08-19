import classNames from 'classnames/bind';
import { Col, Container, Row } from 'react-bootstrap';

import styles from './Video.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef } from 'react';

const cx = classNames.bind(styles);

function Controls({ playing, setPlaying, playedSeconds, duration, playerRef }) {
    const inputRef = useRef();

    const seek = (e) => {
        playerRef.current.seekTo(+e.target.value, 'seconds');
    };

    useEffect(() => {
        const updatePlayedTrack = () => {
            const input = inputRef.current;
            // Tính toán phần trăm vị trí của thanh trượt
            const percentage = ((input.value - input.min) / (input.max - input.min)) * 100;

            // Cập nhật gradient của thanh trượt
            input.style.setProperty('--value', percentage);
            input.style.background = `linear-gradient(to right, white 0%, white ${percentage}%, rgba(255, 255, 255, 0.5) ${percentage}%, rgba(255, 255, 255, 0.5) 100%)`;
        };

        updatePlayedTrack();
    }, [playedSeconds]);

    return (
        <Row className={cx('controls-wrapper')}>
            <Col xs={2}>
                <button onClick={() => setPlaying((prev) => !prev)} className={cx('action-button')}>
                    {playing ? (
                        <FontAwesomeIcon icon={faPause} />
                    ) : (
                        <FontAwesomeIcon icon={faPlay} />
                    )}
                </button>
            </Col>
            <Col xs={8}>
                <input
                    type="range"
                    value={playedSeconds}
                    min="0"
                    max={duration}
                    onChange={seek}
                    ref={inputRef}
                />
            </Col>
        </Row>
    );
}

export default Controls;
