import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { TiThMenuOutline } from "react-icons/ti";
import { useLocation, useSearchParams } from "react-router-dom";

export const Header = ({ setSidebarOpen }) => {
  const PAGE_CONFIG = {
    "/admin/dashboard": {
      title: "Dashboard",
    },
    "/admin/user": {
      title: "Admin Users List",
      placeholder: "Search name, username or email...",
    },
    "/admin/customer": {
      title: "Customers List",
      placeholder: "Search name, username or email...",
    },
    "/admin/role": {
      title: "Role List",
    },
    "/admin/permission": {
      title: "Permission List",
      placeholder: "Search name or module...",
    },
    "/admin/category": {
      title: "Category List",
    },
    "/admin/attribute": {
      title: "Attribute List",
    },
    "/admin/product": {
      title: "Product List",
      placeholder: "Search product name ",
    },
    "/admin/rider": {
      title: "Rider List",
      placeholder: "Search rider name ",
    },
    "/admin/rider/referral": {
      title: "Rider Referral List",
    },
    "/admin/order": {
      title: "Order List",
      placeholder: "Search name or order number ",
    },

    "/admin/settings": {
      title: "Settings",
    },
  };

  const location = useLocation();
  const pageConfig = PAGE_CONFIG[location.pathname] || {};
  const enableSearch = Boolean(pageConfig.placeholder);

  const [searchParams, setSearchParams] = useSearchParams();

  const urlSearch = searchParams.get("search") || "";

  // 🔹 local input state (for debounce)
  const [input, setInput] = useState(urlSearch);

  /* =========================
     SYNC URL → INPUT
  ========================= */
  useEffect(() => {
    setInput(urlSearch);
  }, [urlSearch]);

  /* =========================
     CLEAR SEARCH ON ROUTE CHANGE
  ========================= */
  useEffect(() => {
    if (!enableSearch && searchParams.has("search")) {
      const params = Object.fromEntries(searchParams.entries());
      delete params.search;
      setSearchParams(params);
      setInput("");
    }
  }, [enableSearch]);

  /* =========================
     DEBOUNCE → URL
  ========================= */
  useEffect(() => {
    if (!enableSearch) return;

    const handler = setTimeout(() => {
      const params = Object.fromEntries(searchParams.entries());

      if (input.trim()) {
        setSearchParams({ ...params, search: input.trim(), page: 1 });
      } else {
        delete params.search;
        setSearchParams(params);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [input, enableSearch]);

  return (
    <header className="flex items-center justify-between md:justify-between w-full px-6 py-4 bg-[#f9f7f7] text-[#5d7186]">
      <button
        className="text-gray-300 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <TiThMenuOutline className="text-gray-500 text-xl" />
      </button>

      <div className="hidden md:block text-lg text-gray-500 uppercase tracking-tight font-semibold">
        {pageConfig.title || " "}
      </div>
      {/* 🔍 SEARCH BAR */}
      {enableSearch && (
        <div className="relative  items-center w-full mx-2 md:hidden bg-[#eae8e8] rounded-full px-4 py-2.5">
          <input
            type="text"
            value={input}
            placeholder={pageConfig.placeholder}
            onChange={(e) => setInput(e.target.value)}
            className="bg-transparent outline-none text-sm text-gray-700 w-full placeholder-gray-500"
          />
        </div>
      )}
      <div className="flex items-center  ">
        <img
          src={`/user.jpg`}
          alt="User"
          className="size-8 md:size-9 rounded-full object-cover"
        />
        {/* 🔍 SEARCH BAR */}
        {enableSearch && (
          <div className="relative hidden md:flex items-center w-full ms-6 md:w-[260px] bg-[#eae8e8] rounded-full px-4 py-2.5">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              value={input}
              placeholder={pageConfig.placeholder}
              onChange={(e) => setInput(e.target.value)}
              className="bg-transparent outline-none text-sm text-gray-700 w-full placeholder-gray-500"
            />
          </div>
        )}
      </div>
    </header>
  );
};
