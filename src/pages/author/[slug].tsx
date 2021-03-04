import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import { client, render } from '../../utils/contentRenderer';

interface Props {
    authors: any;
}

function Page(props: Props) {
    console.log(props);
    return (
        <section>
            {props?.authors?.map((author) => (
                <h1 key={author._id}>{author.name}</h1>
            ))}
            {props?.authors?.map((author) => (
                <React.Fragment key={author._id}>
                    {render(author.image)}
                </React.Fragment>
            ))}
            {props?.authors?.map((author) => (
                <React.Fragment key={author._id}>
                    {author?.bio?.map((bio) => render(bio))}
                </React.Fragment>
            ))}
        </section>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const slugs = await client.fetch(`*[_type=="author"].slug.current`);
    const paths = slugs.map((slug) => {
        return { params: { slug } };
    });
    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    // dangerous query injection possible
    const authors = await client.fetch(
        `*[_type=="author"]|[slug.current=="${params.slug}"]`
    );
    return { props: { authors } };
};

export default Page;
