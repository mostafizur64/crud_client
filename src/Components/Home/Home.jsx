import React, { useState } from "react";
import Container from "../../Shared/Container";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const { data: items = [], refetch } = useQuery({
    queryKey: ["item"],
    queryFn: async () => {
      const res = await fetch(
        "https://crud-backend-production-2a19.up.railway.app/item"
      );
      return res.json();
    },
  });
  console.log({ items });

  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (event, item) => {
    if (event.target.checked) {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, item]);
    } else {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter(
          (selectedItem) => selectedItem._id !== item._id
        )
      );
    }
  };

  const handleDelete = async (item) => {
    try {
      const response = await axios.delete(
        `https://crud-backend-production-2a19.up.railway.app/deleteItem/${item._id}`
      );
      if (response.data.deletedCount > 0) {
        toast.success("Item deleted successfully!");
        await refetch();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleAllDelete = async () => {
    try {
      await Promise.all(
        selectedItems.map(async (item) => {
          const response = await axios.delete(
            `https://crud-backend-production-2a19.up.railway.app/deleteItem/${item._id}`
          );
          if (response.data.deletedCount > 0) {
            return item._id;
          }
        })
      );
      toast.success("Selected items deleted successfully!");
      await refetch();
      setSelectedItems([]);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Container>
      <div className="bg-blue-900 p-8 rounded-md">
        <div className="flex items-center justify-between">
          <h3 className="text-white text-2xl ">Show Item</h3>
          <Link to="/addItem">
            <button className="btn text-xl btn-secondary">Create Item</button>
          </Link>
        </div>
        <div className="text-white">
          <div className="overflow-x-auto py-8">
            <table className="table text-white text-xl">
              <thead className="text-white text-2xl">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Job</th>
                  <th>Age</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.job}</td>
                    <td>{item.age}</td>
                    <td className="flex items-center justify-center">
                      <Link to={`/editItem/${item._id}`}>
                        <button className="btn btn-warning mr-2">Edit</button>
                      </Link>
                      <button
                        onClick={() => handleDelete(item)}
                        className="btn btn-secondary"
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedItems.some(
                          (selectedItem) => selectedItem._id === item._id
                        )}
                        onChange={(event) => handleCheckboxChange(event, item)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="7">
                    <button
                      className="btn btn-secondary"
                      onClick={handleAllDelete}
                      disabled={selectedItems.length === 0}
                    >
                      All delete
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Home;
