import { useEffect, useState } from "react";
import { FiEye, FiEdit2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination";
import TableSkeleton from "../../components/TableSkeleton";
import { EditOrderStatusModal } from "../../components/Modal/Order/EditOrderStatus";
import { getAllAssignOrders } from "../../features/actions/order";
import { ViewAssignOrder } from "../../components/Modal/Order/ViewAssignOrder";

const AssignOrder = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { assignedOrderData, orderLoading } = useSelector(
    (state) => state.order,
  );
  const [selectedUser, setSelectedUser] = useState({});
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const page = Number(searchParams.get("page")) || 1;
  const searchQuery = searchParams.get("search") || "";
  const from_date = searchParams.get("from_date") || "";
  const to_date = searchParams.get("to_date") || "";

  const users = assignedOrderData?.data || [];
  const hasData = Array.isArray(users) && users.length > 0;
  const updateParams = ({ page, search, from_date, to_date }) => {
    const params = {};
    if (page) params.page = page;
    if (search) params.search = search;
    if (from_date) params.from_date = from_date;
    if (to_date) params.to_date = to_date;
    setSearchParams(params);
  };
  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit", // optional
      hour12: true, // true = 12hr (AM/PM), false = 24hr
    });
  };

  const getDeliveryStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "assigned":
        return "bg-blue-100 text-blue-700 ring-1 ring-blue-200";
      case "picked":
        return "bg-indigo-100 text-indigo-700 ring-1 ring-indigo-200";
      case "delivered":
        return "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200";
      case "cancelled":
        return "bg-red-100 text-red-600 ring-1 ring-red-200";
      case "failed":
        return "bg-red-100 text-red-600 ring-1 ring-red-200";
      default:
        return "bg-gray-100 text-gray-600 ring-1 ring-gray-200";
    }
  };

  useEffect(() => {
    if (!openEditModal) {
      dispatch(
        getAllAssignOrders({
          search: searchQuery,
          page,
          from_date,
          to_date,
        }),
      );
    }
  }, [openEditModal, page, searchQuery, from_date, to_date]);

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="font-semibold text-gray-800">All Assigned Orders</h2>

          <div className="flex items-end gap-4">
            {/* From Date */}
            <div className="flex flex-col">
              <label className="text-xs font-medium text-gray-500 mb-1">
                From Date
              </label>
              <input
                type="date"
                value={from_date}
                onChange={(e) =>
                  updateParams({
                    page: 1,
                    search: searchQuery,
                    from_date: e.target.value,
                    to_date,
                  })
                }
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* To Date */}
            <div className="flex flex-col">
              <label className="text-xs font-medium text-gray-500 mb-1">
                To Date
              </label>
              <input
                type="date"
                value={to_date}
                min={from_date}
                onChange={(e) =>
                  updateParams({
                    page: 1,
                    search: searchQuery,
                    from_date,
                    to_date: e.target.value,
                  })
                }
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="relative overflow-x-auto">
          <table className="min-w-[900px] w-full text-sm table-fixed">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="text-left  ps-5  px-3 py-3 w-[160px]">
                  Order Number
                </th>
                <th className="text-left px-3 py-3 w-[160px]">Rider Name</th>
                <th className="text-left px-3 py-3 w-[120px]">Assigned At</th>
                <th className="text-left px-3 py-3 w-[120px]">Delivered At</th>
                <th className="text-left px-3 py-3 w-[120px]">
                  Delivery Status
                </th>
                <th className="text-left px-3 py-3 w-[120px]">Price</th>
                <th className="text-center px-3 py-3 w-[50px]">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {orderLoading ? (
                /* ================= SKELETON ================= */
                <TableSkeleton
                  rows={5}
                  columns={[
                    { width: "w-24 h-4" }, // Name
                    { width: "w-24 h-4" }, // Username
                    { width: "w-24 h-4" }, // Email
                    { width: "w-24 h-4" }, // Mobile
                    { width: "w-24 h-4" }, // Status
                    { width: "w-24 h-4" }, // Status
                  ]}
                  actionColumn
                  actionCount={1}
                  actionWidth="w-12 h-8"
                />
              ) : !hasData ? (
                /* ================= EMPTY STATE ================= */
                <tr>
                  <td colSpan={6} className="py-28">
                    <div className="w-full flex flex-col items-center justify-center text-center">
                      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-100 mb-4">
                        <FiEye className="text-gray-400 text-xl" />
                      </div>

                      <p className="text-gray-600 font-medium">
                        No orders found
                      </p>

                      <p className="text-sm text-gray-400 mt-1">
                        Try adjusting filters
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                /* ================= DATA ROWS ================= */
                users.map((item) => (
                  <tr
                    key={item?.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="ps-5 px-3 py-5 text-gray-700">
                      {item?.order?.order_number || "—"}
                    </td>
                    <td className="px-3 py-5 text-gray-700">
                      {item?.rider?.name || "—"}
                    </td>
                    <td className="px-3 py-5 text-gray-700">
                      {formatDate(item?.assigned_at) || "—"}
                    </td>
                    <td className="px-3 py-5 text-gray-700">
                      {formatDate(item?.delivered_at) || "—"}
                    </td>
                    <td className="px-3 py-5 capitalize text-gray-700">
                      <span
                        className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm capitalize ${getDeliveryStatusStyle(
                          item?.delivery_status,
                        )}`}
                      >
                        <span className="w-2 h-2 rounded-full bg-current opacity-70"></span>
                        {item?.delivery_status}
                      </span>
                    </td>

                    <td className="px-3 py-5 text-gray-700 whitespace-nowrap">
                      ₹{item?.order?.total || "—"}
                    </td>

                    <td className="px-3 py-5">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => {
                            setOpenViewModal(true);
                            setSelectedUser(item);
                          }}
                          className="p-2 px-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                        >
                          <FiEye />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {!orderLoading && hasData && (
          <Pagination
            data={assignedOrderData}
            page={page}
            label="orders"
            onPageChange={updateParams}
            extraParams={{ search: searchQuery }}
          />
        )}
      </div>
      <EditOrderStatusModal
        isOpen={openEditModal}
        onClose={() => setOpenEditModal(false)}
        user={selectedUser}
      />
      <ViewAssignOrder
        isOpen={openViewModal}
        onClose={() => {
          setOpenViewModal(false);
        }}
        data={selectedUser}
      />
    </>
  );
};

export default AssignOrder;
