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

const QuotesLibraryType = new GraphQLObjectType({
    name: 'QuotesLibrary',
    fields: {
        allQuotes: {
            type: new GraphQLList(QuoteType),
            description: 'A list of the quotes in the database',
            resolve: (_, args, { db }) => 
                db.collection('quotes').find().toArray()
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
