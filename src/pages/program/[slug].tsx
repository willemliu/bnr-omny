import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import {
    Clips,
    getProgramClips,
    getProgramDetails,
    getPrograms,
    Program,
    Programs,
} from '../../utils/omnyHelper';
import styles from './Program.module.scss';
import { Clip as ClipComponent } from '../../components/clip/Clip';

interface Props {
    programDetails: Program;
    programClips: Clips;
    Programs: Programs;
    [x: string]: any;
}

function Page(props: Props) {
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

            {props?.programClips?.TotalCount > 0 ? (
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
        program.Id
    );

    return {
        props: {
            programDetails,
            programClips,
            Programs: programs.Programs,
        },
        revalidate: 10,
    };
};

export default Page;
