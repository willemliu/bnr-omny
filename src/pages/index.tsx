import { VerticalCard1 } from '@fdmg/bnr-design-system/components/card/VerticalCard1';
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
            <h1 className="heading sans xl">BNR</h1>

            {props?.Programs?.Programs?.length > 0 ? (
                <section className="grid">
                    {props?.Programs?.Programs?.map((program) => {
                        return (
                            <VerticalCard1
                                key={program.Id}
                                className={`${styles.fullHeight} xs-12 s-6 m-4 l-3`}
                                href={`/program/${program.Slug}`}
                                imageUrl={program.ArtworkUrl}
                                madePossibleBy={program.ContactName}
                                madePossibleLink={`mailto:${program.ContactEmail}`}
                                title={program.Name}
                                Link={Link}
                                footerText={program.Name}
                                footerUrl={`/program/${program.Slug}`}
                            />
                        );
                    })}
                </section>
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
