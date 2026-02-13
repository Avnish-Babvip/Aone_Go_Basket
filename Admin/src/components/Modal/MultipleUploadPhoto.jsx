import { useRef } from "react";
import { TbUpload } from "react-icons/tb";

const MultiPhotoUpload = ({
  label = "Photos",
  value = [],
  onChange,
  primaryIndex = 0,
  onPrimaryChange,
  error,
}) => {
  const inputRef = useRef(null);

  const handleAdd = (files) => {
    const newFiles = Array.from(files || []);
    if (!newFiles.length) return;

    onChange([...(value || []), ...newFiles]);
    inputRef.current.value = "";
  };

  const handleRemove = (index) => {
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
    <div className="space-y-3 space-x-3">
      <label className="text-gray-700 text-sm font-medium">{label}</label>

      {/* UPLOAD */}
      <label className="inline-flex items-center gap-2 px-4 py-2 text-gray-700  text-sm bg-white border rounded-lg cursor-pointer hover:border-blue-500">
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

      {/* PREVIEWS */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          {value.map((img, index) => {
            const src =
              typeof img === "string" ? img : URL.createObjectURL(img);

            return (
              <div
                key={index}
                className={`relative border rounded-lg p-2 ${
                  index === primaryIndex ? "ring-2 ring-blue-600" : ""
                }`}
              >
                <img
                  src={src}
                  alt="Preview"
                  className="w-full h-28 object-cover rounded"
                />

                {/* PRIMARY BADGE */}
                {index === primaryIndex && (
                  <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded">
                    Primary
                  </span>
                )}

                {/* ACTIONS */}
                <div className="flex justify-between mt-2">
                  <button
                    type="button"
                    onClick={() => onPrimaryChange(index)}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Set as Primary
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default MultiPhotoUpload;
