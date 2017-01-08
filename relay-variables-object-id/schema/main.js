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
    globalIdField,
    fromGlobalId,
    nodeDefinitions,
    connectionDefinitions,
    connectionArgs,
    connectionFromPromisedArray
} from 'graphql-relay';

import { ObjectID } from 'mongodb';

const globalIdFetcher = (globalId, {db}) => {
    const {type, id} = fromGlobalId(globalId);
    switch(type){
        case 'QuotesLibrary':
            return quotesLibrary;
        case 'Quote':
            return db.collection('quotes').findOne(ObjectID(id));
        default:
            return null;
    }
};

const globalTypeResolver = obj => obj.type || QuoteType;

const { nodeInterface, nodeField } = nodeDefinitions(
    globalIdFetcher,
    globalTypeResolver
);

const QuoteType = new GraphQLObjectType({
    name: "Quote",
    interfaces: [nodeInterface],
    fields: {
        id: globalIdField('Quote', obj => obj._id),
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
    interfaces: [nodeInterface],
    fields: {
        id: globalIdField('QuotesLibrary'),
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

const quotesLibrary = { type : QuotesLibraryType };

const queryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        node: nodeField,
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
