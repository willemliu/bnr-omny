import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';
import { client, render } from '../../utils/contentRenderer';
import styles from './Article.module.scss';

interface Props {
    articles: any;
}

function Page(props: Props) {
    console.log(props);
    return props?.articles?.map((article) => {
        return (
            <article key={article._id} className={styles.article}>
                <h1>{article.title}</h1>
                <Link href={`/author/${article.author.slug.current}`}>
                    <a>{article.author.name}</a>
                </Link>
                {article?.mainImage?.asset?.url ? (
                    <div>
                        <img src={article?.mainImage?.asset?.url} />
                    </div>
                ) : null}
                {article?.body?.map((content: any) => {
                    return render(content);
                })}
            </article>
        );
    });
}

export const getStaticPaths: GetStaticPaths = async () => {
    const slugs = await client.fetch(`*[_type=="post"].slug.current`);
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
    const articles = await client.fetch(
        `*[_type=="post"]|[slug.current=="${params.slug}"]{
            _id,
            author->{name, image, slug{current}},
            categories->,
            slug->,
            mainImage{asset->},
            title,
            body[]
        }`
    );
    return { props: { articles } };
};

export default Page;
