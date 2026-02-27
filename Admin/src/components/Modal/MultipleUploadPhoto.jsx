import { useRef } from "react";
import { TbUpload } from "react-icons/tb";
import { FiTrash2 } from "react-icons/fi";

const MultiPhotoUpload = ({
  label = "Photos",
  value = [],
  onChange,
  primaryIndex = 0,
  onPrimaryChange,
  onDeleteApiImage, // 🔥 new prop
  error,
}) => {
  const inputRef = useRef(null);

  /* ================= ADD IMAGES ================= */
  const handleAdd = (files) => {
    const newFiles = Array.from(files || []);
    if (!newFiles.length) return;

    const formatted = newFiles.map((file) => ({
      id: null,
      url: URL.createObjectURL(file),
      file,
    }));

    onChange([...(value || []), ...formatted]);
    inputRef.current.value = "";
  };

  /* ================= REMOVE LOCAL IMAGE ================= */
  const handleRemove = (index) => {
    const img = value[index];

    // 🔥 If image has id → call API delete
    if (img.id) {
      onDeleteApiImage?.(img.id);
    }

    const updated = [...value];
    updated.splice(index, 1);
    onChange(updated);

    if (index === primaryIndex) {
      onPrimaryChange(0);
    } else if (index < primaryIndex) {
      onPrimaryChange(primaryIndex - 1);
    }
  };

  return (
    <div className="space-y-3">
      <label className="text-gray-700 text-sm font-medium">{label}</label>

      {/* UPLOAD BUTTON */}
      <label className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 text-sm bg-white border rounded-lg cursor-pointer hover:border-blue-500">
        <TbUpload size={16} />
        Upload Images
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/png,image/jpeg,image/jpg"
          className="hidden"
          onChange={(e) => handleAdd(e.target.files)}
        />
      </label>

      {/* PREVIEW GRID */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          {value.map((img, index) => (
            <div
              key={index}
              className={`relative group rounded-lg overflow-hidden border ${
                index === primaryIndex ? "ring-2 ring-blue-600" : ""
              }`}
            >
              <img
                src={img.url}
                alt="Preview"
                className="w-full h-28 object-cover"
              />

              {/* 🔥 HOVER DELETE OVERLAY */}
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute inset-0 flex items-center justify-center
                           bg-black/50 opacity-0 group-hover:opacity-100
                           transition-all duration-300"
              >
                <div className="bg-red-500 p-2 rounded-full text-white shadow-lg">
                  <FiTrash2 size={18} />
                </div>
              </button>

              {/* PRIMARY BADGE */}
              {index === primaryIndex && (
                <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded">
                  Primary
                </span>
              )}

              {/* SET PRIMARY BUTTON */}
              <button
                type="button"
                onClick={() => onPrimaryChange(index)}
                className="absolute bottom-2 left-1/2 -translate-x-1/2
                           text-xs bg-white px-2 py-1 rounded shadow
                           opacity-0 group-hover:opacity-100 hover:bg-blue-600 hover:text-white text-black transition"
              >
                Set Primary
              </button>
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default MultiPhotoUpload;
