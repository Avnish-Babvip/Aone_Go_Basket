import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import {
  FiChevronDown,
  FiX,
  FiSearch,
  FiUser,
  FiChevronUp,
  FiTrash,
} from "react-icons/fi";
import { PiUserCircleLight } from "react-icons/pi";
import { BiSolidShoppingBagAlt } from "react-icons/bi";
import { CgMenuLeftAlt } from "react-icons/cg";
import Login from "../../components/Modal/Authentication/Login";
import SignUp from "../../components/Modal/Authentication/SignUp";
import LoginOTP from "../../components/Modal/Authentication/LoginOTP";
import ForgotPassword from "../../components/Modal/Authentication/ForgotPassword";
import { useDispatch, useSelector } from "react-redux";
import { customerLogout } from "../../features/actions/authentication";
import { getAllCategoriesWithSubCategories } from "../../features/actions/category";
import {
  deleteCart,
  getCartData,
  updateCart,
} from "../../features/actions/cart";
import ChangePassword from "../../components/Modal/Account/ChangePassword";
import { getCustomerDetails } from "../../features/actions/customer";

/* ================= HEADER ================= */

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const { customerData, isCustomerLoggedIn } = useSelector(
    (state) => state.authentication,
  );
  const searchRef = useRef(null);

  const { categoryData } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const customer = customerData?.customer;

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearch = searchParams.get("search") || "";
  const [input, setInput] = useState(urlSearch);

  const [authView, setAuthView] = useState(null);
  const { cartData } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCartData());
  }, [isCustomerLoggedIn]);

  useEffect(() => {
    setInput(urlSearch);
  }, [urlSearch]);

  const isTyping = useRef(false);

  const handleChange = (value) => {
    isTyping.current = true;
    setInput(value);
  };

  useEffect(() => {
    if (!isTyping.current) return; // 🚫 ignore non-typing updates

    const timer = setTimeout(() => {
      const params = {};

      if (input.trim()) {
        params.search = input.trim();
        params.page = 1;
      }

      navigate({
        pathname: "/products",
        search: new URLSearchParams(params).toString(),
      });

      isTyping.current = false; // reset
    }, 500);

    return () => clearTimeout(timer);
  }, [input]);

  useEffect(() => {
    if (input) setIsMenuOpen(false);
  }, [searchParams]);

  useEffect(() => {
    dispatch(getCartData());
    dispatch(getAllCategoriesWithSubCategories());
  }, []);
  useEffect(() => {
    if (isCustomerLoggedIn) {
      setAuthView(null); // 🔥 close login if open
    }
  }, [isCustomerLoggedIn]);

  return (
    <>
      {/* TOP NAVBAR */}
      <header className="fixed top-0 w-full z-50 bg-white shadow-xs">
        <MainNavbar
          authView={authView}
          setIsMenuOpen={setIsMenuOpen}
          setIsCartOpen={setIsCartOpen}
          setAuthView={setAuthView}
          category={categoryData}
          input={input}
          setInput={handleChange}
          searchRef={searchRef}
        />
      </header>

      {/* MOBILE BOTTOM NAV */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full h-16 bg-white border-t border-gray-100 z-[100] flex items-center justify-around shadow-[0_-4px_20px_rgba(0,0,0,0.06)] backdrop-blur-md">
        <BottomNavItem
          icon={<CgMenuLeftAlt />}
          onClick={() => setIsMenuOpen(true)}
        />

        <BottomNavItem
          icon={<BiSolidShoppingBagAlt />}
          badge={cartData?.items?.length}
          onClick={() => setIsCartOpen(true)}
        />

        <BottomNavItem
          icon={<FiSearch />}
          onClick={() => searchRef.current?.focus()}
        />

        <BottomNavItem
          icon={<FiUser />}
          onClick={() => {
            if (isCustomerLoggedIn) {
              setIsAccountOpen(true);
            } else {
              setAuthView("signin");
            }
          }}
        />
      </div>

      {/* OVERLAY */}
      {(isMenuOpen || isCartOpen || authView || isAccountOpen) && (
        <div
          className="fixed inset-0 bg-black/40 z-[110]"
          onClick={() => {
            setIsMenuOpen(false);
            setIsCartOpen(false);
            setAuthView(null);
            setIsAccountOpen(false);
          }}
        />
      )}

      {/* SIDEBARS */}
      <MobileMenuSidebar
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        setAuthView={setAuthView}
        category={categoryData}
        input={input}
        setInput={setInput}
      />

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <AccountSidebar
        authView={authView}
        setAuthView={setAuthView}
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        customer={customer}
      />

      {/* AUTH MODAL (SINGLE INSTANCE) */}
      <Login
        isOpen={authView === "signin"}
        onClose={() => setAuthView(null)}
        onSwitch={(value) => setAuthView(value)}
      />
      <LoginOTP
        isOpen={authView === "loginOtp"}
        onClose={() => setAuthView(null)}
        onSwitch={() => setAuthView("signin")}
      />
      <SignUp
        isOpen={authView === "signup"}
        onClose={() => setAuthView(null)}
        onSwitch={() => setAuthView("signin")}
      />
      <ForgotPassword
        isOpen={authView === "forgotPassword"}
        onClose={() => setAuthView(null)}
        onSwitch={() => setAuthView("signin")}
      />
      <ChangePassword
        isOpen={authView === "changePassword"}
        onClose={() => setAuthView(null)}
        onSwitch={() => setAuthView("signin")}
      />
    </>
  );
}

/* ================= MAIN NAVBAR ================= */

function MainNavbar({
  authView,
  setIsCartOpen,
  setAuthView,
  category,
  input,
  setInput,
  searchRef,
}) {
  const { cartData } = useSelector((state) => state.cart);
  const linkClass = ({ isActive }) =>
    `relative h-20 flex items-center text-sm font-semibold px-1
     ${isActive ? "text-brand-green after:w-full" : "text-gray-700 hover:text-brand-green after:w-0 hover:after:w-full"}
     after:absolute after:left-0 after:bottom-[-1px] after:h-[3px] after:bg-brand-green after:transition-all`;

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">
        {/* LOGO */}
        <NavLink to="/" className="flex-shrink-0 ">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="h-18 w-18 object-contain"
          />
        </NavLink>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-7 h-20">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <MenuItem
            url="/categories"
            title="Categories"
            options={category}
            isCategory={true}
          />

          <MenuItem
            url="/products"
            title="Products"
            options={[
              { name: "Featured", slug: "/products?sort=featured" },
              { name: "New Arrivals", slug: "/products?sort=new" },
              { name: "New & Featured", slug: "/products?sort=new_featured" },
            ]}
          />
          <MenuItem
            title="More"
            isCategory={false}
            options={[
              { name: "About Us", slug: "/about-us" },
              { name: "FAQ", slug: "/faq" },
              { name: "Privacy Policy", slug: "/privacy-policy" },
              { name: "Contact Us", slug: "/contact-us" },
              { name: "Terms & Conditions", slug: "/terms-conditions" },
              { name: "Return Policy", slug: "/return-policy" },
            ]}
          />
        </nav>

        {/* SEARCH */}
        <div className="flex flex-1 justify-center max-w-[300px]">
          <Search input={input} setInput={setInput} searchRef={searchRef} />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6">
          {/* DESKTOP SIGN IN */}
          <div className="hidden md:block">
            <AccountSection authView={authView} setAuthView={setAuthView} />
          </div>

          <div
            onClick={() => setIsCartOpen(true)}
            className="relative cursor-pointer text-gray-700 hover:text-brand-green"
          >
            <BiSolidShoppingBagAlt className="text-2xl" />
            <span className="absolute -top-1.5 -right-2 bg-brand-green text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
              {cartData?.items ? cartData?.items?.length : 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function SignIn({ setAuthView }) {
  return (
    <div
      onClick={() => setAuthView("signin")}
      className="flex items-center gap-2 cursor-pointer font-bold text-sm text-gray-700 hover:text-brand-green"
    >
      <FiUser className="text-xl" />
      <span>Sign In</span>
    </div>
  );
}

function BottomNavItem({ icon, onClick, badge }) {
  return (
    <button
      onClick={onClick}
      className="relative flex flex-col items-center justify-center gap-1 text-gray-600 active:scale-95 transition-transform duration-150"
    >
      {/* ICON CONTAINER */}
      <div className="relative w-12 h-11 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-emerald-50 transition-colors duration-200">
        <span className="text-xl">{icon}</span>

        {/* BADGE */}
        {badge > 0 && (
          <span className="absolute -top-1 -right-1 bg-brand-green text-white text-[10px] font-bold rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center shadow">
            {badge}
          </span>
        )}
      </div>

      {/* LABEL */}
    </button>
  );
}

function MenuItem({ title, options, isCategory, url }) {
  return (
    <div className="relative group h-20 flex items-center">
      <Link
        to={url || "#"}
        className="flex items-center gap-1 cursor-pointer text-sm font-semibold text-gray-700 hover:text-brand-green"
      >
        {title}
        <FiChevronDown className="text-xs group-hover:rotate-180 transition" />
      </Link>

      <div className="absolute top-full left-0 hidden group-hover:block border rounded-b-xl shadow-md border-gray-100  bg-white  min-w-[240px] py-2">
        {options?.map((item, i) => (
          <DesktopSubItem key={i} item={item} isCategory={isCategory} />
        ))}
      </div>
    </div>
  );
}

function DesktopSubItem({ item, parentSlug = "", isCategory }) {
  const hasChildren = item.children_recursive?.length > 0;

  const currentSlug = (item.slug || "").replace(/^\/+/, ""); // remove leading /

  // ✅ URL LOGIC
  const path = isCategory
    ? `/category?category_slug=${currentSlug}`
    : `/${currentSlug}`;

  return (
    <div className="relative group/sub">
      {/* LINK */}
      <NavLink
        to={currentSlug ? path : "#"}
        className="flex justify-between items-center px-5 py-2 text-sm hover:bg-brand-green hover:text-white whitespace-nowrap"
      >
        {item.name}
        {hasChildren && <FiChevronDown className="-rotate-90 text-xs" />}
      </NavLink>

      {/* CHILDREN */}
      {hasChildren && (
        <div className="absolute top-0 left-full hidden group-hover/sub:block bg-white border rounded-xl shadow-md border-gray-100  min-w-[220px] py-2">
          {item.children_recursive.map((child, i) => (
            <DesktopSubItem
              key={i}
              item={child}
              parentSlug={
                isCategory
                  ? `${parentSlug ? parentSlug + "/" : ""}${currentSlug}`
                  : ""
              }
              isCategory={isCategory}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Search({ input, setInput, searchRef }) {
  return (
    <div className="relative w-full">
      <input
        ref={searchRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search products..."
        className="w-full h-10 bg-gray-100 rounded-full px-5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
      />
      <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
    </div>
  );
}

function AccountSection({ authView, setAuthView }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const isActive = authView === "changePassword";
  const { profileData } = useSelector((state) => state.customer);
  const { customerData, isCustomerLoggedIn } = useSelector(
    (state) => state.authentication,
  );
  const customer = customerData?.customer;
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(customerLogout());
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    const openLogin = () => setAuthView("signin");

    window.addEventListener("openLoginModal", openLogin);

    return () => {
      window.removeEventListener("openLoginModal", openLogin);
    };
  }, []);

  useEffect(() => {
    dispatch(getCustomerDetails());
  }, []);

  if (!isCustomerLoggedIn) {
    return <SignIn setAuthView={setAuthView} />;
  }

  return (
    <div ref={dropdownRef} className="relative">
      {/* ================= BUTTON ================= */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100 hover:text-brand-green transition-all duration-200"
      >
        <div className="w-8 h-8 flex items-center justify-center rounded-full text-brand-green">
          {profileData?.profile_image || customer?.profile_image ? (
            <img
              className="rounded-full"
              src={
                profileData?.profile_image
                  ? profileData?.profile_image
                  : `${import.meta.env.VITE_REACT_APP_IMAGE_URL}/${customer?.profile_image}`
              }
            />
          ) : (
            <PiUserCircleLight size={24} className="text-lg" />
          )}
        </div>

        <span className="hidden md:block">
          Hi, {customer?.name?.split(" ")[0] || "User"}
        </span>

        <FiChevronDown
          className={`transition-transform duration-300 ${
            open ? "rotate-180 text-brand-green" : ""
          }`}
        />
      </button>

      {/* ================= DROPDOWN ================= */}
      <div
        className={`absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 origin-top ${
          open
            ? "opacity-100 scale-100 visible"
            : "opacity-0 scale-95 invisible"
        }`}
      >
        {/* USER HEADER */}
        <div className="px-5 py-4 bg-gray-50 border-b border-gray-100">
          <p className="text-sm font-semibold text-gray-800">
            {customer?.name}
          </p>
          <p className="text-xs text-gray-500 truncate">{customer?.email}</p>
        </div>

        {/* MENU ITEMS */}
        <div className="py-2">
          <NavLink
            to="/account/my-profile"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center px-5 py-2.5 text-sm transition-all ${
                isActive
                  ? "bg-emerald-50 text-brand-green font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }`
            }
          >
            My Profile
          </NavLink>
          <button
            onClick={() => {
              setOpen(false);
              setAuthView("changePassword");
            }}
            className={`flex items-center w-full text-left px-5 py-2.5 text-sm transition-all ${
              isActive
                ? "bg-emerald-50 text-brand-green font-medium"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            Change Password
          </button>
          <NavLink
            to="/account/order-history"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center px-5 py-2.5 text-sm transition-all ${
                isActive
                  ? "bg-emerald-50 text-brand-green font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }`
            }
          >
            Orders History
          </NavLink>

          <div className="my-2 border-t border-gray-100" />

          <button
            onClick={handleLogout}
            className="w-full text-left px-5 py-2.5 text-sm text-red-500 hover:bg-red-50 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= MOBILE MENU ================= */

function MobileMenuSidebar({ isOpen, onClose, category }) {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-[300px] bg-white z-[120] shadow-2xl transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between px-5 pt-3  border-gray-200">
        <img src="/images/logo.png" className="h-12 w-12 object-contain" />
        <button onClick={onClose} className="text-2xl text-gray-400">
          <FiX />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 pb-20">
        <MobileMenuItem title="Home" link={"/"} onClose={onClose} />
        <MobileMenuItem
          title="Categories"
          options={category}
          onClose={onClose}
        />
        <MobileMenuItem
          title="Products"
          options={[
            { name: "All Products", slug: "/products" },
            { name: "Featured", slug: "/products?sort=featured" },
            { name: "New Arrivals", slug: "/products?sort=new" },
            { name: "New & Featured", slug: "/products?sort=new_featured" },
          ]}
          onClose={onClose}
        />
        <MobileMenuItem
          title="More"
          options={[
            { name: "About Us", slug: "/about-us" },
            { name: "FAQ", slug: "/faq" },
            { name: "Privacy Policy", slug: "/privacy-policy" },
            { name: "Contact Us", slug: "/contact-us" },
            { name: "Return Policy", slug: "/return-policy" },
            { name: "Terms & Conditions", slug: "/terms-conditions" },
          ]}
          onClose={onClose}
        />
      </div>
    </div>
  );
}

function MobileMenuItem({ title, link, options, onClose }) {
  const [open, setOpen] = useState(false);
  const hasChildren = options && options.length > 0;

  // ✅ NO CHILDREN → DIRECT NAVIGATION
  if (!hasChildren) {
    return (
      <NavLink
        to={link || "#"}
        onClick={onClose}
        className={({ isActive }) =>
          `block px-5 py-4 text-base font-semibold transition-all duration-200
           ${
             isActive
               ? "text-brand-green bg-emerald-50"
               : "text-gray-800 hover:text-brand-green hover:bg-gray-50"
           }`
        }
      >
        {title}
      </NavLink>
    );
  }

  // ✅ HAS CHILDREN → EXPANDABLE
  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full px-5 py-4 flex justify-between items-center text-base font-semibold text-gray-800 hover:bg-gray-50 transition"
      >
        {title}
        <span
          className={`transition-transform duration-300 ${
            open ? "rotate-180 text-brand-green" : "rotate-0"
          }`}
        >
          {open ? <FiChevronDown /> : <FiChevronDown />}
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pb-3">
          {options.map((item, i) => (
            <MobileSubItem key={i} item={item} onClose={onClose} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileSubItem({ item, parentSlug = "", onClose }) {
  const [open, setOpen] = useState(false);

  const isCategory = !!item.children_recursive;

  const path = isCategory
    ? `/category?category_slug=${parentSlug ? parentSlug + "/" : ""}${
        item.slug
      }`
    : `${item.slug}`;

  // ===============================
  // NO CHILDREN
  // ===============================
  if (!item.children_recursive?.length) {
    return (
      <NavLink
        to={path}
        onClick={onClose}
        className={({ isActive }) =>
          `block py-2.5 px-6 text-sm transition-all duration-200 rounded-lg
           ${
             isActive
               ? "text-brand-green bg-emerald-50 font-medium"
               : "text-gray-600 hover:text-brand-green hover:bg-gray-50"
           }`
        }
      >
        {item.name}
      </NavLink>
    );
  }

  // ===============================
  // HAS CHILDREN
  // ===============================
  return (
    <div>
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex justify-between items-center py-2.5 px-6 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition"
      >
        <span className="font-medium">{item.name}</span>

        <span
          className={`transition-transform duration-300 ${
            open ? "rotate-180 text-brand-green" : ""
          }`}
        >
          {open ? <FiChevronDown /> : <FiChevronDown />}
        </span>
      </button>

      <div
        className={`ml-4 overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {item.children_recursive.map((child, i) => (
          <MobileSubItem
            key={i}
            item={child}
            parentSlug={`${parentSlug ? parentSlug + "/" : ""}${item.slug}`}
            onClose={onClose}
          />
        ))}
      </div>
    </div>
  );
}

/* ================= CART ================= */
function CartItem({ item }) {
  const dispatch = useDispatch();
  const formatAmount = (amount) => Number(parseFloat(amount || 0).toFixed(2));

  const regularPrice =
    item.variation?.regular_price ?? item.product?.regular_price ?? item.price;

  const salePrice =
    item.variation?.sale_price ?? item.product?.sale_price ?? null;

  const isOnSale =
    salePrice && parseFloat(salePrice) < parseFloat(regularPrice);

  const displayPrice = isOnSale ? salePrice : regularPrice;
  return (
    <div className="flex gap-3 border border-gray-100 rounded-xl p-3">
      {/* IMAGE */}
      <img
        src={`${import.meta.env.VITE_REACT_APP_IMAGE_URL}/${item?.product?.primary_image?.image}`}
        className="w-16 h-16 object-contain bg-gray-50 rounded-lg"
      />

      {/* INFO */}
      <div className="flex-1">
        <h4 className="text-sm font-semibold line-clamp-2">
          {item?.product?.name}
        </h4>

        {item?.variation?.attributes?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {item.variation.attributes.map((attr, index) => (
              <span
                key={index}
                className="text-[11px] px-2 py-1 bg-gray-100 rounded-md text-gray-600"
              >
                {attr.attribute_name}: {attr.attribute_value_name}
              </span>
            ))}
          </div>
        )}

        <div className="mt-1 flex items-center gap-2">
          {isOnSale ? (
            <>
              <span className="text-sm font-bold text-gray-900">
                ₹{formatAmount(displayPrice)}
              </span>
              <span className="text-xs text-gray-400 line-through">
                ₹{formatAmount(regularPrice)}
              </span>
            </>
          ) : (
            <span className="text-sm font-bold text-gray-900">
              ₹{formatAmount(displayPrice)}
            </span>
          )}
        </div>

        {/* QUANTITY */}
        <div className="flex items-center gap-2 mt-2">
          {item.quantity > 1 ? (
            <button
              onClick={() =>
                dispatch(
                  updateCart({
                    id: item.id,
                    payload: { quantity: item.quantity - 1 },
                  }),
                )
              }
              className="p-3 bg-white hover:bg-red-50 text-red-500 rounded-xl shadow"
            >
              <FiChevronDown />
            </button>
          ) : (
            <button
              onClick={() => dispatch(deleteCart(item.id))}
              className="p-3 bg-white hover:bg-red-50 text-red-500 rounded-xl shadow"
            >
              <FiTrash />
            </button>
          )}

          <span className="text-sm px-3 font-bold">{item.quantity}</span>

          {/* INCREASE */}
          <button
            onClick={() =>
              dispatch(
                updateCart({
                  id: item.id,
                  payload: { quantity: item.quantity + 1 },
                }),
              )
            }
            className="p-3 bg-white hover:bg-emerald-50 text-brand-green rounded-xl shadow"
          >
            <FiChevronUp />
          </button>

          {/* REMOVE */}
          <button
            onClick={() => dispatch(deleteCart(item.id))}
            className="text-xs ps-3 text-red-600 hover:text-red-500 font-medium"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

function CartSidebar({ isOpen, onClose }) {
  const { cartData } = useSelector((state) => state.cart);
  const items = cartData?.items || [];
  const total = cartData?.total;
  const navigate = useNavigate();

  const isEmpty = items?.length === 0;

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[120] shadow-2xl transition-transform duration-300 flex flex-col ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between p-5 border-b border-gray-200">
        <span className="text-lg font-bold">Shopping Cart</span>
        <button onClick={onClose} className="text-2xl text-gray-400">
          <FiX />
        </button>
      </div>

      {/* ================= EMPTY ================= */}
      {isEmpty ? (
        <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
          <BiSolidShoppingBagAlt className="text-5xl text-gray-200 mb-4" />
          <h3 className="text-lg font-bold">Your cart is empty</h3>
          <button
            onClick={onClose}
            className="mt-6 bg-brand-green text-white w-full py-3 rounded-md font-bold hover:bg-lime-600 transition"
          >
            Return to Shop
          </button>
        </div>
      ) : (
        <>
          {/* ================= ITEMS ================= */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.map((item) => (
              <CartItem key={item.cartId} item={item} />
            ))}
          </div>

          {/* ================= FOOTER ================= */}
          <div className="border-t border-gray-200 p-5 space-y-4">
            <div className="flex justify-between font-semibold">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>

            <button
              onClick={() => {
                navigate("/checkout");
                onClose();
              }}
              className="w-full bg-brand-green text-white py-3 rounded-xl font-bold hover:bg-emerald-600 transition"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function AccountSidebar({ isOpen, onClose, customer, authView, setAuthView }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const isActive = authView === "changePassword";

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.split(" ");
    return parts
      .map((p) => p[0])
      .join("")
      .toUpperCase();
  };

  return (
    <>
      {/* OVERLAY */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[110] transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[380px] bg-white z-[120] shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* ================= HEADER ================= */}
        <div className="relative bg-gradient-to-r from-brand-green to-lime-600 text-white p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white text-xl opacity-80 hover:opacity-100"
          >
            <FiX />
          </button>

          <div className="flex items-center gap-4">
            {/* Profile Image */}
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-xl font-bold border border-white/30 overflow-hidden">
              {customer?.profile_image ? (
                <img
                  src={`${import.meta.env.VITE_REACT_APP_IMAGE_URL}/${customer.profile_image}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                getInitials(customer?.name)
              )}
            </div>

            <div>
              <p className="text-lg font-bold">{customer?.name || "User"}</p>
              <p className="text-sm opacity-80 truncate">{customer?.email}</p>
            </div>
          </div>
        </div>

        {/* ================= MENU ================= */}
        <div className="p-6 space-y-2 text-sm font-medium">
          <NavLink
            to="/account/my-profile"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-emerald-50 text-brand-green font-semibold"
                  : "text-gray-700 hover:bg-gray-50"
              }`
            }
          >
            My Profile
          </NavLink>

          <NavLink
            to="/account/order-history"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-emerald-50 text-brand-green font-semibold"
                  : "text-gray-700 hover:bg-gray-50"
              }`
            }
          >
            Order History
          </NavLink>

          <button
            to="/account/change-password"
            onClick={() => {
              setOpen(false);
              setAuthView("changePassword");
            }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              isActive
                ? "bg-emerald-50 text-brand-green font-semibold"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            Change Password
          </button>

          <div className="border-t border-gray-100 my-4" />

          <button
            onClick={() => {
              dispatch(customerLogout());
              onClose();
            }}
            className="w-full text-left px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Header;
