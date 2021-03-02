import React, { useEffect, useState } from 'react';
import PlayerStore from '../../../stores/PlayerStore';
import styles from './Player.module.scss';

interface Props {
    url?: string;
}

function Player(props: Props) {
    const [audioUrl, setAudioUrl] = useState(props.url);

    console.log(audioUrl);

    useEffect(() => {
        const subId = PlayerStore.subscribe(() => {
            setAudioUrl(PlayerStore.getAudioUrl());
        });
        return () => {
            PlayerStore.unsubscribe(subId);
        };
    }, []);

    return audioUrl ? (
        <iframe className={styles.player} src={audioUrl} />
    ) : null;
}

export { Player };
