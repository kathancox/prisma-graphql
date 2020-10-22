const { gql } = require('apollo-server')
const { prisma } = require('./db')

const typeDefs = gql`
  type User {
    email: String!
    id: ID!
    name: String
    posts: [Post!]!
  }
  type Post {
    content: String
    id: ID!
    published: Boolean!
    title: String!
    author: User
  }
  type Query {
    feed: [Post!]!
    post(id: ID!): Post
  }
  type Mutation {
    createUser(data: UserCreateInput!): User!
    createDraft(authorEmail: String, content: String, title: String!): Post!
    publish(id: ID!): Post
  }
  input UserCreateInput {
    email: String!
    name: String
    posts: [PostCreateWithoutAuthorInput!]
  }
  input PostCreateWithoutAuthorInput {
    content: String
    published: Boolean
    title: String!
  }
`

const resolvers = {
  Query: {
    feed: (parent, args) => {
      return prisma.post.findMany({
        where: { published: true },
      })
    },
    post: (parent, args) => {
      return prisma.post.findOne({
        where: { id: Number(args.id) },
      })
    },
  },
  Mutation: {
    createDraft: (parent, args) => {
      return prisma.post.create({
        data: {
          title: args.title,
          content: args.content,
          published: false,
          author: args.authorEmail && {
            connect: { email: args.authorEmail },
          },
        },
      })
    },
    publish: (parent, args) => {
      return prisma.post.update({
        where: { id: Number(args.id) },
        data: {
          published: true,
        },
      })
    },
    createUser: (parent, args) => {
      return prisma.user.create({
        data: {
          email: args.data.email,
          name: args.data.name,
          posts: {
            create: args.data.posts,
          },
        },
      })
    },
  },
  User: {
    posts: (parent, args) => {
      return prisma.user
        .findOne({
          where: { id: parent.id },
        })
        .posts()
    },
  },
  Post: {
    author: (parent, args) => {
      return prisma.post
        .findOne({
          where: { id: parent.id },
        })
        .author()
    },
  },
}

module.exports = {
  resolvers,
  typeDefs,
}
