const graphql = require('graphql')

const {
  // buildSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLSchema
} = graphql

// Dummy data
const COMPANIES = [
  { id: '0', name: 'Apple', values: ['smart'] },
  { id: '1', name: 'Olla', values: ['autonomy', 'ownership'] },
  { id: '2', name: 'MindSource', values: [] },
  { id: '3', name: 'Sourcegraph', values: ['smart', 'friendly', 'transparent'] }
]

const APPLICATIONS = [
  {
    id: '1',
    companyId: '1',
    position: 'Front End Developer',
    coverLetter: 'This is the cover letter yo',
    tags: ['frontend', 'react', 'communication']
  },
  {
    id: '2',
    companyId: '0',
    position: 'Full Stack Engineer',
    coverLetter: 'This is the cover #2 letter yo',
    tags: ['fullstack', 'java', 'typescript']
  },
  {
    id: '3',
    companyId: '1',
    position: 'Full Stack Developer',
    coverLetter: 'This is a full stack cover letter yo',
    tags: ['fullstack', 'typescript', 'python', 'communication']
  }
]

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    values: { type: new GraphQLList(GraphQLString) },
    applications: {
      type: new GraphQLList(ApplicationType),
      resolve(parent, args) {
        return APPLICATIONS.filter(app => app.companyId === parent.id)
      }
    }
  })
})

const ApplicationType = new GraphQLObjectType({
  name: 'Application',
  fields: () => ({
    id: { type: GraphQLID },
    company: {
      type: CompanyType,
      resolve(parent, args) {
        return COMPANIES.find(comp => comp.id === parent.companyId)
      }
    },
    position: { type: GraphQLString },
    coverLetter: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    application: {
      type: ApplicationType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return APPLICATIONS.find(app => args.id === app.id)
      }
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return COMPANIES.find(comp => args.id === comp.id)
      }
    },
    companies: {
      type: new GraphQLList(CompanyType),
      resolve(parent, args) {
        return COMPANIES
      }
    },
    applications: {
      type: new GraphQLList(ApplicationType),
      resolve(parent, args) {
        return APPLICATIONS
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})

/**
 * GraphQL Schema Language version
 */
// TODO: add back under Application when time!
// company: Company!
// const schema = buildSchema(`
//   type Company {
//     id: ID!
//     name: String!
//     values: [String]
//   }

//   type Application {
//     id: ID!
//     companyId: ID
//     position: String!
//     coverLetter: String
//     tags: [String]
//   }

//   type Query {
//     company(name: String!): [Company]!
//     application(id: ID!): Application
//   }
// `)

// const resolvers = {
//   // name: name => COMPANIES.find(comp => comp.name === name.toLocaleLowerCase()),
//   Query: {
//     company: args => [
//       COMPANIES.find(
//         comp => comp.name.toLocaleLowerCase() === args.name.toLocaleLowerCase()
//       )
//     ],
//     application: args =>
//       APPLICATIONS.find(
//         app => app.id.toLocaleLowerCase() === args.id.toLocaleLowerCase()
//       )
//   }

//   // values: value =>
//   //   COMPANIES.find(comp => comp.values.includes(value.toLocaleLowerCase()))
//   // company: () => [COMPANIES[0], COMPANIES[1]],
//   // name: () => [COMPANIES[0], COMPANIES[1]],
//   // values: () => [COMPANIES[2]]
// }

// module.exports = {
//   schema: schema,
//   resolvers: resolvers
// }
