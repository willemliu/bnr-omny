import React from 'react';
import styles from './News.module.scss';
import { client, render } from '../../utils/contentRenderer';
import Link from 'next/link';

interface Props {
    posts: any[];
}

function Page(props: Props) {
    return (
        <section>
            <h1>BNR Sanity</h1>
            {props?.posts?.map((post) => {
                console.log(post);
                return (
                    <Link key={post._id} href={`/article/${post.slug.current}`}>
                        <a>
                            <article className={styles.article}>
                                <h1>{post.title}</h1>
                                <p>{post.author.name}</p>
                                {/* {post?.mainImage?.asset} */}
                                {post?.body?.map((content: any) => {
                                    return render(content);
                                })}
                            </article>
                        </a>
                    </Link>
                );
            })}
        </section>
    );
}

export const getServerSideProps = async () => {
    const posts = await client.fetch(`*[_type=="post"] | order(_updatedAt desc){
        _id,
        author->{name, image, slug{current}},
        categories->,
        slug,
        title
    }`);
    return { props: { posts } };
};

export default Page;
