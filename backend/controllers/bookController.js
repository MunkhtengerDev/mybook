const bookModel = require("../models/bookModel");
const userModel = require("../models/userModel")

exports.getBookController = async (req, res) => {
    bookModel.find()
        .then(books => res.json(books))
        .catch(err => res.json(err))
}

exports.getBookIdController = async (req, res) => {
    const id = req.params.id
    bookModel.findById({ _id: id })
        .then(post => res.json(post))
        .catch(err => res.json(err))
}
exports.createBookController = async (req, res) => {
    console.log("================================================")
    bookModel.create(req.body)
        .then(books => res.json(books))
        .catch(err => res.json(err))
}




exports.updateBookController = async (req, res) => {
    const id = req.params.id
    bookModel.findByIdAndUpdate({ _id: id }, {
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        cover: req.body.cover,
        genres: req.body.genres,
        language: req.body.language,
        released: req.body.released,
        page: req.body.page,
        publisher: req.body.publisher
    }).then(books => res.json(books))
        .catch(err => res.json(err))
}


exports.deleteBookController = async (req, res) => {
    const id = req.params.id
    bookModel.findOneAndDelete({ _id: id })
        .then(response => res.json(response))
        .catch(err => res.json(err))
}


exports.getBookCommentsController = async (req, res) => {
    const id = req.params.id;

    try {
        const book = await bookModel.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const comments = book.comments;
        return res.json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.saveCommentController = async (req, res) => {
    const id = req.params.id;
    const { reviewUserId, userId, comment } = req.body;
    console.log("reviewUserId, userId, comment =============================>", reviewUserId, userId, comment);

    try {
        const book = await bookModel.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        book.comments.push({ reviewUserId, userId, comment });
        await book.save();

        return res.status(201).json({ message: 'Comment saved successfully' });
    } catch (error) {
        console.error('Error saving comment:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


exports.saveRatingController = async (req, res) => {
    const id = req.params.id;
    const { userId, rating } = req.body;
    console.log("userId, rating =============================>", userId, rating);

    try {
        const book = await bookModel.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Check if the user has already rated the book
        const existingRating = book.ratings.find(r => r.userId === userId);

        if (existingRating) {
            // If the user has already rated, you may choose to update the existing rating
            existingRating.rating = rating;
        } else {
            // If the user has not rated, add a new rating
            book.ratings.push({ userId, rating, });
        }

        await book.save();

        return res.status(201).json({ message: 'Rating saved successfully' });
    } catch (error) {
        console.error('Error saving rating:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};





exports.saveReplyController = async (req, res) => {
    const { id, commentId } = req.params;
    const { userId, reply } = req.body;

    try {
        const book = await bookModel.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const comment = book.comments.find((c) => c._id.toString() === commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        comment.replies.push({ userId, reply });
        await book.save();

        return res.status(201).json({ message: 'Reply saved successfully' });
    } catch (error) {
        console.error('Error saving reply:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};



exports.saveReviewController = async (req, res) => {
    try {
        const { userId, review, rating } = req.body;
        const id = req.params.id;

        const book = await bookModel.findById(id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }


        const existingReview = book.reviews.find(r => r.userId === userId);

        if (existingReview) {
            existingReview.review = review;
        } else {
            book.reviews.push({ userId, review, rating });
        }

        await book.save();

        return res.status(201).json({ message: 'Review saved successfully' });
    } catch (error) {
        console.error('Error saving book review:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};




exports.getBookReviewsController = async (req, res) => {
    try {
        const id = req.params.id;
        const book = await bookModel.findById(id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(200).json({ reviews: book.reviews });
    } catch (error) {
        console.error('Error getting book reviews:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};




exports.getRatedReviewedBooksController = async (req, res) => {
    try {
        const userId = req.params.userId;

        const ratedReviewedBooks = await bookModel.find({
            $or: [
                { "ratings.userId": userId },
                { "reviews.userId": userId }
            ]
        });

        res.status(200).json(ratedReviewedBooks);
    } catch (error) {
        console.error('Error fetching rated or reviewed books:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.saveReviewCommentController = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { userId, comment } = req.body;

        const book = await bookModel.findById(reviewId);

        if (!book) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Assuming your review object has a property 'comments' to store comments
        book.comments.push({ userId, comment });
        await book.save();

        return res.status(201).json({ message: 'Review comment saved successfully' });
    } catch (error) {
        console.error('Error saving review comment:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};




  

