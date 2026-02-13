import { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const FilterSelect = ({
  label = "Filter",
  value = "", // selected VALUE (e.g. 1, 2)
  options = [],
  onChange,
  containerClass = "",
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  // 🔑 Find selected label
  const selectedOption = options.find((opt) => (opt.value ?? opt) == value);

  const displayLabel = selectedOption?.label ?? "All";

  return (
    <div
      ref={ref}
      className={`flex items-center gap-3
        border border-gray-300 bg-white
        rounded-xl px-4 py-1
        shadow-sm relative
        ${containerClass}
      `}
    >
      {/* Label */}
      <span className="text-sm font-medium text-gray-600 whitespace-nowrap">
        {label}
      </span>

      {/* Button */}
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="
          flex items-center gap-2
          border border-gray-300 rounded-lg
          px-4 py-1 text-sm text-gray-800
          hover:border-gray-400
          transition
        "
      >
        {displayLabel}
        <FiChevronDown
          size={16}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute right-0 top-full mt-2 w-40
            bg-white rounded-xl
            shadow-lg border border-gray-100
            z-50 overflow-hidden
          "
        >
          {/* ALL */}
          <button
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100
              ${value === "" ? "text-orange-500 font-medium" : "text-gray-700"}
            `}
          >
            All
          </button>

          {options.map((opt) => {
            const optLabel = opt.label ?? opt;
            const optValue = opt.value ?? opt;

            return (
              <button
                key={optValue}
                onClick={() => {
                  onChange(optValue); // 👈 still pass VALUE
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100
                  ${
                    value === optValue
                      ? "text-orange-500 font-medium"
                      : "text-gray-700"
                  }
                `}
              >
                {optLabel}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FilterSelect;
