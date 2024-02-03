import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as API from '../../api/index';

function BooksInfo() {
  const [book, setBook] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [userRating, setUserRating] = useState(null);
  const [userNames, setUserNames] = useState([]);
  const [userReview, setUserReview] = useState('');
  const { id } = useParams();
  const auth = JSON.parse(localStorage.getItem('auth'));
  const userId = auth.user._id;
  const [users, setUsers] = useState([]);
  const [hoveredRating, setHoveredRating] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);





  const handleComment = async (reviewUserId) => {
    await API.saveComment(id, { reviewUserId, userId, comment });

    setComment('')
  }

  useEffect(() => {
    API.getBookById(id)
      .then(res => {

        setBook(res.data);

        // Fetch user names based on their IDs in book's ratings
        const userIds = res.data.ratings.map(rating => rating.userId);
        fetchUserNames(userIds);

        fetchBookReviews(id);
        fetchReviewComments(id)

      })
      .catch(err => console.log('Error fetching book:', err));
  }, [id]);





  const fetchReviewComments = async (id) => {
    try {
      const comments = await API.getBookComments(id);
      setComments(comments.data);
    }
    catch (error) {
      console.error('Error fetching book review comments:', error);
    }
  }


  const fetchBookReviews = async (id) => {
    try {
      const response = await API.getBookReviews(id);
      const reviews = response.data.reviews;
      setBook(prevBook => ({ ...prevBook, reviews }));
    } catch (error) {
      console.error('Error fetching book reviews:', error);
    }
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleRatingChange = async (rating) => {
    try {
      setUserRating(rating);

      // Log the data being sent to the API
      // console.log('Sending rating to API:', { userId, rating });

      // Make API call to save the rating
      await API.saveBookRating(id, { userId, rating });

      // Log success message
      // window.location.reload();
      // console.log('Rating saved successfully!');
    } catch (error) {
      console.error('Error saving rating:', error);
    }
  };

  const handleReviewSubmit = async () => {
    try {


      // Make API call to save the review
      await API.saveBookReview(id, { userId, review: userReview });

      // Log the data being sent to the API
      console.log('Sending review to API:', { userId, review: userReview });


      // Log success message
      window.location.reload();
      console.log('Review saved successfully!');
      setUserReview("")
    } catch (error) {
      console.error('Error saving review:', error);
    }
  };

  const calculateAverageRating = () => {
    if (!book || !book.ratings || book.ratings.length === 0) {
      return 0;
    }

    const totalRating = book.ratings.reduce((sum, rating) => sum + rating.rating, 0);
    const averageRating = totalRating / book.ratings.length;
    return averageRating;
  };

  const renderStarRating = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-xl text-yellow-500 mr-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
      </svg></span>);
    }

    if (halfStar) {
      stars.push(<span key="half" className="text-xl text-yellow-500 mr-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-half" viewBox="0 0 16 16">
        <path d="M5.354 5.119 7.538.792A.52.52 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.54.54 0 0 1 16 6.32a.55.55 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.5.5 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.6.6 0 0 1 .085-.302.51.51 0 0 1 .37-.245zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.56.56 0 0 1 .162-.505l2.907-2.77-4.052-.576a.53.53 0 0 1-.393-.288L8.001 2.223 8 2.226z" />
      </svg></span>);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-xl text-gray-300 mr-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
      </svg></span>);
    }

    return stars;
  };

  const fetchUserNames = async (userIds) => {
    try {
      const response = await API.getAllUsersForBooks();
      const users = response.data.users;
      setUsers(users);
      const names = userIds.map(userId => {
        const user = users.find(user => user._id === userId);
        return user ? user.name : 'Unknown User';
      });

      setUserNames(names);
    } catch (error) {
      console.error('Error fetching user names:', error);
    }
  };

  return (
    <div className="flex flex-row justify-center  mt-20">
      <div className="p-10">
        {book && (
          <div className='flex flex-col gap-5 md:gap-[20rem] md:flex-row '>
            <div className="flex flex-col gap-4  items-center justify-center object-cover">
              <img className="block object-cover md:left-[14rem] top-[8rem] w-2/3 md:w-1/5  md:fixed  rounded-md " src={book.cover} alt="" />

            </div>
            <div className="flex  flex-col gap-4 md:w-[50rem]">
              <p className="font-mono font-bold text-4xl">{book.title}</p>
              <p className="font-serif text text-3xl font-thin ">by {book.author}</p>
              <p className="flex flex-row text-gray-700  ">{renderStarRating(calculateAverageRating())} {calculateAverageRating().toFixed(1)}/5  ({book.ratings.length <= 1 ? `${book.ratings.length} review` : `${book.ratings.length} reviews`})</p>

              <p className="text-gray-700 text-2xl">
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
              <p className="text-gray-700 text-lg"> Genre: {book.genres}</p>
              <p className="text-gray-700 text-lg">Language: {book.language}</p>
              <p className="text-gray-700 text-lg">Released Date: {book.released}</p>
              <p className="text-gray-700 text-lg">Pages: {book.page}</p>
              <p className="text-gray-700 text-lg">Publisher: {book.publisher}</p>

              {/* Rating system */}
              <div className="flex justify-center items-center mt-2 border-y-2 gap-10 ">
                <div className='flex flex-col items-center gap-2'>
                  <p className="text-gray-700 text-xl font-bold">Rate this book</p>
                  <div className='flex flex-row'>
                    {[1, 2, 3, 4, 5].map((ratingValue) => (
                      <button
                        key={ratingValue}
                        onMouseOver={() => setHoveredRating(ratingValue)}
                        onMouseLeave={() => setHoveredRating(null)}
                        onClick={() => {
                          handleRatingChange(ratingValue);
                        }}
                        className={`text-2xl cursor-pointer mr-1 ${(hoveredRating !== null ? (ratingValue <= hoveredRating ? 'text-yellow-500' : 'text-gray-300') : null) ||
                          (userRating !== null ? (ratingValue <= userRating ? 'text-yellow-500' : 'text-gray-300') : 'text-gray-300')

                          // ((ratingValue <= hoveredRating) || (ratingValue <= userRating)) ? 'text-yellow-500'
                          // : 'text-gray-300'
                          }`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                      </button>

                    ))}
                  </div>
                </div>
                <div className='flex flex-col items-center gap-2'>
                  <p className="text-gray-700 mr-2 text-xl font-bold text-center">Write a review <br />(Resubmit to update your review)</p>
                  <textarea
                    placeholder="Write your review here..."
                    value={userReview}
                    onChange={(e) => setUserReview(e.target.value)}
                    className='h-8 w-64'
                  ></textarea>
                  <button
                    disabled={userReview === ''}
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-2"
                    onClick={(e) => {
                      // Use Array.includes to check if userRating is one of [1, 2, 3, 4, 5]
                      if (![1, 2, 3, 4, 5].includes(userRating)) {
                        handleReviewSubmit();
                        handleRatingChange(0); // Set rating to 0 if it's not in [1, 2, 3, 4, 5]
                      } else {
                        handleReviewSubmit();
                      }
                    }}
                  >
                    Submit Review
                  </button>

                </div>
              </div>



              {users.length > 0 && (
                <div className="flex flex-col">
                  <p className="text-gray-700 mb-2 text-2xl font-semibold">Reviews:</p>
                  {users.map((user, index) => {
                    const userRating = book.ratings.find(rating => rating.userId === user._id);
                    const userReview = book.reviews.find(review => review.userId === user._id);

                    return (
                      <div key={index} className="flex flex-col items-start mb-4">
                        <span className="flex flex-row text-lg  mr-1 ">{(userRating || userReview) && `@${user.name}`}</span>

                        {/* Display user's rating */}
                        {userRating && (
                          <div className="flex items-center">
                            {renderStarRating(userRating.rating)}
                          </div>
                        )}

                        {/* Display user's review if available */}
                        {userReview && <span>{userReview.review}</span>}
                        {comments.map((comment, index) => (
                          comment.reviewUserId === user._id && (
                            <div key={index}>
                              <div>
                                <div className='flex flex-row'>
                                  <strong>@</strong><strong>{users.map((user) =>
                                    user._id === comment.userId ? user.name : null
                                  )}</strong>:<p>{comment.comment}</p>
                                </div>
                              </div>
                            </div>
                          )
                        ))}

                        {/* Comment section */}
                        {userRating && (
                          <div className="p-4">
                            {/* <h2 className='mb-3'>Write a comment</h2> */}
                            <div className='border-2 rounded'>
                              <textarea
                                className='w-80'
                                name="comment"
                                id="comment"
                                cols="30"
                                rows="5"
                                value={userId.comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder='Write your comment here...'
                              >
                              </textarea>
                            </div>
                            <br />

                            <button
                              className='bg-sky-200 p-3 rounded-lg'
                              type='button'
                              disabled={!comment.length}
                              onClick={() => handleComment(user._id)}
                            >
                              Add Comment
                            </button>


                          </div>)}
                      </div>
                    );
                  })}
                </div>
              )}



            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BooksInfo;
