import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import * as api from '../../api/index';
import BooksCount from './BooksCount';
import BooksImg from "./books-stack-of-three.png"


function BooksForWorkers() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();






  useEffect(() => {
    api.getAllUsers()
      .then(res => {
        setData(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");

    if (isConfirmed) {
      api.deleteUser(id)
        .then(res => {
          console.log('Delete Response:', res);
          window.location.reload();
        })
        .catch(err => {
          console.error('Error deleting book:', err);
          // Handle error as needed
        });
    }
  };



  return (
    <div className=" mt-20 p-4">
      <div className='flex  flex-row text-3xl font-mono h-36 w-full rounded items-center justify-around'>
        <div className='bg-red-400 w-1/4 h-full flex flex-col items-center rounded'>
        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-people w-20 h-20" viewBox="0 0 16 16">
            <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
          </svg>
          {Array.isArray(data) && (
            
            <div className=''>
              Total Users:  {data.length}
            </div>
          )}
        </div>
        <div className='bg-green-400 h-full w-1/4 flex flex-col items-center rounded'>
          <img src={BooksImg} alt="" className='w-20 ' />
          <BooksCount />
        </div>


      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">

        {Array.isArray(data) &&
          data?.map((user, index) => (
            <div className="bg-slate-300 p-4 rounded-lg" key={index}>

              <div className="flex flex-col gap-2 mt-4">
                <p className="font-mono font-bold text-lg">Name: {user.name}</p>
                <p className="font-mono text-sm">{user.email}</p>

                <div className="flex flex-row gap-2">
                  <Link
                    to={`/dashboard/worker/updateUserForWorkers/${user._id}`}
                    className="w-1/2 py-2 px-4 inline-flex items-center justify-center text-sm font-semibold rounded-lg border border-transparent bg-green-100 text-green-800 hover:bg-green-200 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-green-300 dark:text-green-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    UPDATE
                  </Link>
                  <button
                    onClick={() => handleDelete(user._id)}
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
