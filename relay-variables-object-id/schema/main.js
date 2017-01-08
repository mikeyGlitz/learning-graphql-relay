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
        },
        likesCount: {
            type: GraphQLInt,
            resolve: () => Math.floor(10 * Math.random())
        }
    }
});

const { connectionType: QuotesConnectionType } =
    connectionDefinitions({
        name: 'Quote',
        nodeType: QuoteType
    });

const connectionArgsWithSearch = connectionArgs;
connectionArgsWithSearch.searchTerm = { type: GraphQLString };

const QuotesLibraryType = new GraphQLObjectType({
    name: 'QuotesLibrary',
    fields: {
        quotesConnection: {
            type: QuotesConnectionType,
            description: 'A list of the quotes in the database',
            args: connectionArgsWithSearch,
            resolve: (_, args, { db }) => {
                const findParams = {};
                if (args.searchTerm){
                    findParams.text = new RegExp(args.searchTerm, 'i');
                }
                return connectionFromPromisedArray(
                    db.collection('quotes').find(findParams).toArray(),
                    args
                );
            }
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
