import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList
}
from 'graphql';

const roll = () => Math.floor(6* Math.random()) +1;

const queryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        hello: {
            type: GraphQLString,
            resolve: () => 'world'
        },
        diceRoll: {
            type: new GraphQLList(GraphQLInt),
            resolve: () => [roll(), roll()]
        }
    }
});

const mySchema = new GraphQLSchema({
    query: queryType
});

export default mySchema;
