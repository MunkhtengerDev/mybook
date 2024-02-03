import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import * as API from "../../api/index";

const UpdateUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: ""
  });
  console.log('formData =================> ', formData);

  const navigate = useNavigate();
  const { id } = useParams();

  console.log("id =================> ", id);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await API.getUserById(id);

        setFormData(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch the user");
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === formData.name || formData.password) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.updateUser(id, formData);

      if (response) {
        toast.success("The user was successfully updated");
        navigate('/dashboard/worker/dashboardForWorkers');
      }

      console.log(response);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update the user");
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="font-bold text-2xl font-mono">Update User</h1>
      <div className="w-3/4">
        <form className="" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-1 w-full place-content-center">

            <div className="">
              <p>Name</p>
              <input
                name="name"
                required
                type="text"
                placeholder="name"
                className="form-control w-2/5 border-solid  border-2"
                value={formData.name}
                onChange={handleChange}
              />
            </div>


            <div className="">
              <p>Password</p>
              <input
                name="publisher"
                required
                type="text"
                placeholder="Password"
                className="form-control w-2/5 border-solid  border-2"
                value={formData.password}
                onChange={handleChange}
              />
            </div>


          </div>
          <button type="submit" className="mt-2 w-24 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-blue-300 dark:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
            UPDATE
          </button>
          <button onClick={() => navigate('/dashboard/worker/dashboardForWorkers')} className="mt-2 w-24 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-rose-100 text-rose-800 hover:bg-rose-200 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-red-300 dark:text-red-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
            CANCEL
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
