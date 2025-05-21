import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/features/cartSlice";
import { Minus, Plus, Trash2 } from "lucide-react";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleQuantityChange = (id, value) => {
    const quantity = Math.max(Number(value), 1); // Prevent 0 or negative
    dispatch(updateQuantity({ id, quantity }));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 text-white">
      <h1 className="text-3xl font-bold mb-8 text-center">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-400 text-center">
          Your cart is currently empty.
        </p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row justify-between items-center bg-[#262626] p-4 rounded-lg shadow-md gap-4"
            >
              <div className="flex items-center gap-4 w-full md:w-2/3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-400">
                    {item.price} Taka ×
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item._id, e.target.value)
                      }
                      className="ml-2 w-16 px-2 py-1 rounded bg-gray-800 text-white border border-gray-600"
                    />
                  </p>
                  <p className="text-sm text-gray-400">
                    {item.price} Taka ×
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item._id,
                              quantity: item.quantity - 1,
                            })
                          )
                        }
                        disabled={item.quantity <= 1}
                        className="bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-600 disabled:opacity-50"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="px-3 text-white font-medium">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item._id,
                              quantity: item.quantity + 1,
                            })
                          )
                        }
                        className="bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-600"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </p>
                </div>
              </div>

              <button
                onClick={() => dispatch(removeFromCart(item._id))}
                className="text-red-400 hover:text-red-600 transition duration-200"
                title="Remove Item"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}

          <div className="text-right mt-8">
            <h3 className="text-2xl font-bold mb-4">Total: {total} Taka</h3>
            <button
              onClick={() => alert("Proceed to order logic goes here")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow transition duration-200"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
