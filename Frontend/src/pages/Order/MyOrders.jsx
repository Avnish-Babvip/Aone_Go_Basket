import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { orderHistory } from "../../features/actions/order";
import { getCartData, reorderCart } from "../../features/actions/cart";
import Pagination from "../../components/Pagination";
import FilterSelect from "../../components/FilterSelect";

export default function MyOrders() {
  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orderData, orderLoading } = useSelector((state) => state.order);

  const myOrders = orderData.data || [];
  const hasData = Array.isArray(myOrders) && myOrders.length > 0;

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const status = searchParams.get("status") || "";

  const updateParams = ({ page, status }) => {
    const params = {};
    if (page) params.page = page;
    if (status) params.status = status;

    setSearchParams(params);
  };

  useEffect(() => {
    dispatch(
      orderHistory({
        page,
        status,
      }),
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth", // remove if you don't want animation
    });
  }, [page, status]);

  const handleReorder = async (orderId) => {
    try {
      await dispatch(reorderCart(orderId)).unwrap();

      // Refresh cart after reorder
      await dispatch(getCartData());
    } catch (error) {
      console.error("Reorder failed:", error);
    }
  };

  if (orderLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen  bg-gray-50 px-4 py-10 mt-14  lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-5 bg-white py-3 px-5 rounded-[2rem] border border-gray-100 shadow-sm gap-4">
            <h1 className="text-2xl font-black ">My Orders</h1>
            <FilterSelect
              label="Status"
              value={status || "All"}
              options={[
                { label: "Placed", value: "placed" },
                { label: "Confirmed", value: "confirmed" },
                { label: "Shipped", value: "shipped" },
                { label: "Delivered", value: "delivered" },
                { label: "Cancelled", value: "cancelled" },
                { label: "Failed", value: "failed" },
              ]}
              onChange={(val) =>
                updateParams({
                  status: val,
                  page: 1,
                })
              }
            />
          </div>

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
                    <p className="font-medium">
                      {formatDate(order.created_at)}
                    </p>
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
                    onClick={() => navigate(`${order.order_number}`)}
                    className="px-5 py-2 rounded-xl border border-gray-300 text-sm font-medium hover:bg-gray-50"
                  >
                    View Details
                  </button>

                  {order.status === "delivered" && (
                    <button
                      onClick={() => handleReorder(order.id)}
                      className="px-5 py-2 rounded-xl bg-brand-green text-white text-sm font-semibold hover:bg-emerald-600 transition"
                    >
                      Reorder
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* PAGINATION */}
          {!orderLoading && hasData && orderData && (
            <Pagination
              data={orderData}
              page={page}
              onPageChange={updateParams}
              extraParams={{ status }}
            />
          )}
        </div>
      </div>
    </>
  );
}
