import { gql } from '@apollo/client';

export const SIGNUP_MUTATION = gql`
  mutation Signup($userName: String!, $firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    signup(userName: $userName, firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

// User Mutations
export const UPDATE_USER = gql`
  mutation UpdateUser($_id: ID!, $userName: String, $firstName: String, $lastName: String, $email: String) {
    updateUser(_id: $_id, userName: $userName, firstName: $firstName, lastName: $lastName, email: $email) {
      _id
      userName
      firstName
      lastName
      email
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($_id: ID!) {
    deleteUser(_id: $_id) {
      _id
    }
  }
`;

// Movie Mutations
export const ADD_MOVIE = gql`
  mutation AddMovie($title: String!, $description: String!, $releaseYear: Int!, $genre: String!, $director: String!, $image: String!) {
    addMovie(title: $title, description: $description, releaseYear: $releaseYear, genre: $genre, director: $director, image: $image) {
      _id
      title
      description
      releaseYear
      genre
      director
      image
    }
  }
`;

export const UPDATE_MOVIE = gql`
  mutation UpdateMovie($_id: ID!, $title: String, $description: String, $releaseYear: Int, $genre: String, $director: String, $image: String) {
    updateMovie(_id: $_id, title: $title, description: $description, releaseYear: $releaseYear, genre: $genre, director: $director, image: $image) {
      _id
      title
      description
      releaseYear
      genre
      director
      image
    }
  }
`;

export const DELETE_MOVIE = gql`
  mutation DeleteMovie($_id: ID!) {
    deleteMovie(_id: $_id) {
      _id
    }
  }
`;

// Membership Mutations
export const ADD_MEMBERSHIP = gql`
  mutation AddMembership($userId: ID!, $title: String!, $description: String!, $startDate: String!, $endDate: String!, $status: String!) {
    addMembership(userId: $userId, title: $title, description: $description, startDate: $startDate, endDate: $endDate, status: $status) {
      _id
      title
      description
      startDate
      endDate
      status
      userId
    }
  }
`;

export const UPDATE_MEMBERSHIP = gql`
  mutation UpdateMembership($_id: ID!, $title: String, $description: String, $startDate: String, $endDate: String, $status: String) {
    updateMembership(_id: $_id, title: $title, description: $description, startDate: $startDate, endDate: $endDate, status: $status) {
      _id
      title
      description
      startDate
      endDate
      status
    }
  }
`;

export const DELETE_MEMBERSHIP = gql`
  mutation DeleteMembership($_id: ID!) {
    deleteMembership(_id: $_id) {
      _id
    }
  }
`;

// Event Mutations
export const ADD_EVENT = gql`
  mutation AddEvent($title: String!, $description: String!, $date: String!, $movie: ID!) {
    addEvent(title: $title, description: $description, date: $date, movie: $movie) {
      _id
      title
      description
      date
      movie {
        _id
        title
      }
    }
  }
`;

export const UPDATE_EVENT = gql`
  mutation UpdateEvent($_id: ID!, $title: String, $description: String, $date: String, $movie: ID) {
    updateEvent(_id: $_id, title: $title, description: $description, date: $date, movie: $movie) {
      _id
      title
      description
      date
      movie {
        _id
        title
      }
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation DeleteEvent($_id: ID!) {
    deleteEvent(_id: $_id) {
      _id
    }
  }
`;
