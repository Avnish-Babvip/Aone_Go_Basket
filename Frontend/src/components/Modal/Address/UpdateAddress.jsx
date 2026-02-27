import React, { useEffect } from "react";
import { HiX } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getCities, getStates } from "../../../features/actions/location";

export default function UpdateAddressModal({
  isOpen,
  onClose,
  editData = null,
  onAddAddress,
  onUpdateAddress,
}) {
  const dispatch = useDispatch();
  const { countryData, stateData, cityData } = useSelector(
    (state) => state.location,
  );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();


useEffect(() => {
  if (!isOpen) return;

  const loadData = async () => {
    if (editData) {
      reset({
        name: editData.name || "",
        mobile: editData.mobile || "",
        address_line_1: editData.address_line_1 || "",
        address_line_2: editData.address_line_2 || "",
        landmark: editData.landmark || "",
        pincode: editData.pincode || "",
      });

      if (editData.country_id) {
        await dispatch(getStates(editData.country_id)).unwrap();
      }

      if (editData.state_id) {
        await dispatch(getCities(editData.state_id)).unwrap();
      }

      setValue("country_id", editData.country_id);
      setValue("state_id", editData.state_id);
      setValue("city_id", editData.city_id);
    } else {
      reset({
        name: "",
        mobile: "",
        address_line_1: "",
        address_line_2: "",
        landmark: "",
        pincode: "",
        country_id: "",
        state_id: "",
        city_id: "",
      });
    }
  };

  loadData();
}, [isOpen, editData, dispatch]);

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
          <h2 className="text-xl font-black mb-6 capitalize">
            {editData ? "Update" : "Add"} Address
          </h2>

          <form
            onSubmit={handleSubmit((data) => {
              const cleanPayload = {
                name: data.name,
                mobile: data.mobile,
                address_line_1: data.address_line_1,
                address_line_2: data.address_line_2,
                landmark: data.landmark,
                pincode: Number(data.pincode),
                country_id: Number(data.country_id),
                state_id: Number(data.state_id),
                city_id: Number(data.city_id),
              };

              if (editData?.id) {
                // ✅ UPDATE API
                onUpdateAddress({
                  id: editData.id,
                  payload: cleanPayload,
                });
              } else {
                // ✅ ADD API
                onAddAddress(cleanPayload);
              }

              reset();
              onClose();
            })}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <InputField
                label="Full Name"
                name="name"
                register={register}
                errors={errors}
                required
              />

              <InputField
  label="Mobile"
  name="mobile"
  register={register}
  errors={errors}
  required
  validation={{
    pattern: {
      value: /^[0-9]{10}$/,
      message: "Mobile number must be exactly 10 digits",
    },
  }}
/>

              <InputField
                label="Address Line 1"
                name="address_line_1"
                register={register}
                errors={errors}
                required
                className="md:col-span-2"
              />

              <InputField
                label="Address Line 2"
                name="address_line_2"
                register={register}
                errors={errors}
                required
                className="md:col-span-2"
              />

              <InputField
                label="Landmark"
                name="landmark"
                register={register}
                errors={errors}
                required={false}
                className="md:col-span-2"
              />

              {/* COUNTRY */}
              <div>
                <label className="text-sm font-semibold mb-2 block">
                  Country
                </label>
             <select
              className="w-full px-4 py-3 rounded-xl border border-gray-200"
  {...register("country_id", { required: "Country is required" })}
  onChange={(e) => {
    const value = e.target.value;
    setValue("country_id", value);
    setValue("state_id", "");
    setValue("city_id", "");
    dispatch(getStates(value));
  }}
>
                  <option value="">Select Country</option>
                  {countryData?.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                {errors.country_id && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.country_id.message}
                  </p>
                )}
              </div>

              {/* STATE */}
              <div>
                <label className="text-sm font-semibold mb-2 block">
                  State
                </label>
           <select
            className="w-full px-4 py-3 rounded-xl border border-gray-200"
  {...register("state_id", { required: "State is required" })}
  onChange={(e) => {
    const value = e.target.value;
    setValue("state_id", value);
    setValue("city_id", "");
    dispatch(getCities(value));
  }}
>
                  <option value="">Select State</option>
                  {stateData?.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
                {errors.state_id && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.state_id.message}
                  </p>
                )}
              </div>

              {/* CITY */}
              <div>
                <label className="text-sm font-semibold mb-2 block">City</label>
                <select
                  {...register("city_id", {
                    required: "City is required",
                  })}
                disabled={!stateData?.length}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200"
                >
                  <option value="">Select City</option>
                  {cityData?.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                {errors.city_id && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.city_id.message}
                  </p>
                )}
              </div>
              {/* PINCODE */}
        <InputField
  label="Pincode"
  name="pincode"
  register={register}
  errors={errors}
  required
  validation={{
    pattern: {
      value: /^[0-9]{6}$/,
      message: "Pincode must be exactly 6 digits",
    },
  }}
/>
            </div>

            <button
              type="submit"
              className="mt-8 w-full py-3 rounded-xl bg-brand-green text-white font-bold"
            >
              Save Address
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ================= REUSABLE INPUT ================= */
function InputField({
  label,
  name,
  register,
  errors,
  required,
  validation = {},
  className = "",
}) {
  return (
    <div className={className}>
      <label className="text-sm font-semibold mb-2 block">{label}</label>
      <input
  type="tel"
  maxLength={name === "mobile" ? 10 : name === "pincode" ? 6 : undefined}
  inputMode="numeric"
        {...register(name, {
          required: required ? `${label} is required` : false,
          ...validation,
        })}
        className="w-full px-4 py-3 rounded-xl border border-gray-200"
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name].message}</p>
      )}
    </div>
  );
}
