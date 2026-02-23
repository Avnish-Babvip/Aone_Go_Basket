import { useEffect, useState } from "react";

const initialAddress = {
  address_for: "shipping",
  type: "home",
  name: "",
  mobile: "",
  address_line_1: "",
  address_line_2: "",
  landmark: "",
  country_id: "",
  state_id: "",
  city_id: "",
  is_default: false,
};

export default function MyProfile() {
  const [profile, setProfile] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState(initialAddress);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
    fetchAddresses();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/profile");
      const data = await res.json();
      setProfile(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAddresses = async () => {
    try {
      const res = await fetch("/api/address");
      const data = await res.json();
      setAddresses(data.data || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await fetch(`/api/address/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        await fetch("/api/address", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }

      fetchAddresses();
      setForm(initialAddress);
      setEditingId(null);
      setShowForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (address) => {
    setForm(address);
    setEditingId(address.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/address/${id}`, { method: "DELETE" });
    fetchAddresses();
  };

  if (!profile) return <div className="text-center py-5">Loading...</div>;

  return (
    <div className="container py-5">
      {/* PROFILE CARD */}
      <div className="card shadow-sm border-0 rounded-4 p-4 mb-4">
        <div className="row align-items-center">
          <div className="col-md-2 text-center">
            <img
              src={profile.profile_image || "/default-user.png"}
              alt="Profile"
              className="rounded-circle"
              width="100"
              height="100"
            />
          </div>

          <div className="col-md-10">
            <h4 className="mb-1">{profile.name}</h4>
            <p className="text-muted mb-2">@{profile.username}</p>

            <div className="row">
              <div className="col-md-4">
                <small className="text-muted">Email</small>
                <div>{profile.email}</div>
              </div>
              <div className="col-md-4">
                <small className="text-muted">Mobile</small>
                <div>{profile.mobile}</div>
              </div>
              <div className="col-md-4">
                <small className="text-muted">Status</small>
                <div>
                  <span className="badge bg-success">{profile.status}</span>
                </div>
              </div>
            </div>

            <div className="mt-2 text-muted small">
              Last Login: {new Date(profile.last_login_at).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* ADDRESS SECTION */}
      <div className="card shadow-sm border-0 rounded-4 p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">My Addresses</h5>
          <button
            className="btn btn-dark rounded-pill"
            onClick={() => {
              setShowForm(true);
              setEditingId(null);
              setForm(initialAddress);
            }}
          >
            + Add Address
          </button>
        </div>

        {loading ? (
          <div>Loading addresses...</div>
        ) : addresses.length === 0 ? (
          <div className="text-muted">No addresses added yet.</div>
        ) : (
          addresses.map((address) => (
            <div
              key={address.id}
              className="border rounded-4 p-3 mb-3 position-relative"
            >
              {address.is_default && (
                <span className="badge bg-dark position-absolute top-0 end-0 m-2">
                  Default
                </span>
              )}

              <h6 className="fw-semibold mb-1">
                {address.name} ({address.type})
              </h6>

              <p className="mb-1">
                {address.address_line_1}, {address.address_line_2}
              </p>
              <p className="mb-1">{address.landmark}</p>
              <p className="mb-1">Mobile: {address.mobile}</p>

              <div className="d-flex gap-3 mt-2">
                <button
                  className="btn btn-sm btn-outline-dark"
                  onClick={() => handleEdit(address)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(address.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ADDRESS FORM MODAL STYLE */}
      {showForm && (
        <div className="card shadow border-0 rounded-4 p-4 mt-4">
          <h5 className="mb-3">
            {editingId ? "Update Address" : "Add Address"}
          </h5>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Address For</label>
                <select
                  name="address_for"
                  className="form-select"
                  value={form.address_for}
                  onChange={handleChange}
                >
                  <option value="shipping">Shipping</option>
                  <option value="billing">Billing</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Type</label>
                <select
                  name="type"
                  className="form-select"
                  value={form.type}
                  onChange={handleChange}
                >
                  <option value="home">Home</option>
                  <option value="office">Office</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  className="form-control"
                  value={form.mobile}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <label className="form-label">Address Line 1</label>
                <input
                  type="text"
                  name="address_line_1"
                  className="form-control"
                  value={form.address_line_1}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <label className="form-label">Address Line 2</label>
                <input
                  type="text"
                  name="address_line_2"
                  className="form-control"
                  value={form.address_line_2}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <label className="form-label">Landmark</label>
                <input
                  type="text"
                  name="landmark"
                  className="form-control"
                  value={form.landmark}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 form-check mt-2">
                <input
                  type="checkbox"
                  name="is_default"
                  className="form-check-input"
                  checked={form.is_default}
                  onChange={handleChange}
                />
                <label className="form-check-label">
                  Set as default address
                </label>
              </div>

              <div className="col-12 mt-3">
                <button
                  type="submit"
                  className="btn btn-dark w-100 rounded-pill"
                >
                  {editingId ? "Update Address" : "Save Address"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
