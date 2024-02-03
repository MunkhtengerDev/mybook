import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import * as api from '../../api/index';
import BooksCount from './BooksCount';

function BooksForWorkers() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.getAllBooks()
      .then(res => {
        setData(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this book?");

    if (isConfirmed) {
      api.deleteBook(id)
        .then(res => {
          console.log('Delete Response:', res);
          window.location.reload();
          navigate('/dashboard/worker/booksForWorkers');
        })
        .catch(err => {
          console.error('Error deleting book:', err);
          // Handle error as needed
        });
    }
  };

  return (
    <div className="bg-white mt-20 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.isArray(data) &&
          data?.map((book, index) => (
            <div className="bg-slate-300 p-4 rounded-lg" key={index}>
              <Link to={`/dashboard/worker/booksInfoForWorkers/${book._id}`}>
                <div className="relative flex items-center justify-center h-96 overflow-hidden rounded-md">
                  <img className="object-cover h-full" src={book.cover} alt="" />
                </div>
              </Link>
              <div className="flex flex-col gap-2 mt-4">
                <p className="font-mono font-bold text-lg">Title: {book.title}</p>
                <p className="font-mono text-sm">by {book.author}</p>

                <div className="flex flex-row gap-2">
                  <Link
                    to={`/dashboard/worker/update/${book._id}`}
                    className="w-1/2 py-2 px-4 inline-flex items-center justify-center text-sm font-semibold rounded-lg border border-transparent bg-green-100 text-green-800 hover:bg-green-200 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-green-300 dark:text-green-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    UPDATE
                  </Link>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="w-1/2 py-2 px-4 inline-flex items-center justify-center text-sm font-semibold rounded-lg border border-transparent bg-rose-100 text-rose-800 hover:bg-rose-200 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-red-300 dark:text-red-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    DELETE
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default BooksForWorkers;
