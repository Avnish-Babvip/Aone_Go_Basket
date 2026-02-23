import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiCheckCircle } from "react-icons/fi";
import {
  addAddress,
  deleteAddress,
  getCustomerAddresses,
  setDefaultAddress,
  updateAddress,
} from "../../features/actions/customer";
import { getCountries } from "../../features/actions/location";
import UpdateAddressModal from "../../components/Modal/Address/UpdateAddress";
import { getCartData, updateCartCharges } from "../../features/actions/cart";
import { checkout } from "../../features/actions/order";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editAddressData, setEditAddressData] = useState(null);

  const { cartData } = useSelector((state) => state.cart);
  const { addressData } = useSelector((state) => state.customer);

  const items = cartData?.items || [];
  const chargeBreakup = cartData?.charge_breakup || [];
  const estimatedDelivery = cartData?.estimated_delivery;

  const formatAmount = (amount) => Number(parseFloat(amount).toFixed(2));

  const addresses = addressData || [];

  /* ================= ADDRESS STATES ================= */

  const [selectedShippingAddress, setSelectedShippingAddress] = useState(null);
  const [selectedBillingAddress, setSelectedBillingAddress] = useState(null);
  const [sameAsShipping, setSameAsShipping] = useState(true);

  /* ================= TOTAL CALC ================= */

  const handleDeleteAddress = (id) => {
    dispatch(deleteAddress(id)).then(() => {
      dispatch(getCustomerAddresses());
    });
  };
  const recalculateCart = async (shippingId, billingId) => {
    if (!shippingId || !billingId) return;

    try {
      dispatch(
        updateCartCharges({
          shipping_address_id: shippingId,
          billing_address_id: billingId,
        }),
      );

      // 🔥 After updating charges → fetch full cart again
      dispatch(getCartData());
    } catch (error) {
      console.error("Cart recalculation failed:", error);
    }
  };

  /* ================= PLACE ORDER ================= */

  const handlePlaceOrder = async () => {
    if (!selectedShippingAddress || !selectedBillingAddress) {
      alert("Please select address");
      return;
    }

    if (!paymentMethod) {
      alert("Please select payment method");
      return;
    }

    const payload = {
      shipping_address_id: selectedShippingAddress,
      billing_address_id: sameAsShipping
        ? selectedShippingAddress
        : selectedBillingAddress,
      payment_method: paymentMethod,
    };

    try {
      const response = await dispatch(checkout(payload)).unwrap();

      // ✅ Refresh cart (backend will return empty cart)
      await dispatch(getCartData());

      // ✅ Navigate to success page
      navigate("/checkout/order-placed", {
        state: {
          order: response?.data,
        },
      });
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  const [hasMounted, setHasMounted] = useState(false);
  /* ================= EFFECTS ================= */

  useEffect(() => {
    if (!hasMounted) {
      setHasMounted(true);
      return;
    }

    const billingId = sameAsShipping
      ? selectedShippingAddress
      : selectedBillingAddress;

    if (!selectedShippingAddress || !billingId) return;

    recalculateCart(selectedShippingAddress, billingId);
  }, [selectedShippingAddress, selectedBillingAddress, sameAsShipping]);

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getCustomerAddresses());
  }, [dispatch]);

  useEffect(() => {
    if (!addresses?.length) return;

    // 1️⃣ Try to find address marked as default
    const defaultAddr = addresses.find(
      (addr) => addr.is_default_shipping === true,
    );

    if (defaultAddr) {
      setSelectedShippingAddress(defaultAddr.id);
      setSelectedBillingAddress(defaultAddr.id);
    } else {
      // 2️⃣ If no default exists, auto-select first address
      setSelectedShippingAddress(addresses[0].id);
      setSelectedBillingAddress(addresses[0].id);
    }
  }, [addresses]);

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-12 mt-14 px-4 lg:px-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
          {/* ================= LEFT SIDE ================= */}
          <div className="lg:col-span-2 space-y-10">
            {/* ================= SHIPPING ADDRESS ================= */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-black">Shipping Address</h2>

                <button
                  className="text-brand-green font-semibold text-sm"
                  onClick={() => {
                    setEditAddressData(null);
                    setIsAddressModalOpen(true);
                  }}
                >
                  + Add New Address
                </button>
              </div>

              {addresses.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  No shipping address found.
                </p>
              ) : (
                <div className="space-y-4">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className={`border rounded-2xl p-4 transition ${
                        selectedShippingAddress === addr.id
                          ? "border-brand-green bg-emerald-50"
                          : "border-gray-200"
                      }`}
                    >
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="shippingAddress"
                          checked={selectedShippingAddress === addr.id}
                          onChange={() => {
                            setSelectedShippingAddress(addr.id);

                            if (sameAsShipping) {
                              setSelectedBillingAddress(addr.id);
                            }
                          }}
                          className="mt-1 accent-brand-green"
                        />

                        <div className="flex-1">
                          <p className="font-semibold">{addr.name}</p>

                          <p className="text-sm text-gray-600 mt-1">
                            {addr.address_line_1}, {addr.address_line_2}
                          </p>

                          <p className="text-sm text-gray-600">
                            {addr.city_name}, {addr.pincode}, {addr.state_name},{" "}
                            {addr.country_name}
                          </p>

                          <p className="text-sm text-gray-600">
                            📞 {addr.mobile}
                          </p>

                          {addr.is_default_shipping && (
                            <span className="inline-block mt-2 text-xs bg-brand-green text-white px-2 py-1 rounded-full">
                              Default Address
                            </span>
                          )}
                        </div>
                      </label>

                      <div className="flex gap-4 mt-4 text-sm">
                        <button
                          onClick={() => {
                            setEditAddressData(addr);
                            setIsAddressModalOpen(true);
                          }}
                          className="text-blue-600 font-medium"
                        >
                          Update
                        </button>

                        {!addr.is_default_shipping && (
                          <button
                            onClick={() =>
                              dispatch(
                                setDefaultAddress({ address_id: addr.id }),
                              ).then(() => dispatch(getCustomerAddresses()))
                            }
                            className="text-brand-green font-medium"
                          >
                            Set Default
                          </button>
                        )}

                        <button
                          onClick={() => handleDeleteAddress(addr.id)}
                          className="text-red-500 font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* SAME AS SHIPPING CHECKBOX */}
              <div className="mt-6 flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={sameAsShipping}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setSameAsShipping(checked);

                    if (checked) {
                      setSelectedBillingAddress(selectedShippingAddress);
                    }
                  }}
                  className="accent-brand-green"
                />
                <label className="text-sm font-medium text-gray-600">
                  Billing address same as shipping
                </label>
              </div>
            </div>

            {/* ================= BILLING ADDRESS ================= */}
            {!sameAsShipping && (
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-black">Billing Address</h2>
                </div>

                <div className="space-y-4">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className={`border rounded-2xl p-4 transition ${
                        selectedBillingAddress === addr.id
                          ? "border-brand-green bg-emerald-50"
                          : "border-gray-200"
                      }`}
                    >
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="billingAddress"
                          checked={selectedBillingAddress === addr.id}
                          onChange={() => setSelectedBillingAddress(addr.id)}
                          className="mt-1 accent-brand-green"
                        />

                        <div className="flex-1">
                          <p className="font-semibold">{addr.name}</p>

                          <p className="text-sm text-gray-600 mt-1">
                            {addr.address_line_1}, {addr.address_line_2}
                          </p>

                          <p className="text-sm text-gray-600">
                            {addr.city_name}, {addr.pincode}, {addr.state_name},{" "}
                            {addr.country_name}
                          </p>

                          <p className="text-sm text-gray-600">
                            📞 {addr.mobile}
                          </p>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ================= CART ITEMS ================= */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-black mb-6">Your Items</h2>

              {items.length === 0 ? (
                <p className="text-gray-500 text-sm">No items in cart.</p>
              ) : (
                <div className="space-y-5">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 border-b border-gray-200 pb-4 last:border-b-0"
                    >
                      {/* PRODUCT IMAGE */}
                      <div className="w-20 h-20 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden">
                        <img
                          src={
                            item?.product?.primary_image?.image
                              ? `${import.meta.env.VITE_REACT_APP_IMAGE_URL}/${item.product.primary_image.image}`
                              : "/placeholder.png"
                          }
                          alt={item?.product?.name}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* PRODUCT INFO */}
                      <div className="flex-1 text-sm">
                        <p className="font-semibold line-clamp-1">
                          {item?.product?.name}
                        </p>

                        {/* ATTRIBUTES */}
                        {item?.variation?.attributes?.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-1">
                            {item.variation.attributes.map((attr, index) => (
                              <span
                                key={index}
                                className="text-[11px] px-2 py-0.5 bg-gray-100 rounded-md text-gray-600"
                              >
                                {attr.attribute_name}:{" "}
                                {attr.attribute_value_name}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                          <span>Qty: {item.quantity}</span>
                          <span className="font-bold text-gray-800 text-sm">
                            ₹{formatAmount(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 h-fit sticky top-24">
            <h2 className="text-xl font-black mb-6">Order Summary</h2>

            {/* SUBTOTAL */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">
                  ₹{formatAmount(cartData?.subtotal)}
                </span>
              </div>

              {/* ================= CHARGE BREAKUP ================= */}
              {chargeBreakup.map((charge, index) => (
                <div key={index} className="flex justify-between text-gray-600">
                  <span>{charge.name}</span>
                  <span>₹{formatAmount(charge.amount)}</span>
                </div>
              ))}

              {/* TOTAL */}
              <div className="flex justify-between text-lg font-black pt-4 border-t">
                <span>Total</span>
                <span>₹{formatAmount(cartData?.total)}</span>
              </div>
            </div>

            {/* ================= ESTIMATED DELIVERY ================= */}
            {estimatedDelivery && (
              <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <p className="text-sm font-semibold text-emerald-700">
                  🚚 {estimatedDelivery.courier_name}
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  {estimatedDelivery.note}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  {estimatedDelivery.min_days} - {estimatedDelivery.max_days}{" "}
                  days
                </p>
              </div>
            )}

            {/* ================= PAYMENT METHOD ================= */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold mb-3">Payment Method</h3>

              <div className="space-y-3">
                {/* COD */}
                <label className="flex items-center gap-3 border border-gray-200 rounded-xl p-3 cursor-pointer hover:border-brand-green transition">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-brand-green "
                  />
                  <span className="text-sm font-medium">Cash on Delivery</span>
                </label>

                {/* ONLINE */}
                <label className="flex items-center gap-3 border border-gray-200 rounded-xl p-3 cursor-pointer hover:border-brand-green transition">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-brand-green"
                  />
                  <span className="text-sm font-medium">Pay Online</span>
                </label>
              </div>
            </div>

            {/* PLACE ORDER BUTTON */}
            <button
              disabled={!paymentMethod}
              onClick={() => handlePlaceOrder()}
              className={`mt-8 w-full py-4 rounded-2xl text-white font-bold text-lg transition flex items-center justify-center gap-2 shadow-lg ${
                paymentMethod
                  ? "bg-brand-green hover:bg-emerald-600"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              <FiCheckCircle />
              Place Order
            </button>
          </div>
        </div>
      </div>

      <UpdateAddressModal
        isOpen={isAddressModalOpen}
        onClose={() => {
          setIsAddressModalOpen(false);
          setEditAddressData(null);
        }}
        editData={editAddressData}
        onAddAddress={(data) =>
          dispatch(addAddress(data)).then(() =>
            dispatch(getCustomerAddresses()),
          )
        }
        onUpdateAddress={(data) =>
          dispatch(updateAddress(data)).then(() =>
            dispatch(getCustomerAddresses()),
          )
        }
      />
    </>
  );
}
