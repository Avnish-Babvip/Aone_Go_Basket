import { useLocation, useNavigate } from "react-router-dom";

export default function OrderPlaced() {
  const location = useLocation();
  const navigate = useNavigate();

  const order = location.state?.order;
  const delivery = order?.estimated_delivery;

  if (!order) {
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

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-xl w-full">
        {/* SUCCESS HEADER */}
        <div className="text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="text-2xl font-black text-brand-green">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-500 mt-2">Thank you for shopping with us.</p>
        </div>

        {/* ORDER DETAILS */}
        <div className="mt-8 space-y-3 text-sm border-t pt-6">
          <div className="flex justify-between">
            <span className="text-gray-500">Order Number</span>
            <span className="font-semibold">{order.order_number}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Order Date</span>
            <span className="font-semibold">{order.order_date}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Total Amount</span>
            <span className="font-bold text-lg">
              ₹{parseFloat(order.grand_total).toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Payment Method</span>
            <span className="capitalize font-medium">
              {order.payment_mode === "cod"
                ? "Cash on Delivery"
                : "Online Payment"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Payment Status</span>
            <span
              className={`font-semibold capitalize ${
                order.payment_status === "paid"
                  ? "text-green-600"
                  : "text-orange-500"
              }`}
            >
              {order.payment_status}
            </span>
          </div>
        </div>

        {/* DELIVERY INFO */}
        {delivery && (
          <div className="mt-8 p-5 bg-emerald-50 rounded-2xl border border-emerald-100">
            <p className="font-semibold text-emerald-700 flex items-center gap-2">
              🚚 {delivery.courier_name}
            </p>

            <p className="text-gray-600 mt-2 text-sm">{delivery.note}</p>

            <p className="text-xs text-gray-500 mt-1">
              {delivery.min_days} - {delivery.max_days} days
            </p>
          </div>
        )}

        {/* ACTION BUTTON */}
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
