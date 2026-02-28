import React from "react";
import { HiX } from "react-icons/hi";

export const ViewUnassignedOrderModal = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  const billing = data?.address_snapshot?.billing || {};
  const shipping = data?.address_snapshot?.shipping || {};
  const estimatedDelivery =
    data?.address_snapshot?.estimatedDelivery || {};

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-[#f9f7f7] w-[95%] sm:w-[800px] max-h-[90vh] rounded-xl shadow-xl flex flex-col relative">

        {/* CLOSE BUTTON */}
        <button
          type="button"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
          onClick={onClose}
        >
          <HiX size={26} />
        </button>

        {/* HEADER */}
        <div className="px-8 pt-8 pb-4 border-b">
          <h2 className="text-center text-xl text-gray-800 font-semibold">
            Unassigned Order Details
          </h2>
          <p className="text-center text-gray-500 mt-1">
            #{data?.order_number}
          </p>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">

          {/* CUSTOMER INFO */}
          <section>
            <h4 className="font-semibold text-gray-700 mb-3">
              Customer Info
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Info label="Name" value={data?.customer?.name} />
              <Info label="Mobile" value={data?.customer?.mobile} />
             
            </div>
          </section>

          {/* ADDRESS INFO */}
          <section>
            <h4 className="font-semibold text-gray-700 mb-3">
              Billing & Shipping
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Info
                label="Billing Address"
                value={`${billing.address_line_1 || ""}, ${billing.address_line_2 || ""}, ${billing.city?.name || ""}, ${billing.state?.name || ""}, ${billing.country?.name || ""}, ${billing.pincode || ""}`}
              />
              <Info
                label="Shipping Address"
                value={`${shipping.address_line_1 || ""}, ${shipping.address_line_2 || ""}, ${shipping.city?.name || ""}, ${shipping.state?.name || ""}, ${shipping.country?.name || ""}, ${shipping.pincode || ""}`}
              />
              <Info
                label="Estimated Delivery"
                value={estimatedDelivery?.note}
              />
            </div>
          </section>

          {/* ORDER ITEMS */}
            <section>
            <h4 className="font-semibold text-gray-700 mb-3">Order Items</h4>
            <div className="space-y-2">
              {data?.items?.map((item) => (
                <div key={item.id} className="border-b pb-2">
                  {/* ITEM NAME & QTY/PRICE */}
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium text-gray-600">{item?.product?.name}</p>
                      <p className="text-gray-700 text-sm">
                        Qty: {item?.quantity} | Price: ₹{item?.price}
                      </p>
                    </div>
                  </div>

                  {/* ITEM ATTRIBUTES */}
                  {item?.variation_snapshot?.attributes?.length > 0 && (
                    <div className="mt-1 text-sm text-gray-500 flex  gap-2">
                      {item?.variation_snapshot?.attributes?.map((attr) => (
                        <p key={attr?.attribute_id} className="capitalize">
                          {attr?.attribute_value}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* PAYMENT & TOTALS */}
          <section>
            <h4 className="font-semibold text-gray-700 mb-3">
              Payment & Totals
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <Info label="Payment Method" value={data?.payment_method} />
              <Info label="Payment Status" value={data?.payment_status} />
              <Info label="Order Status" value={data?.status} />
              <Info label="Subtotal" value={`₹${data?.subtotal}`} />
              <Info label="Discount" value={`₹${data?.discount}`} />
              <Info label="Tax" value={`₹${data?.tax}`} />
              <Info label="Total" value={`₹${data?.total}`} />
            </div>
          </section>

          {/* ORDER DATE */}
          <section>
            <Info
              label="Order Date"
              value={formatDate(data?.created_at)}
            />
          </section>
        </div>

        {/* FOOTER */}
        <div className="px-8 py-4 border-t">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-lg font-semibold bg-gray-800 text-white hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

/* ---------- HELPER ---------- */
const Info = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-sm text-gray-800 font-medium capitalize">
      {value || "—"}
    </p>
  </div>
);