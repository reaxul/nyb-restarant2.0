/* eslint-disable no-unused-vars */
"use client"

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateMenuItemMutation } from "../redux/api/menuApi/menuApi";

const AddMenu = () => {
  const navigate = useNavigate();
  const [createMenuItem] = useCreateMenuItemMutation();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    type: "", // new field
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isFormComplete =
    form.name && form.description && form.price && form.category && form.type;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await createMenuItem({
        ...form,
        price: parseFloat(form.price),
      }).unwrap();

      navigate("/dashboard");
    } catch (err) {
      setError(err?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Add New Menu Item
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Item Name */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
            Item Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="e.g., Margherita Pizza"
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            placeholder="e.g., Fresh mozzarella, basil, and tomato sauce"
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
            Price (Taka)
          </label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            placeholder="e.g., 450"
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
            Category
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Drinks">Drinks</option>
            <option value="Desserts">Desserts</option>
          </select>
        </div>

        {/* Type: Vegetarian or Non-Vegetarian */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
            Type
          </label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select Type</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Non-Vegetarian">Non-Vegetarian</option>
            <option value="Contains Caffeine">Contains Caffeine</option>
            <option value="Caffeine Free">Caffeine Free</option>
          </select>
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !isFormComplete}
          className={`w-full px-6 py-3 rounded-lg transition-colors ${
            loading || !isFormComplete
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-primary text-white hover:bg-primary-dark"
          }`}
        >
          {loading ? "Submitting..." : "Add Item"}
        </button>
      </form>
    </div>
  );
};

export default AddMenu;
