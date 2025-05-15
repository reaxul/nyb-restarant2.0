/* eslint-disable no-unused-vars */
"use client"

import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

const AddMenu = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "", // optional image URL
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post("/menu", {
        ...form,
        price: parseFloat(form.price),
      });

      navigate("/dashboard"); // or to /dashboard/menu-list if you have a list page
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-surface p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-primary mb-4">
        Add New Menu Item
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-secondary font-semibold mb-1">
            Item Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-secondary font-semibold mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full p-2 border border-border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-secondary font-semibold mb-1">
            Price (Taka)
          </label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            className="w-full p-2 border border-border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-secondary font-semibold mb-1">
            Category
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full p-2 border border-border rounded-lg"
          >
            <option value="">Select Category</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Non-Vegetarian">Non-Vegetarian</option>
            <option value="Caffeine Free">Caffeine Free</option>
            <option value="Contains Caffeine">Contains Caffeine</option>
          </select>
        </div>

        <div>
          <label className="block text-secondary font-semibold mb-1">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            className="w-full p-2 border border-border rounded-lg"
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
        >
          {loading ? "Submitting..." : "Add Item"}
        </button>
      </form>
    </div>
  );
};

export default AddMenu;