import React, { useEffect } from "react";
import { HiX } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrder } from "../../../features/actions/order";
import { Spinner } from "../../Loader/Spinner";

export default function CancelOrderModal({ isOpen, onClose, id }) {
  const dispatch = useDispatch();
  const { cancelLoading } = useSelector((state) => state.order);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (!isOpen) return;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 pb-10">
      <div className="bg-white w-[95%] sm:w-[650px] max-h-[90vh] rounded-2xl shadow-xl relative overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400"
        >
          <HiX size={24} />
        </button>

        <div className="p-8">
          <h2 className="text-xl font-black mb-6 capitalize">Cancel Order</h2>

          <form
            onSubmit={handleSubmit((data) => {
              dispatch(cancelOrder({ id, payload: data }))
                .unwrap()
                .then(() => {
                  onClose();
                });
            })}
          >
            <div className="grid gap-6">
              <div className="">
                <label className="text-sm font-semibold mb-2 block">
                  Reason
                </label>
                <textarea
                  {...register("reason", {
                    required: `Reason is required`,
                  })}
                  className="w-full px-4 py-3 rounded-xl border outline-none border-gray-200"
                />
                {errors.reason && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.reason.message}
                  </p>
                )}
              </div>
              <div className="">
                <label className="text-sm font-semibold mb-2 block">Note</label>
                <textarea
                  {...register("note", {
                    required: `Reason is required`,
                  })}
                  className="w-full px-4 py-3 rounded-xl border outline-none border-gray-200"
                />
                {errors.note && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.note.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="mt-8 w-full py-3 rounded-xl bg-red-500 text-white font-bold"
            >
              {cancelLoading ? <Spinner /> : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
