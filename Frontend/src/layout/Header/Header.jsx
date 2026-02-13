import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import {
  FiChevronDown,
  FiMenu,
  FiX,
  FiShoppingBag,
  FiPlus,
  FiMinus,
  FiSearch,
  FiUser,
  FiHome,
} from "react-icons/fi";
import Login from "../../components/Modal/Authentication/Login";
import SignUp from "../../components/Modal/Authentication/SignUp";
import LoginOTP from "../../components/Modal/Authentication/LoginOTP";
import ForgotPassword from "../../components/Modal/Authentication/ForgotPassword";
import { useDispatch, useSelector } from "react-redux";
import { customerLogout } from "../../features/actions/authentication";
import { getAllCategoriesWithSubCategories } from "../../features/actions/category";

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

  useEffect(() => {
    setInput(urlSearch);
  }, [urlSearch]);

  useEffect(() => {
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
    }, 500);

    return () => clearTimeout(timer);
  }, [input]);

  useEffect(() => {
    if (input) setIsMenuOpen(false);
  }, [searchParams]);

  useEffect(() => {
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
          setIsMenuOpen={setIsMenuOpen}
          setIsCartOpen={setIsCartOpen}
          setAuthView={setAuthView}
          category={categoryData}
          input={input}
          setInput={setInput}
          searchRef={searchRef}
        />
      </header>

      {/* MOBILE BOTTOM NAV */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full h-16 bg-white border-t border-gray-200 z-[100] flex items-center justify-around shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <BottomNavItem
          icon={<FiMenu />}
          label="Menu"
          onClick={() => setIsMenuOpen(true)}
        />

        <BottomNavItem
          icon={<FiShoppingBag />}
          label="Cart"
          onClick={() => setIsCartOpen(true)}
        />

        <BottomNavItem
          icon={<FiSearch />}
          label="Search"
          onClick={() => {
            searchRef.current?.focus();
          }}
        />

        {/* SIGN IN (MOBILE) */}
        <BottomNavItem
          icon={<FiUser />}
          label="Account"
          onClick={() => {
            if (isCustomerLoggedIn) {
              console.log("first");
              setIsAccountOpen(true);
            } else {
              console.log("first");

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
    </>
  );
}

/* ================= MAIN NAVBAR ================= */

function MainNavbar({
  setIsCartOpen,
  setAuthView,
  category,
  input,
  setInput,
  searchRef,
}) {
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
            src="src/assets/images/logo.png"
            alt="Logo"
            className="h-18 w-18 object-contain"
          />
        </NavLink>

        {/* DESKTOP NAV */}
        <nav className="hidden xl:flex items-center gap-7 h-20">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <MenuItem title="Categories" options={category} isCategory={true} />

          <MenuItem
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
              {
                name: "Users",
                children_recursive: [
                  { name: "My Account", slug: "/profile" },
                  { name: "Sign In", slug: "/login" },
                  { name: "Sign Up", slug: "/signup" },
                ],
              },
              { name: "About Us", slug: "/about-us" },
              { name: "Privacy Policy", slug: "/privacy-policy" },
              { name: "Terms & Condition", slug: "/terms-condition" },
              { name: "Contact Us", slug: "/contact-us" },
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
            <AccountSection setAuthView={setAuthView} />
          </div>

          <div
            onClick={() => setIsCartOpen(true)}
            className="relative cursor-pointer text-gray-700 hover:text-brand-green"
          >
            <FiShoppingBag className="text-2xl" />
            <span className="absolute -top-1.5 -right-2 bg-brand-green text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
              0
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

function BottomNavItem({ icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 text-gray-500"
    >
      <span className="text-2xl ">{icon}</span>
      {/* <span className="text-[10px]">{label}</span> */}
    </button>
  );
}

function MenuItem({ title, options, isCategory }) {
  return (
    <div className="relative group h-20 flex items-center">
      <div className="flex items-center gap-1 cursor-pointer text-sm font-semibold text-gray-700 hover:text-brand-green">
        {title}
        <FiChevronDown className="text-xs group-hover:rotate-180 transition" />
      </div>

      <div className="absolute top-full left-0 hidden group-hover:block border shadow-md border-gray-100  bg-white  min-w-[240px] py-2">
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
    ? `/category/${parentSlug ? parentSlug + "/" : ""}${currentSlug}`
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
        <div className="absolute top-0 left-full hidden group-hover/sub:block bg-white border shadow-md border-gray-100  min-w-[220px] py-2">
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

function AccountSection({ setAuthView }) {
  const [open, setOpen] = useState(false);
  const { customerData, isCustomerLoggedIn } = useSelector(
    (state) => state.authentication,
  );
  const customer = customerData?.customer;
  const dispatch = useDispatch();

  if (!isCustomerLoggedIn) {
    return <SignIn setAuthView={setAuthView} />;
  }

  const handleLogout = () => {
    dispatch(customerLogout()); // change if your action different
    setOpen(false);
  };

  return (
    <div className="relative">
      {/* BUTTON */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 font-bold text-sm text-gray-700 hover:text-brand-green"
      >
        <FiUser className="text-xl" />
        <span>Hi, {customer?.name || "User"}</span>
        <FiChevronDown className={`transition ${open ? "rotate-180" : ""}`} />
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-3 w-48 bg-white border  border-gray-200 rounded-lg shadow-xl py-2 z-[200]">
          <NavLink
            to="/account/profile"
            className="block px-4 py-2 text-sm hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            My Profile
          </NavLink>

          <NavLink
            to="/account/change-password"
            className="block px-4 py-2 text-sm hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            Change Password
          </NavLink>

          <NavLink
            to="/account/orders"
            className="block px-4 py-2 text-sm hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            Orders History
          </NavLink>

          <hr className="my-2 text-gray-200" />

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      )}
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
      <div className="flex items-center justify-between px-5 border-b border-gray-200">
        <img
          src="src/assets/images/logo.png"
          className="h-12 w-12 object-contain"
        />
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
            { name: "Terms & Condition", slug: "/terms-condition" },
            { name: "Contact Us", slug: "/contact-us" },
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
        className="block py-4 font-semibold border-b border-gray-200 hover:text-brand-green"
      >
        {title}
      </NavLink>
    );
  }

  // ✅ HAS CHILDREN → EXPANDABLE
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full py-4 flex justify-between items-center font-semibold"
      >
        {title}
        {open ? <FiMinus /> : <FiPlus />}
      </button>

      {open && (
        <div className="pb-3">
          {options.map((item, i) => (
            <MobileSubItem key={i} item={item} onClose={onClose} />
          ))}
        </div>
      )}
    </div>
  );
}

function MobileSubItem({ item, parentSlug = "", onClose }) {
  const [open, setOpen] = useState(false);

  const isCategory = !!item.children_recursive;

  // ✅ BUILD PATH
  const path = isCategory
    ? `/category/${parentSlug ? parentSlug + "/" : ""}${item.slug}`
    : `${item.slug}`;
  // ===============================
  // NO CHILDREN
  // ===============================
  if (!item.children_recursive?.length) {
    return (
      <NavLink
        to={path}
        onClick={onClose}
        className="block py-2 px-4 text-sm text-gray-600 hover:text-brand-green"
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
        className="w-full flex justify-between items-center py-2 px-4 text-sm text-gray-700"
      >
        {item.name}
        {open ? <FiMinus size={14} /> : <FiPlus size={14} />}
      </button>

      {open && (
        <div className="ml-4">
          {item.children_recursive.map((child, i) => (
            <MobileSubItem
              key={i}
              item={child}
              parentSlug={`${parentSlug ? parentSlug + "/" : ""}${item.slug}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ================= CART ================= */

function CartSidebar({ isOpen, onClose }) {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-full sm:w-[380px] bg-white z-[120] shadow-2xl transition-transform duration-300 flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex items-center justify-between p-5 border-b border-gray-200">
        <span className="text-lg font-bold">Shopping Cart</span>
        <button onClick={onClose} className="text-2xl text-gray-400">
          <FiX />
        </button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
        <FiShoppingBag className="text-5xl text-gray-200 mb-4" />
        <h3 className="text-lg font-bold">Your cart is empty</h3>
        <button
          onClick={onClose}
          className="mt-6 bg-brand-green text-white w-full py-3 rounded-md font-bold hover:bg-emerald-600 transition-colors"
        >
          Return to Shop
        </button>
      </div>
    </div>
  );
}

function AccountSidebar({ isOpen, onClose, customer }) {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-full sm:w-[380px] bg-white z-[120] shadow-2xl transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between p-5 border-b border-gray-200">
        <div>
          <p className="font-bold text-lg">My Account</p>
          <p className="text-sm text-gray-500">{customer?.name}</p>
        </div>

        <button onClick={onClose} className="text-2xl text-gray-400">
          <FiX />
        </button>
      </div>

      {/* MENU */}
      <div className="p-5 space-y-4 text-sm font-medium">
        <NavLink
          to="/profile"
          onClick={onClose}
          className="block hover:text-brand-green"
        >
          My Profile
        </NavLink>

        <NavLink
          to="/orders"
          onClick={onClose}
          className="block hover:text-brand-green"
        >
          Order History
        </NavLink>

        <NavLink
          to="/change-password"
          onClick={onClose}
          className="block hover:text-brand-green"
        >
          Change Password
        </NavLink>

        <button
          onClick={() => {
            dispatch(customerLogout());
            onClose();
          }}
          className="block text-red-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Header;
