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
        posterPath: String
        tmdbId: String      
    }

    type Membership {
        _id: ID!
        title: String!
        description: String
        startDate: String
        endDate: String
        price: Float
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
        movie(_id: ID!): Movie
        memberships: [Membership]
        events: [Event]
        getPrice: Float
    }

    type Mutation {
        signup(
            userName: String!
            firstName: String!
            lastName: String!
            email: String!
            password: String!
        ): AuthPayload

        updateUser(
            _id: ID!
            userName: String
            firstName: String
            lastName: String
            email: String
        ): User

        addUser(
            userName: String!, 
            email: String!, 
            password: String!, 
            firstName: String!, 
            lastName: String!
        ): AuthPayload!

          

        deleteUser(_id: ID!): User

        addMovie(
            title: String!
            description: String!
            releaseYear: Int!
            genre: String!
            director: String!
            posterPath: String,
            tmdbId: String
          ): Movie!

        updateMovie(
            _id: ID!
            title: String
            description: String
            releaseYear: Int
            genre: String
            director: String
            posterPath: String
            tmdbId: String
        ): Movie

        deleteMovie(_id: ID!): Movie

        updateMembership(
            _id: ID!
            title: String
            description: String
            startDate: String
            endDate: String
            price: Float
        ): Membership

        addMembership(
            title: String!
            description: String
            startDate: String
            endDate: String
            price: Float
          ): Membership

        deleteMembership(_id: ID!): Membership

        addEvent(
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
    
    type AuthPayload {
        token: String!
        user: User
    }

    `;

module.exports = typeDefs;