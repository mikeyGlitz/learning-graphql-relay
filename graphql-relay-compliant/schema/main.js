import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
    GraphQLEnumType
}
from 'graphql';

import {
    
    connectionDefinitions,
    connectionArgs,
    connectionFromPromisedArray
} from 'graphql-relay';

const QuoteType = new GraphQLObjectType({
    name: "Quote",
    fields: {
        id: {
            type: GraphQLString,
            resolve: obj => obj._id
        },
        text: {
            type: GraphQLString
        },
        author: {
            type: GraphQLString
        }
    }
});

const { connectionType: QuotesConnectionType } =
    connectionDefinitions({
        name: 'Quote',
        nodeType: QuoteType
    });

const QuotesLibraryType = new GraphQLObjectType({
    name: 'QuotesLibrary',
    fields: {
        quotesConnection: {
            type: QuotesConnectionType,
            description: 'A list of the quotes in the database',
            args: connectionArgs,
            resolve: (_, args, { db }) => connectionFromPromisedArray(
                db.collection('quotes').find().toArray(),
                args
            )
        }
    }
});

const quotesLibrary = {};

const queryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        quotesLibrary: {
            type: QuotesLibraryType,
            description: 'the quotes library',
            resolve: ()=> quotesLibrary
        }
    }
});

const mySchema = new GraphQLSchema({
    query: queryType
});

export {
    mySchema
};
