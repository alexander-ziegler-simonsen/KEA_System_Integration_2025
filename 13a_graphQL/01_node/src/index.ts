import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { PubSub } from 'graphql-subscriptions';
import * as fs from "fs";

// functions for handling json
async function parseJson(input) {
    return new Promise((resolve, reject) => {
        try {

            let data = JSON.parse(input);

            resolve(data);
        }

        catch (error) {
            console.log("something went wrong in 'parseJson'")
            console.error("error", error);
        }
    })
}

async function readFromFile(path) {
    return new Promise((resolve, reject) => {
        try {
            // read from file
            fs.readFile(path, 'utf-8', (err, data) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                resolve(data);
            })
        }
        catch (error) {
            console.log("something went wrong in 'parseXml'")
            console.error("error", error);
            reject(error);
        }
    })
}

// types for ts
interface Book {
  id: string,
  title: String,
  releaseYear: number
  authorId: string
  author: Author
}

interface Author {
    id: string,
    name: String,
    books: Array<Book>
}

// the data 
let jsonAuthorObj = await readFromFile("./data/authors.json");
let authors = await parseJson(jsonAuthorObj) as Author[];

let jsonBookObj = await readFromFile("./data/books.json");
let books = await parseJson(jsonBookObj) as Book[];

const pubsub = new PubSub();

// tag
const BOOK_ADDED = 'BOOK_ADDED';

// resolver
const resolvers = {
  Query: {
    books: () => books,
    authors: () => authors,
    author: (_: any, args: {id: string}) => (authors).filter(x => x.id == args.id)[0],
    book: (_: any, args: {id: string}) => books.filter(x => x.id == args.id)[0],
  },
  Mutation: {
    createBook: (_: any, args: { authorId: string; title: string; releaseYear?: number  }) => {
        const newBook: Book = {
            id: String(books.length + 1), // TODO - not safe, will cause errors
            authorId: args.authorId,
            title: args.title,
            releaseYear: args.releaseYear ?? null,
            author: authors.filter(x => x.id == args.authorId)[0] // TODO - not safe, will cause errors
        };
        (books).push(newBook);
        pubsub.publish(BOOK_ADDED, {bookAdded: newBook});
        return newBook;
    },
    updateBook: (_: any, args: { id: string; authorId: string; title: string; releaseYear?: number  }) => {
        // reference to our json db obj
        const book = books.find(b => b.id == args.id)
        if (!book) return null;
        if (args.authorId !== undefined) { 
          book.authorId = args.authorId;
          book.author = authors.filter(x => x.id == args.authorId)[0];
         }
        if (args.title !== undefined) book.title = args.title;
        if (args.releaseYear !== undefined) book.releaseYear = args.releaseYear;
        return book;
    },
    deleteBook: (_: any, args: { id: string  }) => {
        const index = books.findIndex(b => b.id == args.id);
        if (index === -1) return { message: "Book not found", errorCode: 404 };
        books.splice(index, 1);
        return { message: "Book deleted successfully" };
    }
  },
  Subscription: {
    bookAdded: {
        subscribe: () => (pubsub as any).asyncIterator([BOOK_ADDED]),
    },
  },
};

// the schema for this project
const typeDefs = `#graphql

  type Book {
    id: ID!
    title: String
    releaseYear: Int
    authorId: ID!
    author: Author
}

type Author {
    id: ID!
    name: String
    books: [Book]
}

type ErrorMessage {
    message: String,
    errorCode: Int
}

type SuccessMessage {
    message: String
}

type Query {
    "Get all books"
    books: [Book]

    "Get a book by id"
    book(id: ID!): Book,

    "Get all authors"
    authors: [Author]

    "Get an author by id"
    author(id: ID!): Author
}

type Mutation {
    "Create a new book"
    createBook(authorId: ID!, title: String!, releaseYear: Int): Book

    "Update a book by id"
    updateBook(id: ID!, authorId: ID, title: String, releaseYear: Int): Book
 
    "Delete a book by id"
    deleteBook(id: ID!): SuccessMessage
}

type Subscription {
    "Updates when a new book has been added"
    bookAdded: Book
}
`;

// apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// 'startStandaloneServer' does not support subscription
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server ready at: ${url}`);