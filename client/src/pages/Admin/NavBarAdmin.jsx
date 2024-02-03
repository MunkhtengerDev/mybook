import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import * as API from "../../api/index"


const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [showDiv, setShowDiv] = useState(false);
  const user = JSON.parse(localStorage.getItem('auth'))?.user.role === 1;
  const auth = JSON.parse(localStorage.getItem('auth'))?.user;

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    API.getAllBooks()
      .then(res => {
        setData(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/');
    window.location.reload();
  };

  const redirectToBooks = () => {
    if (location.pathname === '/') {
      navigate('/books');
    }
  };

  useEffect(() => {
    if (auth) {
      redirectToBooks();
    }
  }, []);

  const handleButtonClick = () => {
    setShowDiv(!showDiv);
  };

  const filteredData = data.filter(book => {
    const lowerCaseSearchTerms = searchTerm.toLowerCase().split(' ');

    return lowerCaseSearchTerms.every(term =>
      book.title.toLowerCase().includes(term) ||
      book.author.toLowerCase().includes(term) ||
      book.description.toLowerCase().includes(term)
    );
  });

  return (
    <>
      {user && (
        <div className='fixed top-0 left-0 right-0 z-50 flex flex-col items-center justify-center h-20 bg-cyan-950 shadow-2xl px-8'>
          <div className='flex w-full justify-between items-center'>

            <div className='flex flex-row'>
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-book-fill text-white mr-10" viewBox="0 0 16 16">
                <path d="M8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="38" fill="currentColor" className="bi bi-search text-gray-500 " viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
              <div className='flex flex-col w-1/4 relative'>
                <input
                  type="text"
                  placeholder="Search books, friends, and authors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-96 p-2 font-medium bg-inherit focus:outline-none focus:border-indigo-500 placeholder-gray-500"
                />
              </div>

              {searchTerm && (
                <div className="absolute top-full left-32 w-96 bg-white shadow-md mt-1 p-2 rounded-md">
                  {filteredData.map((book, index) => (
                    <div className="flex flex-row border-b-2" key={index}>
                      <img className="object-cover w-20 h-20" src={book.cover} alt="" />
                      <div className="flex flex-col ml-4">
                        <p className="text-gray-800 font-bold">Title: {book.title}</p>
                        <p className="text-gray-600">Author: {book.author}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className='flex items-center space-x-4'>
              <NavLink to="/dashboard/admin/my-group" className="text-white font-bold text-lg hover:bg-sky-200 hover:text-black transition duration-300">MyGroup</NavLink>

              <NavLink to="/books" className="text-white font-bold text-lg hover:bg-sky-200 hover:text-black transition duration-300">Home</NavLink>
              <NavLink to="/myBooks" className="text-white font-bold text-lg hover:bg-sky-200 hover:text-black transition duration-300">My Books</NavLink>
              <NavLink to="/explore" className="text-white font-bold text-lg hover:bg-sky-200 hover:text-black transition duration-300">Explore</NavLink>
            </div>
            <div>
              {user && (
                <button onClick={handleButtonClick}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-person-circle text-white" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                  </svg>
                </button>
              )}
              {showDiv && (
                <div className='flex flex-col absolute top-full right-0 w-48 bg-white shadow-md mt-1 p-2 rounded-md '>
                  {auth.name}
                  <button onClick={handleLogout} className="font-bold text-lg hover:underline">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
