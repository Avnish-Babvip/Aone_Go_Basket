import { useLocation, useNavigate, useParams } from "react-router-dom";
import { orderDetails } from "../../features/actions/order";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function OrderDetails() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { orderDetailData, loading } = useSelector((state) => state.order);
  const order = orderDetailData;

  //   const formatDate = (dateString) => {
  //     if (!dateString) return "";

  //     const date = new Date(dateString);

  //     return date.toLocaleDateString("en-IN", {
  //       day: "2-digit",
  //       month: "short",
  //       year: "numeric",
  //     });
  //   };

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
        <div className="bg-white p-6 rounded-3xl shadow-sm border">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div>
              <h2 className="text-xl font-black">
                Order #{order.order_number}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Placed on {formatDate(order.created_at)}
              </p>
            </div>

            <div className="text-right">
              <p className="text-lg font-bold">₹{formatAmount(order.total)}</p>
              <span className="text-sm capitalize bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
                {order.status}
              </span>
            </div>
          </div>
        </div>

        {/* ADDRESSES */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* SHIPPING */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border">
            <h3 className="font-bold mb-3">Shipping Address</h3>
            <p className="font-semibold">
              {order.address_snapshot.shipping.name}
            </p>
            <p className="text-sm text-gray-600">
              {order.address_snapshot.shipping.address_line_1}
            </p>
            <p className="text-sm text-gray-600">
              {order.address_snapshot.shipping.address_line_2}
            </p>
            <p className="text-sm text-gray-600">
              {order.address_snapshot.shipping.city.name},{" "}
              {order.address_snapshot.shipping.state.name}
            </p>
            <p className="text-sm text-gray-600">
              {order.address_snapshot.shipping.country.name} -{" "}
              {order.address_snapshot.shipping.pincode}
            </p>
            <p className="text-sm mt-1">
              📞 {order.address_snapshot.shipping.mobile}
            </p>
          </div>

          {/* BILLING */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border">
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
        {order.address_snapshot.estimatedDelivery && (
          <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100">
            <p className="font-semibold text-emerald-700">
              🚚 {order.address_snapshot.estimatedDelivery.courier_name}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {order.address_snapshot.estimatedDelivery.note}
            </p>
          </div>
        )}

        {/* ITEMS */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border">
          <h3 className="font-bold mb-6">Order Items</h3>

          <div className="space-y-6">
            {order.items.map((item) => {
              const sale = item.variation_snapshot?.sale_price;
              const regular = item.variation_snapshot?.regular_price;

              const imageUrl = item.product?.primary_image?.image
                ? `${import.meta.env.VITE_REACT_APP_IMAGE_URL}/${item.product.primary_image.image}`
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
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* PRODUCT INFO */}
                  <div className="flex-1 flex justify-between">
                    <div>
                      <p className="font-semibold text-sm md:text-base">
                        {item.name}
                      </p>

                      {/* VARIATION ATTRIBUTES */}
                      {item.variation_snapshot?.attributes?.map(
                        (attr, index) => (
                          <p key={index} className="text-xs text-gray-500 mt-1">
                            {attr.attribute_name}: {attr.attribute_value}
                          </p>
                        ),
                      )}

                      <p className="text-xs text-gray-500 mt-2">
                        Qty: {item.quantity}
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
                          ₹{formatAmount(item.price)}
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
        <div className="bg-white p-6 rounded-3xl shadow-sm border">
          <h3 className="font-bold mb-4">Price Summary</h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{formatAmount(order.subtotal)}</span>
            </div>

            {order.price_snapshot.taxes.taxes_charges.map((tax, index) => (
              <div key={index} className="flex justify-between text-gray-600">
                <span>{tax.name}</span>
                <span>₹{formatAmount(tax.amount)}</span>
              </div>
            ))}

            <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-3 mt-3">
              <span>Grand Total</span>
              <span>₹{formatAmount(order.total)}</span>
            </div>
          </div>
        </div>

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
