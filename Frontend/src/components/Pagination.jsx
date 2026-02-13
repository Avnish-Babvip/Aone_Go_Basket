const Pagination = ({ data, page, onPageChange, extraParams = {} }) => {
  if (!data || data.last_page <= 1) return null;

  const totalPages = data.last_page;
  const windowSize = 5;

  // 🔢 Calculate page window safely
  let startPage = Math.max(1, page - Math.floor(windowSize / 2));
  let endPage = startPage + windowSize - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - windowSize + 1);
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4 px-5 pt-8 pb-5">
      <div className="flex items-center gap-2">
        {/* PREVIOUS */}
        <button
          disabled={page === 1}
          onClick={() => onPageChange({ page: page - 1, ...extraParams })}
          className={`px-4 h-10 rounded-xl text-sm font-medium transition-all
        ${
          page === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white border border-gray-200 text-gray-700 hover:border-brand-green hover:text-brand-green hover:shadow-md"
        }`}
        >
          Previous
        </button>

        {/* PAGE NUMBERS */}
        <div className="flex items-center gap-2">
          {pages.map((p) => (
            <button
              key={p}
              onClick={() => onPageChange({ page: p, ...extraParams })}
              className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all
            ${
              p === page
                ? "bg-brand-green text-white shadow-md scale-105"
                : "bg-white border border-gray-200 text-gray-700 hover:border-brand-green hover:text-brand-green hover:shadow"
            }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* NEXT */}
        <button
          disabled={page === totalPages}
          onClick={() => onPageChange({ page: page + 1, ...extraParams })}
          className={`px-4 h-10 rounded-xl text-sm font-medium transition-all
        ${
          page === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white border border-gray-200 text-gray-700 hover:border-brand-green hover:text-brand-green hover:shadow-md"
        }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
