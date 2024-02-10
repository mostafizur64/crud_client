import React from "react";
import Container from "../../Shared/Container";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddItem = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const job = form.job.value;
    const age = form.age.value;

    const data = { name, email, job, age };
    console.log(data);

    // fetch("https://crud-backend-production-2a19.up.railway.app/item", {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     if (data.insertedId) {
    //       toast.success("Data inserted successfully!");
    //     }
    //   });
    try {
      const response = await axios.post("https://crud-backend-production-2a19.up.railway.app/item", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response.data);

      if (response.data.insertedId) {
        toast.success("Data inserted successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container>
      <div>
        <div className="card shrink-0 w-full max-w-2xl mx-auto shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter Your Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Job</span>
              </label>
              <input
                type="text"
                name="job"
                placeholder="Enter Your Job Title"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Age</span>
              </label>
              <input
                type="number"
                name="age"
                placeholder="Enter Your Age"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary text-xl">
                Create Item
              </button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default AddItem;
