const graphql = require('graphql')
const { ApplicationModel: Application } = require('../models/application')
const { CompanyModel: Company } = require('../models/company')

const {
  // buildSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLSchema,
  GraphQLNonNull
} = graphql

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    values: { type: new GraphQLList(GraphQLString) },
    applications: {
      type: new GraphQLList(ApplicationType),
      resolve(parent, args) {
        return Application.where({ companyId: parent.id }).exec()
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
        return Company.findById(parent.companyId)
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
        return Application.findById(args.id)
      }
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Company.findById(args.id)
      }
    },
    companies: {
      type: new GraphQLList(CompanyType),
      resolve(parent, args) {
        return Company.find().exec()
      }
    },
    applications: {
      type: new GraphQLList(ApplicationType),
      resolve(parent, args) {
        return Application.find().exec()
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addCompany: {
      type: CompanyType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        values: { type: new GraphQLList(GraphQLString) }
      },
      resolve(parent, args) {
        let company = new Company({
          name: args.name,
          values: args.values
        })

        console.debug(`Saving new Company: ${JSON.stringify(company)}`)
        return company.save()
      }
    },
    addApplication: {
      type: ApplicationType,
      args: {
        position: { type: new GraphQLNonNull(GraphQLString) },
        coverLetter: { type: GraphQLString },
        tags: { type: new GraphQLList(GraphQLString) },
        companyId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let application = new Application({
          position: args.position,
          coverLetter: args.coverLetter,
          tags: args.tags,
          companyId: args.companyId
        })

        console.debug(`Saving new Application: ${JSON.stringify(application)}`)
        return application.save()
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
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
