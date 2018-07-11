'use strict'

const time = new Date()

const datasources = [
  {
    name: 'memeolist',
    type: 'InMemory',
    config: '{"options":{"timestampData":true}}',
    createdAt: time,
    updatedAt: time
  }
]

const notesSchema = {
  schema: `
  
  type Profile {
    _id: ID! @isUnique
    email: String! @isUnique
    display_name: String!
    biography: String!
    pictureUrl: String!
    memes: [Meme]!
  }
  
  type Meme {
    _id: ID! @isUnique
  }
  
  type Query {
    allProfiles:[Profile!]!
    profile(email: String!):Profile!
  }
  
  type Mutation {
    createProfile(email: String!, display_name: String!, biography: String!, pictureUrl: String!):Profile!
    updateProfile(id: ID!, email: String!, display_name: String!, biography: String!, pictureUrl: String!):Profile!
    deleteProfile(id: ID!):Boolean!
  }
  
  type Subscription {
    _: Boolean
  }
  `,
  createdAt: time,
  updatedAt: time
}

const resolvers = [
  {
    type: 'Query',
    field: 'allProfiles',
    DataSourceId: 1,
    requestMapping: '{"operation": "find", "query": {"_type":"profile"}}',
    responseMapping: '{{toJSON context.result}}',
    createdAt: time,
    updatedAt: time
  },
  {
    type: 'Query',
    field: 'profile',
    DataSourceId: 1,
    requestMapping: '{"operation": "findOne","query": {"_type":"profile", "email": "{{context.arguments.email}}" }}',
    responseMapping: '{{toJSON context.result}}',
    createdAt: time,
    updatedAt: time
  },
  {
    type: 'Mutation',
    field: 'createProfile',
    DataSourceId: 1,
    requestMapping: `{
      "operation": "insert",
      "doc": {
        "_type":"profile", 
        "email": "{{context.arguments.email}}",
        "display_name": "{{context.arguments.display_name}}", 
        "biography": "{{context.arguments.biography}}",    
        "pictureUrl": "{{context.arguments.pictureUrl}}",
        "memes": []    
      }
    }`,
    responseMapping: '{{toJSON context.result}}',
    createdAt: time,
    updatedAt: time
  },
  {
    type: 'Mutation',
    field: 'updateProfile',
    DataSourceId: 1,
    requestMapping: `{
      "operation": "update",
      "query": {"_type":"profile", "_id": "{{context.arguments.id}}" },
      "update": { 
        "$set": {
          "email": "{{context.arguments.email}}",
          "display_name": "{{context.arguments.display_name}}", 
          "biography": "{{context.arguments.biography}}",    
          "pictureUrl": "{{context.arguments.pictureUrl}}"
        }    
      }
    }`,
    responseMapping: '{{toJSON context.result}}',
    createdAt: time,
    updatedAt: time
  },
  {
    type: 'Mutation',
    field: 'deleteProfile',
    DataSourceId: 1,
    requestMapping: `{
      "operation": "remove",
      "query": {"_type":"profile", "_id": "{{context.arguments.id}}" }
    }`,
    responseMapping: '{{toJSON context.result}}',
    createdAt: time,
    updatedAt: time
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('DataSources', datasources, {})
    await queryInterface.bulkInsert('GraphQLSchemas', [notesSchema], {})
    return queryInterface.bulkInsert('Resolvers', resolvers, {})
  }
}
