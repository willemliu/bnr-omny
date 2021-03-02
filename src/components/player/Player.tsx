import React, { useEffect, useRef, useState } from 'react';
import PlayerStore from '../../stores/PlayerStore';
import styles from './Player.module.scss';

interface Props {
    url?: string;
}

function Player(props: Props) {
    const iframeRef = useRef(null);
    const [audioUrl, setAudioUrl] = useState(props.url);

    useEffect(() => {
        import('player.js').then(({ default: playerjs }) => {
            if (iframeRef.current) {
                const player = new playerjs.Player(iframeRef.current);
                player.on('ready', () => player.play());
            }
        });
    }, [audioUrl, iframeRef]);

    useEffect(() => {
        const subId = PlayerStore.subscribe(() => {
            setAudioUrl(PlayerStore.getAudioUrl());
        });
        return () => {
            PlayerStore.unsubscribe(subId);
        };
    }, []);

    return audioUrl ? (
        <iframe
            ref={iframeRef}
            className={styles.player}
            src={audioUrl}
            allow="autoplay"
        />
    ) : null;
}

export { Player };
