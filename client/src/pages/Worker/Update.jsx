import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import * as API from "../../api/index";
import FileBase from 'react-file-base64';

const Update = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
    cover: "",
    genres: "",
    language: "",
    released: "",
    page: "",
    publisher: "",
  });

  const genresOptions = ["nonfiction", "fiction", "drama", "poetry"];

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await API.getBookById(id);
        setFormData(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch the book");
      }
    };

    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "page" && Number(value) < 0) {
      setFormData({
        ...formData,
        [name]: 0,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.updateBook(id, formData);

      if (response) {
        toast.success("Your book was successfully updated");
        navigate('/dashboard/worker/booksForWorkers');
      }

      console.log(response);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update the book");
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="font-bold text-2xl font-mono">Update Book</h1>
      <div className="w-3/4">
        <form className="" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-1 w-full place-content-center">
            <div className="">
              <p>Title</p>
              <input
                name="title"
                required
                type="text"
                placeholder="Enter Title"
                className="form-control w-2/5 border-solid  border-2 "
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div className="">
              <p>Author</p>
              <input
                name="author"
                required
                type="text"
                placeholder="Author"
                className="form-control w-2/5 border-solid  border-2"
                value={formData.author}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <p>Description</p>
              <textarea
                name="description"
                required
                type="text"
                placeholder="Enter Description"
                className="form-control  w-3/5 border-solid  border-2"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="">
              <p>Language</p>
              <input
                name="language"
                required
                type="text"
                placeholder="Language"
                className="form-control w-2/5 border-solid  border-2"
                value={formData.language}
                onChange={handleChange}
              />
            </div>
            <div className="">
              <p>Released date</p>
              <input
                name="released"
                required
                type="date"
                placeholder=""
                className="form-control w-2/5 border-solid  border-2"
                value={formData.released}
                onChange={handleChange}
              />
            </div>
            <div className="">
              <p>Page</p>
              <input
                name="page"
                required
                type="number"
                placeholder="Page"
                className="form-control w-2/5 border-solid  border-2"
                value={formData.page}
                onChange={handleChange}
              />
            </div>
            <div className="">
              <p>Publisher</p>
              <input
                name="publisher"
                required
                type="text"
                placeholder="Publisher"
                className="form-control w-2/5 border-solid  border-2"
                value={formData.publisher}
                onChange={handleChange}
              />
            </div>
            <div className="">
              <p>Genre</p>
              <select
                name="genres"
                required
                className="form-control w-2/5 border-solid border-2"
                value={formData.genres}
                onChange={handleChange}
              >
                <option value="" disabled>Select a Genre</option>
                {genresOptions.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>
            <div className="">
              <p>Image</p>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) => setFormData({ ...formData, cover: base64 })}
              />
              <img className="w-40 h-56" src={formData.cover} alt="Cover" />
            </div>
          </div>
          <button type="submit" className="mt-2 w-24 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-blue-300 dark:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
            UPDATE
          </button>
          <button onClick={() => navigate('/dashboard/worker/booksForWorkers')} className="mt-2 w-24 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-rose-100 text-rose-800 hover:bg-rose-200 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-red-300 dark:text-red-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
            CANCEL
          </button>
        </form>
      </div>
    </div>
  );
}

export default Update;
