import { buildSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';
import { OmnyQuery, OmnySchema } from '../../../graphql/omny/schemas';
import { OmnyResolvers } from '../../../graphql/omny/resolvers';

const schema = buildSchema(`
    ${OmnySchema}

    type Query {
        ${OmnyQuery}
    }
`);

const rootValue = {
    ...OmnyResolvers,
};

async function handler(req, res) {
    res?.setHeader?.(
        'Cache-Control',
        'max-age=0, max-stale, s-maxage=60, stale-while-revalidate'
    );

    return await graphqlHTTP({
        rootValue,
        schema,
        graphiql: { headerEditorEnabled: true },
    })(req, res);
}

export default handler;
