const typeDefs = `
    type User {
        _id: ID!
        userName: String!
        firstName: String!
        lastName: String!
        email: String!
        role: String!
        memberships: [Membership]
    }

    type Movie {
        _id: ID!
        title: String!
        description: String!
        releaseYear: Int!
        genre: String!
        director: String!
        image: String
    }

    type Membership {
        _id: ID!
        title: String!
        description: String!
        startDate: String!
        endDate: String!
        status: String!
        userId: ID!
    }

    type Event {
        _id: ID!
        title: String!
        description: String!
        date: String!
        movie: Movie!
    }

    type Auth {
        token: String!
        user: User
    }

    type Query {
        users: [User]
        user(_id: ID!): User
        movies: [Movie]
        memberships: [Membership]
        events: [Event]
    }

    type Mutation {
        createUser(
            userName: String!
            firstName: String!
            lastName: String!
            email: String!
            password: String!
        ): User

        updateUser(
            _id: ID!
            userName: String
            firstName: String
            lastName: String
            email: String
        ): User

        deleteUser(_id: ID!): User

        createMovie(
            title: String!
            description: String!
            releaseYear: Int!
            genre: String!
            director: String!
            image: String
        ): Movie

        deleteMovie(_id: ID!): Movie

        createMembership(
            title: String!
            description: String!
            startDate: String!
            endDate: String!
            status: String!
            userId: ID!
        ): Membership

        updateMembership(
            _id: ID!
            title: String
            description: String
            startDate: String
            endDate: String
            status: String
        ): Membership

        deleteMembership(_id: ID!): Membership

        createEvent(
            title: String!
            description: String!
            date: String!
            movie: ID!
        ): Event

        updateEvent(
            _id: ID!
            title: String
            description: String
            date: String
            movie: ID
        ): Event

        deleteEvent(_id: ID!): Event

        login(
            email: String!
            password: String!
        ): Auth
    
    }

    `;

module.exports = typeDefs;