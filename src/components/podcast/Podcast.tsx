import React from 'react';
import PlayerStore from '../../stores/PlayerStore';
import styles from './Podcast.module.scss';

function Podcast(props: any) {
    function handleClick() {
        props['media:content']?.['media:player']?.forEach((embed) => {
            PlayerStore.setAudioUrl(embed?.$?.url);
            return false;
        });
    }

    return (
        <article className={styles.podcast}>
            <section className={styles.details}>
                <img src={props.itunes.image} />
                <section className={styles.textContent}>
                    <h1>{props.title}</h1>
                    <time>{props.pubDate}</time>
                    <p>{props.link}</p>
                    <p>{props.content}</p>
                </section>
            </section>
            <button onClick={handleClick}>Play</button>
        </article>
    );
}

export { Podcast };
