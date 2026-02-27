import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { paymentStatus } from "../../features/actions/order";
import { RxCrossCircled } from "react-icons/rx";

export default function OnlineOrderFailed() {
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get("order_number");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { paymentData, isLoading } = useSelector((state) => state.order);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  /* ================= FETCH PAYMENT STATUS ================= */

  useEffect(() => {
    if (orderNumber) {
      dispatch(paymentStatus(orderNumber));
    }
  }, [orderNumber, dispatch]);

  /* ================= LOADING ================= */

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-red-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!paymentData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-red-500 text-white rounded-xl"
        >
          Go Home
        </button>
      </div>
    );
  }

  const order = paymentData;
  const delivery = order?.estimated_delivery;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-xl w-full">
        {/* ❌ FAILED HEADER */}
        <div className="text-center">
          <div className="text-5xl mb-4 flex justify-center text-red-600">
            <RxCrossCircled />
          </div>
          <h1 className="text-2xl font-black text-red-600">Payment Failed!</h1>
          <p className="text-gray-500 mt-2">
            Unfortunately your payment was not successful. <br />
            You can try again in your order history.
          </p>
        </div>

        {/* ORDER INFO */}
        <div className="mt-8 space-y-3 text-sm border-t border-gray-200 pt-6">
          <div className="flex justify-between">
            <span className="text-gray-500">Order Number</span>
            <span className="font-semibold">{order.order_number}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Order Date</span>
            <span className="font-semibold">
              {formatDate(order.created_at)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Total Amount</span>
            <span className="font-bold text-lg">
              ₹{parseFloat(order.total).toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Payment Method</span>
            <span className="capitalize font-medium">
              {order.payment_method === "cod"
                ? "Cash on Delivery"
                : "Online Payment"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Payment Status</span>
            <span className="font-semibold  text-red-600 uppercase">
              {order.payment_status}
            </span>
          </div>
        </div>

        {/* DELIVERY INFO */}
        {delivery && (
          <div className="mt-8 p-5 bg-gray-100 rounded-2xl border">
            <p className="font-semibold text-gray-700">
              🚚 {delivery.courier_name}
            </p>
            <p className="text-gray-600 mt-2 text-sm">{delivery.note}</p>
          </div>
        )}

        {/* ACTION BUTTONS */}
        <div className="mt-8 space-y-3">
          <button
            onClick={() => navigate("/")}
            className="w-full py-3 rounded-xl bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
