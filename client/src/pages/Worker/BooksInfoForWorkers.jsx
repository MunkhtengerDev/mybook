import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import * as API from '../../api/index';

function BooksInfoForWorkers() {
  const [book, setBook] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    API.getBookById(id)
      .then(res => {
        console.log('res =================> ', res);
        setBook(res.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this book?");

    if (isConfirmed) {
      API.deleteBook(id)
        .then(res => {
          console.log(res);
          window.location.reload();
          navigate('dashboard/worker/booksForWorker');
        })
        .catch(err => console.log(err));
    }
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="flex justify-center mt-20">
      <div className="w-3/4 p-8 rounded-lg shadow-md">
        {book && (
          <div className='flex flex-row items-start'>
            <div className="object-cover w-1/3 rounded-md">
              <img className="w-full h-full" src={book.cover} alt="" />
            </div>
            <div className="flex flex-col gap-4 ml-8 w-2/3">
              <p className="font-mono font-bold text-4xl">{book.title}</p>
              <p className="font-mono text text-xl">by {book.author}</p>
              <p className="text-gray-700">
                {showFullDescription
                  ? book.description
                  : book.description.length > 350
                    ? `${book.description.slice(0, 350)}...`
                    : book.description}
                {book.description.length > 350 && (
                  <span
                    className="text-blue-500 cursor-pointer"
                    onClick={toggleDescription}
                  >
                    {showFullDescription ? ' Show Less' : ' Show More'}
                  </span>
                )}
              </p>
              <p className="text-gray-700"> Genre: {book.genres}</p>
              <p className="text-gray-700">Language: {book.language}</p>
              <p className="text-gray-700">Released Date: {book.released}</p>
              <p className="text-gray-700">Pages: {book.page}</p>
              <p className="text-gray-700">Publisher: {book.publisher}</p>

              <div className="flex flex-row gap-4 mt-4">
                <Link
                  to={`/dashboard/worker/update/${book._id}`}
                  className="w-24 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-green-100 text-green-800 hover:bg-green-200 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-green-300 dark:text-green-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  UPDATE
                </Link>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="w-24 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-rose-100 text-rose-800 hover:bg-rose-200 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-red-300 dark:text-red-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  DELETE
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BooksInfoForWorkers;
