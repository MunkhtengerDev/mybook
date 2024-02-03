import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Books from './pages/Books/Books';
import Update from './pages/Worker/Update';
import Add from './pages/Worker/Add';
import Login from './pages/Login/Login';
import SignUp from './pages/Login/SignUp';
import { Toaster } from 'react-hot-toast';
import Navbar from './pages/Books/Navbar';
import Explore from './pages/Books/Explore';
import NavbarAdmin from './pages/Admin/NavBarAdmin';
import BookInfo from './pages/Books/BookInfo';
import UserRoute from './routes/userRoute';
import NavbarWorker from './pages/Worker/NavbarWorker';
import BooksForWorkers from './pages/Worker/BooksWorker';
import BooksInfoForWorkers from './pages/Worker/BooksInfoForWorkers';
import WorkerRoute from './routes/workerRoute';
import Dashboard from './pages/Worker/Dashboard';
import UpdateUser from './pages/Worker/UpdateUser';
function App() {

  return (
    <>


      <Toaster />
      <BrowserRouter>
        <Navbar />
        <NavbarAdmin />
        <NavbarWorker />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signUp' element={<SignUp />} />


          <Route path='/dashboard' element={<WorkerRoute />}>
            <Route path='worker/booksForWorkers' element={<BooksForWorkers />} />
            <Route path='worker/addBooksForWorkers' element={<Add />} />
            <Route path='worker/booksInfoForWorkers/:id' element={<BooksInfoForWorkers />} />
            <Route path='worker/update/:id' element={<Update />} />
            <Route path='worker/dashboardForWorkers' element={<Dashboard />} />
            <Route path='worker/updateUserForWorkers/:id' element={<UpdateUser />} />



          </Route>


          <Route path='/dashboard' element={<UserRoute />} >
            <Route path='user/books' element={<Books />} />
            <Route path='user/explore' element={<Explore />} />
            <Route path='user/bookInfo/:id' element={<BookInfo />} />
          </Route>


        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;