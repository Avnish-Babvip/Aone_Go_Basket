import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { checkPendingStatus } from "../../features/actions/order";
import { RxClock } from "react-icons/rx";
export default function OnlineOrderPending() {
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get("order_number");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!orderNumber) return;

    // Immediately check status once
    dispatch(checkPendingStatus(orderNumber));

    // Poll every 3 seconds
    const interval = setInterval(async () => {
      const data = await dispatch(checkPendingStatus(orderNumber)).unwrap();
      // assuming your action is a createAsyncThunk and returns {payment_status: 'paid'/'failed'}

      if (data?.payment_status === "paid") {
        navigate(`/payment/success?order_number=${orderNumber}`, {
          replace: true,
        });
        clearInterval(interval);
      }

      if (data?.payment_status === "failed") {
        navigate(`/payment/failed?order_number=${orderNumber}`, {
          replace: true,
        });
        clearInterval(interval);
      }
    }, 1000);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [orderNumber, dispatch, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-xl w-full">
        <div className="text-center">
          <div className="text-5xl mb-4 flex justify-center text-red-600">
            <RxClock />
          </div>
          <h1 className="text-2xl font-black text-red-600">Please Wait</h1>
          <p className="text-gray-500 mt-2">
            We are checking your payment status. This may take a few seconds.
          </p>
        </div>
      </div>
    </div>
  );
}
