import { GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';
import { getPrograms, Programs } from '../utils/omnyHelper';
import styles from './index.module.scss';

interface Props {
    Programs: Programs;
}

function Page(props: Props) {
    return (
        <section className={styles.page}>
            <h1>BNR</h1>

            {props?.Programs?.Programs?.length > 0 ? (
                <ul>
                    {props?.Programs?.Programs?.map((program) => {
                        return (
                            <li key={program.Id}>
                                <Link href={`/program/${program.Slug}`}>
                                    <a>{program.Name}</a>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            ) : null}
        </section>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            Programs: await getPrograms(process.env.OMNY_ORGID),
        },
        revalidate: 10,
    };
};

export default Page;
