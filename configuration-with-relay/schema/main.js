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

const queryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        allQuotes: {
            type: new GraphQLList(QuoteType),
            description: 'A list of quotes in the database',
            resolve: (_, args, { db }) =>
                db.collection('quotes').find().toArray()
        }
            // usersCount: {
            //     description: 'Toital number of users in the database',
            //     type: GraphQLInt,
            //     resolve: (_, args, {
            //         db
            //     }) => db.collection('users').count()
            // }
    }
});

const mySchema = new GraphQLSchema({
    query: queryType
});

export {
    mySchema
};
