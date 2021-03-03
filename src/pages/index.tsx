import { GetStaticProps } from 'next';
import React from 'react';
import { getPrograms } from '../utils/omnyHelper';
import styles from './index.module.scss';

function Page(props: any) {
    console.log(props);
    return (
        <section className={styles.page}>
            <h1>BNR</h1>
        </section>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            Programs: (await getPrograms(process.env.OMNY_ORGID)).Programs,
        },
        revalidate: 10,
    };
};

export default Page;
