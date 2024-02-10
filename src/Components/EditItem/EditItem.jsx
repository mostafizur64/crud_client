import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "../../Shared/Container";
import { useQueries, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const EditItem = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    job: "",
    age: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the item data based on the id from your backend server
    fetch(`https://crud-backend-production-2a19.up.railway.app/item/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData(data); // Set the form data with the fetched data
      })
      .catch((error) => console.error("Error:", error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://crud-backend-production-2a19.up.railway.app/item/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Item updated:", data);
        if (data.modifiedCount) {
          toast.success("Data updated successfully!");
        }
        navigate("/"); // Navigate to the home page or any other page
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      [e.target.email]: e.target.value,
      [e.target.age]: e.target.value,
      [e.target.job]: e.target.value,
    });
  };

  //   const handleSubmit = () => {};
  //   const { data: item = [] } = useQuery({
  //     queryKey: ["item"],
  //     queryFn: async () => {
  //       const res = await fetch(`https://crud-backend-production-2a19.up.railway.app/item/${id}`);
  //       return res.json();
  //     },
  //   });
  //   console.log(item.name);

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
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter Your Name"
                className="input input-bordered"
                value={formData.email}
                onChange={handleChange}
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
                placeholder="Enter Your Email"
                className="input input-bordered"
                value={formData.job}
                onChange={handleChange}
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
                placeholder="Enter Your Name"
                className="input input-bordered"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary text-xl">
                Edit Item
              </button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default EditItem;
