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
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const selectedCountry = watch("country_id");
  const selectedState = watch("state_id");

  /* ================= PREFILL EDIT ================= */
  useEffect(() => {
    if (!isOpen) return;
    if (editData) {
      reset({
        name: editData.name || "",
        mobile: editData.mobile || "",
        address_line_1: editData.address_line_1 || "",
        address_line_2: editData.address_line_2 || "",
        landmark: editData.landmark || "",
        pincode: editData.pincode || "",
        country_id: editData.country_id || "",
        state_id: editData.state_id || "",
        city_id: editData.city_id || "",
      });
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
  }, [editData, isOpen, reset]);

  /* ================= COUNTRY -> STATE ================= */
  useEffect(() => {
    if (selectedCountry) {
      dispatch(getStates(selectedCountry));
      setValue("state_id", "");
      setValue("city_id", "");
    }
  }, [selectedCountry, dispatch, setValue]);

  /* ================= STATE -> CITY ================= */
  useEffect(() => {
    if (selectedState) {
      dispatch(getCities(selectedState));
      setValue("city_id", "");
    }
  }, [selectedState, dispatch, setValue]);

  if (!isOpen) return null;

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
                  {...register("country_id", {
                    required: "Country is required",
                  })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200"
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
                  {...register("state_id", {
                    required: "State is required",
                  })}
                  disabled={!selectedCountry}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200"
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
                  disabled={!selectedState}
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
  className = "",
}) {
  return (
    <div className={className}>
      <label className="text-sm font-semibold mb-2 block">{label}</label>
      <input
        {...register(name, {
          required: required ? `${label} is required` : false,
        })}
        className="w-full px-4 py-3 rounded-xl border border-gray-200"
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name].message}</p>
      )}
    </div>
  );
}
