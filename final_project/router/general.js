const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      //if (!doesExist(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      //} else {
        //return res.status(404).json({message: "User already exists!"});    
      //}
    } 
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    let filtered_books = books.filter((book) => book.isbn === isbn);    
    res.send(filtered_books);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    let filtered_books = books.filter((book) => book.author === author);    
    res.send(filtered_books);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    let filtered_books = books.filter((book) => book.title === title);    
    res.send(filtered_books);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    let filtered_books = books.filter((book) => book.isbn === isbn);    
    res.send(filtered_books[0].reviews);
});

//  Get books with Promise
public_users.get('/promise/',function (req, res) {
    let myPromise = new Promise((resolve,reject) => {
        all_books = JSON.stringify(books,null,4)
        resolve(all_books)
    })
    myPromise.then((successMessage) => {
        res.send(successMessage);
    })
});

//  Get books with Promise by ISBN
public_users.get('/promise/isbn',function (req, res) {
    let myPromise = new Promise((resolve,reject) => {
        const isbn = req.params.isbn;
        let filtered_books = books.filter((book) => book.isbn === isbn);
        resolve(filtered_books)
    })
    myPromise.then((successMessage) => {
        res.send(successMessage);
    })
});

//  Get books with Promise by author
public_users.get('/promise/author',function (req, res) {
    let myPromise = new Promise((resolve,reject) => {
        const author = req.params.author;
        let filtered_books = books.filter((book) => book.author === author);
        resolve(filtered_books)
    })
    myPromise.then((successMessage) => {
        res.send(successMessage);
    })
});

//  Get books with Promise by title
public_users.get('/promise/title',function (req, res) {
    let myPromise = new Promise((resolve,reject) => {
        const title = req.params.title;
        let filtered_books = books.filter((book) => book.title === title);
        resolve(filtered_books)
    })
    myPromise.then((successMessage) => {
        res.send(successMessage);
    })
});

module.exports.general = public_users;
