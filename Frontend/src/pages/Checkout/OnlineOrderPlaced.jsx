import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { paymentStatus } from "../../features/actions/order";
import { BsCheck2Circle } from "react-icons/bs";

export default function OnlineOrderPlaced() {
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get("order_number");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { paymentData, orderLoading } = useSelector((state) => state.order);

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

  /* ================= LOADING STATE ================= */

  if (orderLoading) {
    return <OnlineOrderSuccessSkeleton />;
  }

  /* ================= NO DATA ================= */

  if (!paymentData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-brand-green text-white rounded-xl"
        >
          Go Home
        </button>
      </div>
    );
  }

  /* ================= DATA READY ================= */

  const order = paymentData;
  const delivery = order?.estimated_delivery;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-xl w-full">
        <div className="text-center">
          <div className="text-5xl flex justify-center text-brand-green mb-4">
            <BsCheck2Circle />
          </div>
          <h1 className="text-2xl font-black text-brand-green">
            Your Order is Placed.
          </h1>
          <p className="text-gray-500 mt-2">Thank you for shopping with us.</p>
        </div>

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
            <span
              className={`font-semibold uppercase ${
                order.payment_status === "paid"
                  ? "text-green-600"
                  : "text-orange-500"
              }`}
            >
              {order.payment_status}
            </span>
          </div>
        </div>

        {delivery && (
          <div className="mt-8 p-5 bg-emerald-50 rounded-2xl border border-emerald-100">
            <p className="font-semibold text-emerald-700">
              🚚 {delivery.courier_name}
            </p>
            <p className="text-gray-600 mt-2 text-sm">{delivery.note}</p>
            <p className="text-xs text-gray-500 mt-1">
              {delivery.min_days} - {delivery.max_days} days
            </p>
          </div>
        )}

        <button
          onClick={() => navigate("/")}
          className="mt-8 w-full py-3 rounded-xl bg-brand-green text-white font-bold hover:bg-emerald-600 transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

function OnlineOrderSuccessSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-xl w-full animate-pulse">
        {/* HEADER */}
        <div className="text-center">
          <div className="h-12 w-12 bg-gray-200 rounded-full mx-auto mb-4"></div>
          <div className="h-6 w-40 bg-gray-300 rounded mx-auto"></div>
          <div className="h-4 w-64 bg-gray-200 rounded mx-auto mt-3"></div>
          <div className="h-4 w-48 bg-gray-200 rounded mx-auto mt-2"></div>
        </div>

        {/* ORDER INFO */}
        <div className="mt-8 space-y-4 border-t border-gray-200 pt-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex justify-between">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>

        {/* BUTTON */}
        <div className="mt-8">
          <div className="h-12 w-full bg-gray-300 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}
