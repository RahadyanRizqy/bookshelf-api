const { nanoid } = require('nanoid');
const books = require('./books');

const addBook = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }

    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    let finished = false;
    if (pageCount === readPage) {
        finished = true;
    }
    const newBook = {
        id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt,
    };
    books.push(newBook);
    const isSuccess = books.filter((book) => book.id === id).length > 0;
    if (isSuccess) {
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id,
        },
      });
      response.header('Content-Type', 'application/json');
      response.code(201);
      return response;
    }
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;
};

const getBooks = (request, h) => {
  const { name, reading, finished } = request.query;
  if (name) {
    return {
      status: 'success',
      data: {
        books: books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase())).map(({id, name, publisher}) => ({ id, name, publisher })),
      },
    };
  } 
  else if (reading) {
    const readStatus = reading === '1' ? true : false;
    return {
      status: 'success',
      data: {
        books: books.filter((book) => book.reading === readStatus).map(({id, name, publisher}) => ({ id, name, publisher })),
      },
    };
  } 
  else if (finished) {
    const finishStatus = finished === '1' ? true : false;
    return {
      status: 'success',
      data: {
        books: books.filter((book) => book.finished === finishStatus).map(({id, name, publisher}) => ({ id, name, publisher })),
      },
    };
  }
  else {
    return {
      status: 'success',
      data: {
        books: books.map(({ id, name, publisher }) => ({ id, name, publisher })),
      },
    };
  }
};

const getBook = (request, h) => {
    const { id } = request.params;

    const book = books.filter((b) => b.id === id)[0];
  
    if (book !== undefined) {
      return {
        status: 'success',
        data: {
          book,
        },
      };
    }
  
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
};

const changeBook = (request, h) => {
    const { id } = request.params;

    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    // const updatedAt = new Date().toISOString();

    const index = books.findIndex((book) => book.id === id);

    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }

    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    if (index !== -1) {
        books[index] = {
          ...books[index],
          name,
          year,
          author,
          summary,
          publisher,
          pageCount, 
          readPage,
          reading,
        };
        const response = h.response({
          status: 'success',
          message: 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;
      }
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
      });
      response.code(404);
      return response;
};

const delBook = (request, h) => {
    const { id } = request.params;
  
    const index = books.findIndex((book) => book.id === id);
    if (index !== -1) {
      books.splice(index, 1);
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
      });
      response.code(200);
      return response;
    }
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

const delBooks = (request, h) => {
    books.length = 0;
    if (books.splice(0, books.length)) {
      const response = h.response({
        status: 'success',
        message: 'Semua buku berhasil dihapus',
      });
      response.code(200);
      return response;
    }
    const response = h.response({
      status: 'fail',
      message: 'Semua buku gagal dihapus.',
    });
    response.code(404);
    return response;
};

const getAllDetails = () => ({
  status: 'success',
  data: {
    books: books,
  },
});

module.exports = {
    addBook,
    getBooks,
    getBook,
    changeBook,
    delBooks,
    delBook,
    getAllDetails
};