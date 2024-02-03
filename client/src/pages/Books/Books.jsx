import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../../api/index';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Parallax, Pagination, Navigation } from 'swiper/modules';


function Books() {
  const [data, setData] = useState([]);
  const [userNames, setUserNames] = useState([]);
  const auth = JSON.parse(localStorage.getItem('auth'));
  const userId = auth.user._id;
  const [users, setUsers] = useState([]);
  const [booksByGenre, setBooksByGenre] = useState({});
  const [trendingBooks, setTrendingBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.getAllBooks();

        const booksByGenres = response.data.reduce((acc, book) => {
          if (!acc[book.genres]) {
            acc[book.genres] = [];
          }
          acc[book.genres].push(book);
          return acc;
        }, {});

        const sortedByRatings = response.data.sort(
          (a, b) =>
            b.ratings.reduce((sum, rating) => sum + rating.rating, 0) -
            a.ratings.reduce((sum, rating) => sum + rating.rating, 0)
        );
        setTrendingBooks(sortedByRatings.slice(0, 4));

        setBooksByGenre(booksByGenres);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);



  useEffect(() => {
    setUserNames(users.map(user => ({ id: user._id, name: user.name })));
  }, [users]);

  const getAllUsers = async () => {
    const data = await api.getAllUsersForBooks();
    setUsers(data.data.users);
  };

  useEffect(() => {
    getAllUsers();
  }, []);





  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getRatedOrReviewedBooks(userId);
        setData(response.data);


      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId, users]);


  const truncateDescription = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) : text;
  };

  const [showFullDescription, setShowFullDescription] = useState(false);

  return (
    <div className="flex items-center  flex-col gap-[1rem]  p-8">
      <div className='  w-4/5 mt-10  '>
        <p className='text-4xl text-center mb-3'>Trending Books</p>
        <Swiper
          speed={1600}
          parallax={true}
          pagination={{
            clickable: true,
          }}
          spaceBetween={1}
          slidesPerView={1}
          navigation={true}
          modules={[Parallax, Pagination, Navigation]}
          className="flex items-center justify-center h-[500px]  relative"
        >
          {/* Parallax Background */}
          <div
            slot="container-start"
            className="parallax-bg"
            style={{
              position: 'absolute',
              left: 0, top: 0,
              width: '300%',
              height: '100%',
              backgroundImage: 'url(https://images.unsplash.com/photo-1493243350443-9e3048ce7288?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2lkZSUyMHdhbGxwYXBlcnxlbnwwfHwwfHx8MA%3D%3D)',
              WebkitBackgroundSize: 'cover',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            data-swiper-parallax="-50%"
          >

          </div>

          {/* Trending Books */}
          <div className="flex gap-10" data-swiper-parallax="-30">
            {Array.isArray(trendingBooks) &&
              trendingBooks.map((book, index) => (
                <SwiperSlide key={index} className='flex items-center justify-center'>
                  <Link key={index} to={`/dashboard/user/bookInfo/${book._id}`} className=''>
                    <img
                      className="object-cover m-auto mt-10 h-96 rounded-md cursor-pointer"
                      src={book.cover}
                      alt=""
                    />
                  </Link>
                </SwiperSlide>
              ))}
          </div>
        </Swiper>
      </div>
      <div className="grid grid-cols-1 mt-8 w-full  md:w-3/5 p-4 rounded-lg">

        {Array.isArray(data) &&
          data?.map((book, index) => (
            <div className='ml-10 w-full ' key={index}>
              <div className="flex flex-col  ">
                {userNames.length > 0 &&

                  userNames.map((user, Index) => {
                    const userRating = book.ratings.find(rating => rating.userId === user.id);
                    const userReview = book.reviews.find(review => review.userId === user.id);

                    if (userRating) {
                      return (
                        <div key={Index} className="flex flex-col border-4 border-gray-300 rounded-lg break-words w-4/5 mb-10 items-center pt-5 pb-5">
                          <div className='flex flex-row justify-between w-4/5 '>
                            <span className="flex flex-row text-xl font-bold mb-2">{(userRating) && `@${user.name}`}</span>
                            {userRating && (
                              <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map((starValue) => (
                                  <span
                                    key={starValue}
                                    className={`text-xl ${userRating && starValue <= userRating.rating ? 'text-yellow-500' : 'text-gray-300'
                                      }`}
                                  >
                                    ★
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="flex item-center break-all w-11/12">
                            {userReview && <span>{userReview.review}</span>}
                          </div>
                          {userRating && (
                            <div className="flex flex-col md:flex-row items-center w-5/6 gap-4 mt-4 rounded-md" key={index}>

                              <div className="w-72 mb-2">
                                <Link to={`/dashboard/user/bookInfo/${book._id}`}>
                                  <img className="object-cover w-full h-full rounded-md" src={book.cover} alt="" />
                                </Link>
                              </div>

                              <div className="flex flex-col gap-2 ">
                                <p className="font-mono font-bold text-xl mb-2">{book.title}</p>
                                <p className="font-mono text-lg font-semifold">by {book.author}</p>
                                <p className="text-sm mb-4">
                                  {showFullDescription ? book.description : truncateDescription(book.description, 100)}

                                  {book.description.length > 100 && (
                                    <Link to={`/dashboard/user/bookInfo/${book._id}`} className="text-gray-500 cursor-pointer">
                                      {showFullDescription ? '' : '...Show More'}
                                    </Link>
                                  )}
                                </p>


                              </div>
                            </div>)}
                        </div>
                      );
                    }
                  })

                }
              </div>

            </div>
          ))}
      </div>

    </div>
  );
}

export default Books;
