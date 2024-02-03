import axios from "axios";

const api = axios.create({ baseURL: 'http://localhost:8080' });

api.interceptors.request.use((req) => {
    if (localStorage.getItem('auth')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('auth')).token}`
    };
    return req;
})

export const getAdmin = () => api.get(`/api/v1/auth/admin-auth`)
export const getUser = () => api.get(`/api/v1/auth/user-auth`)
export const getWorker = () => api.get(`/api/v1/auth/worker`)





export const login = ({ email, password }) => api.post('/api/v1/user/login', { email, password })
export const signup = ({ name, email, password }) => api.post('/api/v1/user/register', { name, email, password })

export const getAllUsersForBooks = () => api.get('/api/v1/user/all-users-books');

export const getAllUsers = () => api.get('/api/v1/user/all-users');
export const deleteUser = (id) => api.delete(`/api/v1/user/delete-user/${id}`);
export const getUserById=(id) => api.get(`/api/v1/user/get-user/${id}`)
export const updateUser = (id, formData) => api.patch(`/api/v1/user/update-user/${id}`, formData);




export const getAllBooks = () => api.get('/api/v1/book/get');
export const getBookById = (id) => api.get(`/api/v1/book/get/${id}`)
export const createBook = (formData) => api.post('/api/v1/book/create', formData);
export const updateBook = (id, formData) => api.patch(`/api/v1/book/update/${id}`, formData);
export const deleteBook = (id) => api.delete(`/api/v1/book/delete/${id}`);


export const saveComment = (id, { reviewUserId, userId, comment }) => api.post(`/api/v1/book/save-comment/${id}`, { reviewUserId, userId, comment })
export const getBookComments = (id) => api.get(`/api/v1/book/get-comments/${id}`);
export const saveReplyToDatabase = (id, commentId, { userId, reply }) => api.post(`/api/v1/book/save-reply/${id}/${commentId}`, { userId, reply });


export const saveBookRating = (id, { userId, rating }) => api.post(`/api/v1/book/save-rating/${id}`, { userId, rating });


export const saveBookReview = (id, { userId, review}) => api.post(`/api/v1/book/save-review/${id}`, { userId, review });
export const getBookReviews = (id) => api.get(`/api/v1/book/get-reviews/${id}`);



export const saveReviewComment = (reviewId, { userId, comment }) => api.post(`/api/v1/book/save-review-comment/${reviewId}`, { userId, comment });

export const getRatedOrReviewedBooks = (userId) => api.get(`/api/v1/book/get-rated-reviewed-books/${userId}`);

