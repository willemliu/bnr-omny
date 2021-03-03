import React from 'react';
import PlayerStore from '../../stores/PlayerStore';
import { Clip } from '../../utils/omnyHelper';
import styles from './Program.module.scss';

interface Props {
    clip: Clip;
}

function Program(props: Props) {
    function handleClick() {
        PlayerStore.setAudioUrl(props.clip.EmbedUrl);
    }

    return (
        <article className={styles.program}>
            <section className={styles.details}>
                <img src={props.clip.ImageUrl} />
                <section className={styles.textContent}>
                    <h1>{props.clip.Title}</h1>
                    <time>{props.clip.PublishedUtc}</time>
                    <p>{props.clip.PublishedUrl}</p>
                    <p>{props.clip.Description}</p>
                </section>
            </section>
            <button onClick={handleClick}>Play</button>
        </article>
    );
}

export { Program };
