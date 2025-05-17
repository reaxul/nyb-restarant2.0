"use client";

import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCreateOrderMutation } from "../../redux/api/ordersApi/ordersApi";
import { useAppSelector } from "../../hooks/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useGetMenuItemByIdQuery } from "../../redux/api/menuApi/menuApi";

// Load Stripe
const stripePromise = loadStripe(
  "pk_test_51RNB7fP5ZJfcVMb3iVEtb5nPxVcspwwM3SbPoYcaoKDsXcaU8uBDV8UXTGjmqz1khNxv6EfERU363AZv9gKKRVdP00PTRcUxzI"
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const params = useParams();
  const itemId = params.orderId;
  const navigate = useNavigate();
  const user = useAppSelector(useCurrentUser);
  const [createOrder] = useCreateOrderMutation();
  const {
    data,
    isLoading: itemLoading,
    error: itemError,
  } = useGetMenuItemByIdQuery(itemId);
  const item = data?.item;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zip.trim()) newErrors.zip = "ZIP code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !item) return;
    if (!validateForm()) return;

    setIsLoading(true);
    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setErrors({ card: "Card element not found" });
      setIsLoading(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setErrors({ card: error.message });
      setIsLoading(false);
      return;
    }

    try {
      const response = await createOrder({
        userId: user?._id,
        itemName: item.name,
        itemId: item._id,
        paymentMethodId: paymentMethod.id,
        amount: item.price,
        customerInfo: formData,
        status: "pending",
        itemImage: item.image,
        date: new Date().toISOString(),
      }).unwrap();

      toast.success("Payment successful! Thank you for your purchase.", {
        theme: "dark",
      });

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setErrors({ submission: "Payment processing failed. Please try again." });
      toast.error("Payment failed. Please try again.", {
        theme: "dark",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (itemLoading) return <div className="text-white p-6">Loading item...</div>;
  if (itemError || !item)
    return (
      <div className="text-red-400 p-6">
        Error loading item or item not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 py-12 text-gray-200">
      <ToastContainer />
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
          <div className="px-6 py-4 bg-gray-900 text-white border-b border-gray-700">
            <h2 className="text-xl font-semibold">Complete Your Purchase</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Info */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium mb-4 text-gray-200">
                  Customer Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["name", "email"].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-300 capitalize">
                        {field}
                      </label>
                      <input
                        type={field === "email" ? "email" : "text"}
                        name={field}
                        value={formData[field]}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full border ${
                          errors[field] ? "border-red-500" : "border-gray-600"
                        } rounded-md py-2 px-3 bg-gray-700 text-white placeholder-gray-400`}
                      />
                      {errors[field] && (
                        <p className="text-sm text-red-400">{errors[field]}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Address Info */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium mb-4 text-gray-200">
                  Shipping Address
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["address", "city", "state", "zip"].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-300 capitalize">
                        {field}
                      </label>
                      <input
                        type="text"
                        name={field}
                        value={formData[field]}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full border ${
                          errors[field] ? "border-red-500" : "border-gray-600"
                        } rounded-md py-2 px-3 bg-gray-700 text-white placeholder-gray-400`}
                      />
                      {errors[field] && (
                        <p className="text-sm text-red-400">{errors[field]}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Info */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium mb-4 text-gray-200">
                  Payment Information
                </h3>
                <div className="border border-gray-600 rounded-md p-4 bg-gray-700">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#FFFFFF",
                          "::placeholder": { color: "#9CA3AF" },
                          iconColor: "#FFFFFF",
                        },
                        invalid: { color: "#F87171" },
                      },
                    }}
                  />
                  {errors.card && (
                    <p className="mt-2 text-sm text-red-400">{errors.card}</p>
                  )}
                </div>
              </div>

              {/* Summary */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium mb-4 text-gray-200">
                  Order Summary
                </h3>
                <div className="bg-gray-700 p-4 rounded-md border border-gray-600">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Item Name</span>
                    <span className="font-medium text-white">{item?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Total</span>
                    <span className="font-medium text-white">
                      {item?.price} Taka
                    </span>
                  </div>
                </div>
              </div>

              {/* Submission Error */}
              {errors.submission && (
                <div className="md:col-span-2">
                  <p className="text-sm text-red-400 bg-red-900 bg-opacity-30 p-3 rounded border border-red-800">
                    {errors.submission}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <div className="md:col-span-2 mt-4">
                <button
                  type="submit"
                  disabled={isLoading || !stripe}
                  className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-3"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path d="M4 12a8 8 0 018-8v8H4z" fill="currentColor" />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Complete Purchase"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const StripeCheckoutPage = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default StripeCheckoutPage;
