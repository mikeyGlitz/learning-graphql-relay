import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList
}
from 'graphql';

const roll = () => Math.floor(6 * Math.random()) + 1;

const queryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        hello: {
            type: GraphQLString,
            resolve: () => 'world'
        },
        diceRoll: {
            args: {
                count: {
                    type: GraphQLInt
                }
            },
            description: "*** Simulate** a dice roll determined by count",
            type: new GraphQLList(GraphQLInt),
            resolve: (_, args) => {
                const rolls = [];
                for (let i = 0; i < args.count; i++) {
                    rolls.push(roll());
                }
                return rolls;
            }
        },
        usersCount: {
            description: "Total number of users in the database",
            type: GraphQLInt,
            resolve: (_, args, {
                    db
                }) =>
                db.collection('users').count()
        }
    }
});

const mySchema = new GraphQLSchema({
    query: queryType
});

export default mySchema;
