import { find, filter } from 'lodash';
import * as jwt from 'jsonwebtoken';

const APP_SECRET = 'GraphQL-is-aw3some';


let posts = [
    { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2, createdAt: 1517385047881},
];
  
let authors = [
    { id: 1, firstName: 'Coleman', lastName: 'Tom', pass: '123456' },
    { id: 2, firstName: 'Sashko', lastName: 'Stubailo', pass: '123456' },
    { id: 3, firstName: 'Mikhail', lastName: 'Novikov', pass: '123456' },
];

const resolvers = {
    Query: {
      posts: () => posts,
      authors: () => authors, 
      author(obj: object, args: any) {
        let author = find(authors, { id: args.id });
        console.log(args, author);
        return author;
      },
      post(obj: object, args: any) {
        return find(posts, { id: args.id });
      },
      
    },
    Mutation: {
      createAuthor(obj: object, args:any) {
        let data = Object.keys(args.input).map(key=>args.input[key]);
        console.log(args.input, data);
        let getIdRandom = authors.slice(-1)[0].id + 1;
        let author = {
          id: getIdRandom,
          firstName: data[0],
          lastName: data[1],
          pass: data[2],
        }
        authors.push(author);
        return author;
      },
      createPost(obj: object, args:any) {
        let data = Object.keys(args.input).map(key=>args.input[key]);
        let setId = posts.slice(-1)[0].id + 1 ;
        let date = new Date().getTime();
        let post = {
          id: setId,
          title: data[0],
          votes: data[1],
          authorId: data[2],
          createdAt: date,
        }
        console.log(args.input, date, post);
        posts.push(post);
        return post;
      },
      updateAuthor(obj: object, args:any) {
        let author = find(authors, { id: args.id });
        let data = Object.keys(args.input).map(key=>args.input[key]);
        if (!author) {
          throw new Error(`Couldn't find with id ${args.id}`);
        }
        author.firstName = data[0];
        author.lastName  = data[1];
        author.pass      = data[2];
        console.log(author);
        return author;
      },
      deleteAuthor(obj: object, args:any){
        let author = find(authors, { id: args.id });
        let deleteAuthor = authors.filter( value =>{
          return value.id !== args.id;
        });
        authors = deleteAuthor;
        return author;
      },
      deletePost(obj: object, args:any){
        let post = find(posts, { id: args.id });
        let deletePost = posts.filter( value =>{
          return value.id !== args.id;
        });
        posts = deletePost;
        return post;
      },
      login(obj: Object, args: any){
        let data = Object.values(args);
        let author = find(authors, { lastName: data[0], pass: data[1] });
        console.log(data, author);
        if (!author) {
          throw new Error('No such user found');
        }
        return {
            author,
            token: jwt.sign({ authorId: author.id }, APP_SECRET),
          }
      },
      signUp(obj: Object, args: any){
        let data = Object.values(args);
        let au = find(authors, { lastName: data[1]});
        if (au) {
          throw new Error('user is exist !');
        }
        let getIdRandom = authors.slice(-1)[0].id + 1;
        let author = {
          id: getIdRandom,
          firstName: data[0],
          lastName: data[1],
          pass: data[2],
        }
        authors.push(author);
        return {
            author,
            token: jwt.sign({ authorId: author.id }, APP_SECRET),
          }
      },
      
    },
    Author: {
      posts: (author) => filter(posts, { authorId: author.id }),
    },
    Post: {
      author: (post) => find(authors, { id: post.authorId }),
    },
};

export default resolvers