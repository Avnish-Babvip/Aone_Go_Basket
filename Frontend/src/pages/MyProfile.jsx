import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCustomerDetails,
  getCustomerKycStatus,
  submitKyc,
  updateProfile,
} from "../features/actions/customer";
import { useForm } from "react-hook-form";
import { Spinner } from "../components/Loader/Spinner";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { profileData, kycData } = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(getCustomerDetails());
    dispatch(getCustomerKycStatus());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20 px-4 lg:px-16 space-y-10">
      {/* ================= PROFILE FORM ================= */}
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-sm  p-8 md:p-12">
        <ProfileForm profileData={profileData} />
      </div>

      {/* ================= KYC FORM ================= */}
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-sm p-8 md:p-12">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          KYC Information
        </h2>

        {kycData ? <KycStatusCard kyc={kycData} /> : <KycUploadSection />}
      </div>
    </div>
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
