const {
    addBook,
    getBooks,
    getBook,
    changeBook,
    delBook,
    delBooks,
    getAllDetails
} = require('./handler');

const routes = [
    {
      method: 'POST',
      path: '/books',
      handler: addBook,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getBooks,
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getBook,
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: changeBook,
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: delBook,
    },
    {
        method: 'GET',
        path: '/books/clear',
        handler: delBooks,
    },
    {
        method: 'GET',
        path: '/books/details',
        handler: getAllDetails,
    }
];
module.exports = routes;