import { useNavigate, useParams } from "react-router-dom";
import { orderDetails } from "../../features/actions/order";
import { useDispatch, useSelector } from "react-redux";
import { TbTruckDelivery } from "react-icons/tb";
import { useEffect } from "react";

export default function OrderDetails() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { orderDetailData, loading } = useSelector((state) => state.order);
  const order = orderDetailData;

  const getPaymentStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 ring-1 ring-yellow-200";
      case "failed":
        return "bg-red-100 text-red-600 ring-1 ring-red-200";
      default:
        return "bg-gray-100 text-gray-600 ring-1 ring-gray-200";
    }
  };

  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
      case "completed":
        return "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200";
      case "placed":
        return "bg-yellow-100 text-yellow-700 ring-1 ring-yellow-200";
      case "failed":
      case "cancelled":
        return "bg-red-100 text-red-600 ring-1 ring-red-200";
      case "processing":
        return "bg-blue-100 text-blue-700 ring-1 ring-blue-200";
      default:
        return "bg-gray-100 text-gray-600 ring-1 ring-gray-200";
    }
  };

  const transaction =
    order?.payment_transactions?.length > 0
      ? order.payment_transactions[0]
      : null;

  const paymentLink = transaction?.request_payload?.payment_links?.web;

  const paymentExpiry = transaction?.request_payload?.payment_links?.expiry;

  useEffect(() => {
    dispatch(orderDetails(slug));
  }, []);

  const formatAmount = (amount) => Number(parseFloat(amount).toFixed(2));

  const formatDate = (date) =>
    new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="min-h-screen bg-gray-50 px-4  lg:py-32 py-28 lg:px-16">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div>
              <h2 className="text-xl font-black">
                Order #{order?.order_number}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Placed on {formatDate(order?.created_at)}
              </p>
            </div>

            <div className="text-right space-y-2">
              <p className="text-lg font-bold">₹{formatAmount(order?.total)}</p>

              {/* ORDER STATUS */}
              <span
                className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1?.5 rounded-full shadow-sm capitalize ${getStatusStyles(
                  order?.status,
                )}`}
              >
                <span className="w-2 h-2 rounded-full bg-current opacity-70"></span>
                {order?.status}
              </span>

              {/* PAYMENT METHOD */}
              <div className="text-xs text-gray-500 mt-2">
                <p className="font-medium">
                  Payment:{" "}
                  <span className="capitalize font-semibold text-gray-700">
                    {order?.payment_method === "cod"
                      ? "Cash on Delivery"
                      : "Online Payment"}
                  </span>
                </p>
              </div>

              {/* PAYMENT STATUS BADGE */}
              <span
                className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1?.5 rounded-full shadow-sm capitalize ${getPaymentStatusStyles(
                  order?.payment_status,
                )}`}
              >
                <span className="w-2 h-2 rounded-full bg-current opacity-70"></span>
                {order?.payment_status}
              </span>
            </div>
          </div>
        </div>

        {/* ADDRESSES */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* SHIPPING */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
            <h3 className="font-bold mb-3">Shipping Address</h3>
            <p className="font-semibold">
              {order?.address_snapshot?.shipping?.name}
            </p>
            <p className="text-sm text-gray-600">
              {order?.address_snapshot?.shipping?.address_line_1}
            </p>
            <p className="text-sm text-gray-600">
              {order?.address_snapshot?.shipping?.address_line_2}
            </p>
            <p className="text-sm text-gray-600">
              {order?.address_snapshot?.shipping?.city?.name},{" "}
              {order?.address_snapshot?.shipping?.state?.name}
            </p>
            <p className="text-sm text-gray-600">
              {order?.address_snapshot?.shipping?.country?.name} -{" "}
              {order?.address_snapshot?.shipping?.pincode}
            </p>
            <p className="text-sm mt-1">
              📞 {order?.address_snapshot?.shipping?.mobile}
            </p>
          </div>

          {/* BILLING */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
            <h3 className="font-bold mb-3">Billing Address</h3>
            <p className="font-semibold">
              {order?.address_snapshot?.billing?.name}
            </p>
            <p className="text-sm text-gray-600">
              {order?.address_snapshot?.billing?.address_line_1}
            </p>
            <p className="text-sm text-gray-600">
              {order?.address_snapshot?.billing?.address_line_2}
            </p>
            <p className="text-sm text-gray-600">
              {order?.address_snapshot?.billing?.city?.name},{" "}
              {order?.address_snapshot?.billing?.state?.name}
            </p>
            <p className="text-sm text-gray-600">
              {order?.address_snapshot?.billing?.country?.name} -{" "}
              {order?.address_snapshot?.billing?.pincode}
            </p>
            <p className="text-sm mt-1">
              📞 {order?.address_snapshot?.billing?.mobile}
            </p>
          </div>
        </div>

        {/* DELIVERY */}
        {order?.address_snapshot?.estimatedDelivery && (
          <div className="bg-lime-100 p-5 rounded-2xl border border-lime-100">
            <p className="font-semibold text-brand-green flex items-center gap-2">
              <TbTruckDelivery />{" "}
              {order?.address_snapshot?.estimatedDelivery?.courier_name}
            </p>
            <p className="text-sm text-gray-700 mt-1">
              {order?.address_snapshot?.estimatedDelivery?.note}
            </p>
          </div>
        )}

        {/* ITEMS */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
          <h3 className="font-bold mb-6">Order Items</h3>

          <div className="space-y-6">
            {order?.items?.map((item) => {
              const sale = item?.variation_snapshot?.sale_price;
              const regular = item?.variation_snapshot?.regular_price;

              const imageUrl = item?.product?.primary_image?.image
                ? `${import.meta.env.VITE_REACT_APP_IMAGE_URL}/${item?.product?.primary_image?.image}`
                : "/placeholder.png";

              return (
                <div
                  key={item.id}
                  className="flex gap-4 border-b border-gray-200 pb-5 last:border-b-0"
                >
                  {/* PRODUCT IMAGE */}
                  <div className="w-24 h-24 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={item?.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* PRODUCT INFO */}
                  <div className="flex-1 flex justify-between">
                    <div>
                      <p className="font-semibold text-sm md:text-base">
                        {item?.name}
                      </p>

                      {/* VARIATION ATTRIBUTES */}
                      {item?.variation_snapshot?.attributes?.map(
                        (attr, index) => (
                          <p key={index} className="text-xs text-gray-500 mt-1">
                            {attr?.attribute_name}: {attr?.attribute_value}
                          </p>
                        ),
                      )}

                      <p className="text-xs text-gray-500 mt-2">
                        Qty: {item?.quantity}
                      </p>
                    </div>

                    {/* PRICE */}
                    <div className="text-right">
                      {sale && sale !== regular ? (
                        <>
                          <p className="font-bold text-brand-green text-sm md:text-base">
                            ₹{formatAmount(sale)}
                          </p>
                          <p className="text-xs text-gray-400 line-through">
                            ₹{formatAmount(regular)}
                          </p>
                        </>
                      ) : (
                        <p className="font-bold text-sm md:text-base">
                          ₹{formatAmount(item?.price)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* PRICE SUMMARY */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
          <h3 className="font-bold mb-4">Price Summary</h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{formatAmount(order?.subtotal)}</span>
            </div>

            {order?.price_snapshot?.taxes?.taxes_charges?.map((tax, index) => (
              <div key={index} className="flex justify-between text-gray-600">
                <span>{tax?.name}</span>
                <span>₹{formatAmount(tax?.amount)}</span>
              </div>
            ))}

            <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-3 mt-3">
              <span>Grand Total</span>
              <span>₹{formatAmount(order?.total)}</span>
            </div>
          </div>
        </div>

        {transaction && (
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
            <h3 className="font-bold mb-4">Payment Details</h3>

            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Gateway</p>
                <p className="font-semibold capitalize">
                  {transaction.gateway}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Transaction Status</p>
                <span
                  className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full capitalize ${getPaymentStatusStyles(
                    transaction.status,
                  )}`}
                >
                  <span className="w-2 h-2 rounded-full bg-current opacity-70"></span>
                  {transaction.status}
                </span>
              </div>

              <div>
                <p className="text-gray-500">Amount</p>
                <p className="font-semibold">
                  ₹{formatAmount(transaction.amount)}
                </p>
              </div>

              {transaction.transaction_id && (
                <div>
                  <p className="text-gray-500">Transaction ID</p>
                  <p className="font-semibold break-all">
                    {transaction.transaction_id}
                  </p>
                </div>
              )}

              {paymentExpiry && (
                <div>
                  <p className="text-gray-500">Payment Link Expiry</p>
                  <p className="font-semibold">{formatDate(paymentExpiry)}</p>
                </div>
              )}
            </div>

            {/* RETRY BUTTON IF FAILED */}
            {transaction.status === "failed" && paymentLink && (
              <div className="mt-6">
                <a
                  href={paymentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition"
                >
                  Retry Payment
                </a>
              </div>
            )}
          </div>
        )}

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/account/order-history")}
          className="px-6 py-3 rounded-xl bg-brand-green text-white font-bold"
        >
          Back to Orders
        </button>
      </div>
    </div>
  );
}
