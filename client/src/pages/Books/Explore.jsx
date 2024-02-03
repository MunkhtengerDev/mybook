import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../../api/index';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Parallax, Pagination, Navigation } from 'swiper/modules';

function Explore() {
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

  return (
    <div className="mx-auto mt-20">
      <h2 className="text-2xl font-bold text-center">Trending Books</h2>

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
        className="flex items-center justify-center w-full h-[500px] md:w-1/2 relative"
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
        <div className="flex gap-10" data-swiper-parallax="-200">
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

      {/* Other genre sections */}
      <div className="mt-8 md:mt-12  items-center">
        {Object.keys(booksByGenre).map((genre, index) => (
          <div key={index} className="mt-8">
            <h2 className="text-2xl ml-10 font-bold">{`${genre} Books`}</h2>
            <Swiper
              modules={[Pagination, Navigation]}
              spaceBetween={10}
              slidesPerView={3}
              navigation
              pagination={{ clickable: true }}
              className='flex items-center justify-center w-full h-[340px] md:w-4/5 relative'
            >
              {Array.isArray(booksByGenre[genre]) &&
                booksByGenre[genre].map((book, index) => (
                  <SwiperSlide key={index}>
                    <Link to={`/dashboard/user/bookInfo/${book._id}`}>
                      <img
                        className="object-cover m-auto mt-10 h-64 md:96 rounded-md cursor-pointer"
                        src={book.cover}
                        alt=""
                      />
                    </Link>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Explore;
