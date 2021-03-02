import React from 'react';
import Parser from 'rss-parser';
import { Podcast } from '../components/podcast/Podcast';
import styles from './index.module.scss';

function Page(props: any) {
    return (
        <section className={styles.page}>
            {props?.image?.link ? (
                <img
                    className={styles.image}
                    src={props.image.url}
                    alt={props.image.title}
                />
            ) : null}
            <h1>BNR</h1>
            <p>{props?.description}</p>
            {props?.items?.map((podcast) => {
                return <Podcast key={podcast.guid} {...podcast} />;
            })}
        </section>
    );
}

export const getStaticProps = async () => {
    const parser = new Parser({
        // non RSS 2.0 fields need to be added manually
        customFields: {
            item: ['media:content', 'omny:clipId'],
        },
    });
    let props = {};
    try {
        props = await parser.parseURL(process.env.PODCAST_URL);
    } catch (e) {
        console.error(process.env.PODCAST_URL, e);
    }

    return {
        props,
        revalidate: 10,
    };
};

export default Page;
