import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { orderHistory } from "../../features/actions/order";

export default function MyOrders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orderData, loading } = useSelector((state) => state.order);

  const myOrders = orderData.data || [];
  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
    dispatch(orderHistory());
  }, [dispatch]);

  const handleReorder = async (orderId) => {
    try {
      //   await dispatch(reorder(orderId)).unwrap();

      // Refresh cart after reorder
      //   await dispatch(getCartData());

      // Go to cart page
      navigate("/cart");
    } catch (error) {
      console.error("Reorder failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!myOrders?.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No orders found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-gray-50 px-4 py-10 mt-14  lg:mt-20 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-black mb-8">My Orders</h1>

        <div className="space-y-6">
          {myOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6"
            >
              {/* HEADER */}
              <div className="flex flex-wrap justify-between items-center gap-4 border-b border-gray-200 pb-4">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-semibold">{order.order_number}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Order Date</p>
                  <p className="font-medium">{formatDate(order.created_at)}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="font-bold text-lg">
                    ₹{parseFloat(order.total).toFixed(2)}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Payment</p>
                  <p
                    className={`font-semibold capitalize ${
                      order.payment_status === "paid"
                        ? "text-green-600"
                        : "text-orange-500"
                    }`}
                  >
                    {order.payment_status}
                  </p>
                </div>
              </div>

              {/* ITEMS PREVIEW */}
              <div className="mt-6 flex flex-wrap gap-4">
                {order.items?.map((item) => (
                  <img
                    key={item.id}
                    src={`${import.meta.env.VITE_REACT_APP_IMAGE_URL}/${item.image}`}
                    className="w-16 h-16 object-contain bg-gray-50 rounded-xl"
                  />
                ))}

                {order.items?.length > 3 && (
                  <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-xl text-xs font-semibold">
                    +{order.items.length - 3}
                  </div>
                )}
              </div>

              {/* ACTIONS */}
              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => navigate(`${order.id}`)}
                  className="px-5 py-2 rounded-xl border border-gray-300 text-sm font-medium hover:bg-gray-50"
                >
                  View Details
                </button>

                <button
                  onClick={() => handleReorder(order.id)}
                  className="px-5 py-2 rounded-xl bg-brand-green text-white text-sm font-semibold hover:bg-emerald-600 transition"
                >
                  Reorder
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
