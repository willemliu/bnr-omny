import React, { useCallback } from 'react';

import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import {
    Clips,
    getProgramClips,
    getProgramDetails,
    getPrograms,
    Program,
    Programs,
} from '../../../utils/omnyHelper';
import styles from './Program.module.scss';
import { Clip as ClipComponent } from '../../../components/clip/Clip';
import Link from 'next/link';

interface Props {
    page?: number;
    programDetails: Program;
    programClips: Clips;
    Programs: Programs;
    [x: string]: any;
}

function Page(props: Props) {
    const hasPrev = useCallback(() => {
        return props?.page > 1;
    }, [props?.page]);

    const hasNext = useCallback(() => {
        return props?.programClips?.Cursor > props?.page;
    }, [props?.programClips?.Cursor, props?.page]);

    return (
        <section className={styles.program}>
            {props?.programDetails ? (
                <section className={styles.programDetail}>
                    {props?.programDetails?.ArtworkUrl ? (
                        <span className={styles.image}>
                            <Image
                                src={props?.programDetails?.ArtworkUrl}
                                layout={'responsive'}
                                width={1}
                                height={1}
                                objectFit={'cover'}
                            />
                        </span>
                    ) : null}
                    <section className={styles.textContent}>
                        <h1>{props.programDetails.Name}</h1>
                        <p>{props.programDetails.Network}</p>
                        <p>{props.programDetails.Description}</p>
                    </section>
                </section>
            ) : null}

            {props?.programClips?.TotalCount ? (
                <>
                    <p>
                        {hasPrev() ? (
                            <Link
                                href={`/program/${props?.programDetails.Slug}/${
                                    props?.page - 1
                                }`}
                            >
                                <button>&lt;</button>
                            </Link>
                        ) : null}
                        {props?.programClips?.TotalCount > 10
                            ? `Page ${props?.page}`
                            : null}
                        {hasNext() ? (
                            <Link
                                href={`/program/${props?.programDetails.Slug}/${props?.programClips?.Cursor}`}
                            >
                                <button>&gt;</button>
                            </Link>
                        ) : null}
                    </p>
                    <section className={styles.clips}>
                        {props?.programClips?.Clips?.map?.((clip) => {
                            return (
                                <ClipComponent
                                    key={`${clip.EmbedUrl}`}
                                    clip={clip}
                                />
                            );
                        })}
                    </section>
                </>
            ) : (
                <div>Geen clips</div>
            )}
        </section>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const programs = await getPrograms(process.env.OMNY_ORGID);
    const paths = programs.Programs.map((program) => {
        return { params: { slug: program.Slug } };
    });
    return {
        paths,
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const page = (context.params.page as string) ?? '1';
    const programs = await getPrograms(process.env.OMNY_ORGID);
    const program = programs.Programs.find(
        (program) => program.Slug === context.params.slug
    );
    const programDetails = await getProgramDetails(
        process.env.OMNY_ORGID,
        program.Id
    );
    const programClips = await getProgramClips(
        process.env.OMNY_ORGID,
        program.Id,
        parseInt(page, 10)
    );

    return {
        props: {
            programDetails,
            programClips,
            Programs: programs,
            page,
        },
        revalidate: 10,
    };
};

export default Page;
