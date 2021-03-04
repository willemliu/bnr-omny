import React from 'react';
import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import Link from 'next/link';

export const client = sanityClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_TOKEN, // or leave blank to be anonymous user
    useCdn: true, // `false` if you want to ensure fresh data
});
const builder = imageUrlBuilder(client);

function urlFor(source) {
    return builder.image(source).toString();
}

export function render(content: any) {
    console.log(content);
    switch (content?._type) {
        case 'block':
            if (content?.markDefs?.length) {
                return content?.markDefs?.map((markDef) => {
                    if (markDef._type === 'link') {
                        return (
                            <Link key={content._key} href={markDef.href}>
                                <a>
                                    {content?.children.map((child) => {
                                        return render(child);
                                    })}
                                </a>
                            </Link>
                        );
                    }
                });
            }
            return content?.children.map((child) => {
                return render(child);
            });
        case 'link':
            return;
        case 'span':
            return <p key={content._key}>{content.text}</p>;
        case 'image':
            return <img key={content._key} src={urlFor(content.asset)} />;
        default:
            console.log(`Don't know how to render ${content?._type}`, content);
            return `Don't know how to render ${content?._type}`;
    }
}
