import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  addBusinessInfo,
  deleteAddress,
  getBusinessInfo,
  getCustomerAddresses,
  getCustomerDetails,
  getCustomerKycStatus,
  setDefaultAddress,
  submitKyc,
  updateAddress,
  updateBusinessInfo,
  updateProfile,
} from "../features/actions/customer";
import { useForm } from "react-hook-form";
import { Spinner } from "../components/Loader/Spinner";
import {
  getCities,
  getCountries,
  getStates,
} from "../features/actions/location";
import UpdateAddressModal from "../components/Modal/Address/UpdateAddress";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { profileData, kycData } = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(getCustomerDetails());
    dispatch(getCustomerKycStatus());
  }, [dispatch]);

  return (
    <>
    <div className="min-h-screen bg-gray-50 pt-28 pb-20 px-4 lg:px-16 space-y-10">
      {/* ================= PROFILE FORM ================= */}
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-sm  p-8 md:p-12">
        <ProfileForm profileData={profileData} />
      </div>

      {/* ================= BUSINESS INFO ================= */}
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-sm p-8 md:p-12">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Business Information
        </h2>

        <BusinessInfoForm />
      </div>
      {/* ================= ADDRESS INFO ================= */}



        <AddressInfo />


      {/* ================= KYC FORM ================= */}
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-sm p-8 md:p-12">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          KYC Information
        </h2>

        {kycData ? <KycStatusCard kyc={kycData} /> : <KycUploadSection />}
      </div>
    </div>

    </>
  );
}

function ProfileForm({ profileData }) {
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();
  const { customerLoading } = useSelector((state) => state.customer);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: profileData?.name || "",
      username: profileData?.username || "",
      email: profileData?.email || "",
      mobile: profileData?.mobile || "",
    },
  });

  const { ref, onChange: rhfOnChange, ...rest } = register("profile_image");

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("username", data.username);
    formData.append("mobile", data.mobile);

    if (data.profile_image?.[0]) {
      formData.append("profile_image", data.profile_image[0]);
    }

    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (profileData) {
      reset({
        name: profileData?.name || "",
        username: profileData?.username || "",
        email: profileData?.email || "",
        mobile: profileData?.mobile || "",
        profile_image: null, // 🔥 VERY IMPORTANT
      });
    }
  }, [profileData, reset]);

  return (
    <>
      <h2 className="text-xl font-bold text-gray-800 mb-8">
        Personal Information
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* ================= PROFILE IMAGE ================= */}
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border border-gray-300">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : profileData?.profile_image ? (
              <img
                src={profileData.profile_image}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                No Image
              </div>
            )}
          </div>

          <div>
            <label className="cursor-pointer inline-block px-4 py-2 bg-lime-100 text-brand-green text-sm font-medium rounded-lg hover:bg-lime-200 transition">
              Change Photo
              <input
                type="file"
                accept="image/*"
                ref={ref}
                {...rest}
                onChange={(e) => {
                  rhfOnChange(e); // ✅ IMPORTANT — let RHF handle it first

                  const file = e.target.files?.[0];
                  if (file) {
                    setPreview(URL.createObjectURL(file));
                  }
                }}
                className="hidden"
              />
            </label>
            {/* <p className="text-xs text-gray-500 mt-2">
              At least 800 x 800 px recommended. JPG or PNG allowed.
            </p> */}
          </div>
        </div>

        {/* ================= FORM FIELDS ================= */}
        <div className="grid md:grid-cols-2 gap-6">
          <FormInput label="Email" register={register("email")} disabled />

          <FormInput
            label="Full Name"
            register={register("name", { required: "Name is required" })}
            error={errors.name}
          />

          <FormInput
            label="Username"
            register={register("username", {
              required: "Username is required",
            })}
            error={errors.username}
          />

          <FormInput
            label="Mobile"
            register={register("mobile", {
              required: "Mobile number required",
              minLength: {
                value: 10,
                message: "Invalid mobile number",
              },
            })}
            error={errors.mobile}
          />
        </div>

        {/* ================= ACTION BUTTONS ================= */}
        <div className="flex justify-end items-center">
          <button
            type="submit"
            disabled={customerLoading}
            className="px-8 py-3 bg-brand-green text-white font-semibold rounded-xl w-44 hover:bg-emerald-600 transition shadow-md"
          >
            {customerLoading ? <Spinner /> : "Update Profile"}
          </button>
        </div>
      </form>
    </>
  );
}

function KycUploadSection() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { kycLoading } = useSelector((state) => state.customer);

  const dispatch = useDispatch();
  const selectedType = watch("document_type");

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("document_type", data.document_type);
    formData.append("document_number", data.document_number);
    formData.append("document_front", data.document_front[0]);

    if (data.document_type === "aadhaar") {
      formData.append("document_back", data.document_back[0]);
    }

    dispatch(submitKyc(formData));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* ================= DOCUMENT TYPE ================= */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Document Type <span className="text-red-500">*</span>
        </label>

        <select
          {...register("document_type", {
            required: "Select document type",
          })}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green"
        >
          <option value="">Choose Document</option>
          <option value="aadhaar">Aadhaar</option>
          <option value="pan">PAN</option>
          <option value="passport">Passport</option>
        </select>

        {errors.document_type && (
          <p className="text-red-500 text-xs mt-1">
            {errors.document_type.message}
          </p>
        )}
      </div>

      {/* ================= CONDITIONAL FIELDS ================= */}
      {selectedType && (
        <>
          {/* Document Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Document Number <span className="text-red-500">*</span>
            </label>

            <input
              {...register("document_number", {
                required: "Document number required",
              })}
              placeholder="Enter document number"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green"
            />

            {errors.document_number && (
              <p className="text-red-500 text-xs mt-1">
                {errors.document_number.message}
              </p>
            )}
          </div>

          {/* Front Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Front Image <span className="text-red-500">*</span>
            </label>

            <input
              type="file"
              accept="image/*"
              {...register("document_front", {
                required: "Front image required",
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-lime-100 file:text-brand-green file:font-medium hover:file:bg-lime-200"
            />

            {errors.document_front && (
              <p className="text-red-500 text-xs mt-1">
                {errors.document_front.message}
              </p>
            )}
          </div>

          {/* Back Image (Only Aadhaar) */}
          {selectedType === "aadhaar" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Back Image <span className="text-red-500">*</span>
              </label>

              <input
                type="file"
                accept="image/*"
                {...register("document_back", {
                  required: "Back image required",
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-lime-100 file:text-brand-green file:font-medium hover:file:bg-lime-200"
              />

              {errors.document_back && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.document_back.message}
                </p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={kycLoading}
            className="w-full py-3 bg-brand-green text-white rounded-xl font-semibold hover:bg-emerald-600 transition"
          >
            {kycLoading ? <Spinner /> : "Submit KYC"}
          </button>
        </>
      )}
    </form>
  );
}

/* ================= REUSABLE COMPONENTS ================= */
function FormInput({ label, register, error, disabled = false }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      <input
        {...register}
        disabled={disabled}
        className={`w-full px-4 py-3 rounded-xl border transition 
        ${
          disabled
            ? "bg-gray-100 text-gray-500 cursor-not-allowed"
            : "border-gray-300 outline-none focus:ring-2 focus:ring-brand-green"
        }`}
      />

      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
}

function KycStatusCard({ kyc }) {
  const getStatusStyle = () => {
    if (kyc.status === "approved") return "bg-emerald-100 text-emerald-700";
    if (kyc.status === "pending") return "bg-yellow-100 text-yellow-700";
    if (kyc.status === "rejected") return "bg-red-100 text-red-600";
  };

  return (
    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold capitalize">
            {kyc.document_type} Submitted
          </p>
          <p className="text-sm text-gray-500 mt-1">Verification Status</p>
        </div>

        <span
          className={`px-4 py-1 rounded-full text-xs font-medium capitalize ${getStatusStyle()}`}
        >
          {kyc.status}
        </span>
      </div>

      {kyc.status === "rejected" && (
        <p className="text-xs text-red-500 mt-3">
          Your document was rejected. Please resubmit.
        </p>
      )}
    </div>
  );
}

function BusinessInfoForm() {
  const dispatch = useDispatch();
  const { businessLoading, businessData } = useSelector(
    (state) => state.customer,
  );
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
  } = useForm({
    defaultValues: {
      business_name: "",
      gst_number: "",
      pan_number: "",
      business_type: "",
      email: "",
      phone: "",
      address_line1: "",
      address_line2: "",
      country_id: "",
      state_id: "",
      city_id: "",
      pincode: "",
    },
  });

  const selectedCountry = watch("country_id");
  const selectedState = watch("state_id");

  /* ================= INITIAL LOAD ================= */
  useEffect(() => {
    dispatch(getCountries());
    dispatch(getBusinessInfo());
  }, [dispatch]);

  /* ================= SET DEFAULT VALUES (UPDATE MODE) ================= */
  useEffect(() => {
    if (!businessData) return;

    const loadLocationData = async () => {
      reset({
        business_name: businessData.business_name || "",
        gst_number: businessData.gst_number || "",
        pan_number: businessData.pan_number || "",
        business_type: businessData.business_type || "",
        email: businessData.email || "",
        phone: businessData.phone || "",
        address_line1: businessData.address_line1 || "",
        address_line2: businessData.address_line2 || "",
        pincode: businessData.pincode || "",
      });

      if (businessData.country_id) {
        await dispatch(getStates(businessData.country_id)).unwrap();
      }

      if (businessData.state_id) {
        await dispatch(getCities(businessData.state_id)).unwrap();
      }

      setValue("country_id", businessData.country_id);
      setValue("state_id", businessData.state_id);
      setValue("city_id", businessData.city_id);
    };

    loadLocationData();
  }, [businessData]);

  /* ================= COUNTRY → STATE ================= */
  useEffect(() => {
    if (!selectedState) return;

    dispatch(getCities(selectedState));
  }, [selectedState]);

  /* ================= SUBMIT ================= */
  const onSubmit = async (data) => {
    if (businessData?.id) {
      await dispatch(
        updateBusinessInfo({
          id: businessData.id,
          payload: data,
        }),
      ).unwrap();
    } else {
      await dispatch(addBusinessInfo(data)).unwrap();
    }

    // 🔥 Only run AFTER update completes
    await dispatch(getBusinessInfo()).unwrap();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <FormInput
          label="Business Name"
          register={register("business_name", { required: "Required" })}
          error={errors.business_name}
        />

        <FormInput
          label="GST Number"
          register={register("gst_number")}
          error={errors.gst_number}
        />

        <FormInput
          label="PAN Number"
          register={register("pan_number")}
          error={errors.pan_number}
        />

        {/* BUSINESS TYPE */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Business Type
          </label>
          <select
            {...register("business_type", { required: "Required" })}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-green"
          >
            <option value="">Select Type</option>
            <option value="pvt_ltd">Private Limited</option>
            <option value="proprietor">Proprietorship</option>
            <option value="llp">LLP</option>
          </select>
          {errors.business_type && (
            <p className="text-red-500 text-xs mt-1">
              {errors.business_type.message}
            </p>
          )}
        </div>

        <FormInput
          label="Business Email"
          register={register("email", { required: "Required" })}
          error={errors.email}
        />

        <FormInput
          label="Phone"
          register={register("phone", { required: "Required" })}
          error={errors.phone}
        />

        <FormInput
          label="Address Line 1"
          register={register("address_line1", { required: "Required" })}
          error={errors.address_line1}
        />

        <FormInput
          label="Address Line 2"
          register={register("address_line2")}
          error={errors.address_line2}
        />

        {/* COUNTRY */}
        <div>
          <label className="block text-sm font-medium mb-2">Country</label>
          <select
            {...register("country_id", { required: "Required" })}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-green"
            onChange={(e) => {
              setValue("country_id", e.target.value);
              setValue("state_id", "");
              setValue("city_id", "");
            }}
          >
            <option value="">Select Country</option>
            {countryData?.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
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
          <label className="block text-sm font-medium mb-2">State</label>
          <select
            {...register("state_id", { required: "Required" })}
            onChange={(e) => {
              setValue("state_id", e.target.value);
              setValue("city_id", ""); // 🔥 clear only when user changes
            }}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-green"
            disabled={!selectedCountry}
          >
            <option value="">Select State</option>
            {stateData?.map((state) => (
              <option key={state.id} value={state.id}>
                {state.name}
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
          <label className="block text-sm font-medium mb-2">City</label>
          <select
            {...register("city_id", { required: "Required" })}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-green"
            disabled={!selectedState}
          >
            <option value="">Select City</option>
            {cityData?.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
          {errors.city_id && (
            <p className="text-red-500 text-xs mt-1">
              {errors.city_id.message}
            </p>
          )}
        </div>

        <FormInput
          label="Pincode"
          register={register("pincode", { required: "Required" })}
          error={errors.pincode}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={businessLoading}
          className="px-8 py-3 bg-brand-green text-white font-semibold rounded-xl w-50 hover:bg-emerald-600 transition shadow-md"
        >
          {businessLoading ? (
            <Spinner />
          ) : businessData ? (
            "Update Business"
          ) : (
            "Add Business"
          )}
        </button>
      </div>
    </form>
  );
}
function AddressInfo() {
  const dispatch = useDispatch();
  const { addressData } = useSelector((state) => state.customer);
    const [editAddressData, setEditAddressData] = useState(null);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const addresses = addressData || [];

    const handleDeleteAddress = (id) => {
      dispatch(deleteAddress(id)).then(() => {
        dispatch(getCustomerAddresses());
      });
    };

  useEffect(() => {
    dispatch(getCustomerAddresses());
  }, [dispatch]);

  return (
    <>
    <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-sm  p-8 md:p-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-black">Saved Addresses</h2>

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
        <p className="text-gray-500 text-sm">No shipping address found.</p>
      ) : (
        <div className="space-y-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`border rounded-2xl p-4 transition ${
                addr?.is_default_shipping
                  ? "border-brand-green bg-emerald-50"
                  : "border-gray-200"
              }`}
            >
              <label className="flex items-start gap-3 cursor-pointer">
                <div className="flex-1">
                  <p className="font-semibold">{addr.name}</p>

                  <p className="text-sm text-gray-600 mt-1">
                    {addr.address_line_1}, {addr.address_line_2}
                  </p>

                  <p className="text-sm text-gray-600">
                    {addr.city_name}, {addr.pincode}, {addr.state_name},{" "}
                    {addr.country_name}
                  </p>

                  <p className="text-sm text-gray-600">📞 {addr.mobile}</p>

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
                      dispatch(setDefaultAddress({ address_id: addr.id })).then(
                        () => dispatch(getCustomerAddresses()),
                      )
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
