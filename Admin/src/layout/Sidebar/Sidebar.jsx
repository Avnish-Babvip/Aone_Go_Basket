import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUser } from "react-icons/fa";
import { TbSettingsFilled } from "react-icons/tb";
import { TbDashboardFilled } from "react-icons/tb";
import { IoChevronDownSharp } from "react-icons/io5";
import {
  setActiveAccountCenterTab,
  setActiveSubTab,
} from "../../features/slices/references";
import { FaUnlockAlt } from "react-icons/fa";

const Sidebar = ({ closeSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { activeTab, activeSub } = useSelector((state) => state.references);
  const [openDropdown, setOpenDropdown] = useState(null);
  const { adminData } = useSelector((state) => state.authentication);
  const handleDropdown = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const handleNavigate = (
    url,
    label,
    parentLabel = null,
    subLabel = null,
    state = null,
  ) => {
    dispatch(setActiveAccountCenterTab(parentLabel || label));
    dispatch(setActiveSubTab(subLabel));

    navigate(url, state ? { state } : undefined);
    if (closeSidebar) closeSidebar();
  };

  const adminMenuItems = [
    {
      label: "Dashboard",
      icon: TbDashboardFilled,
      url: "/admin",
    },
    {
      label: "Order Management",
      icon: FaUnlockAlt,
      children: [
        {
          name: "View Orders",
          url: `/admin/order`,
        },
        {
          name: "Assigned Order",
          url: "/admin/order/assigned",
        },
        {
          name: "Unassigned Order",
          url: "/admin/order/unassigned",
        },
      ],
    },
    {
      label: "Admin User Profile",
      icon: FaRegUser,
      children: [
        {
          name: "All Users",
          url: "/admin/user",
        },
        {
          name: "Add User",
          url: "/admin/user",
          state: { openModal: true }, // 👈 key part
        },
      ],
    },
    {
      label: "Customer Management",
      icon: FaRegUser,
      children: [
        {
          name: "All Customers",
          url: "/admin/customer",
        },
        {
          name: "Customer KYC Approval",
          url: "/admin/customer/kyc",
        },
      ],
    },
    {
      label: "Rider Management",
      icon: FaUnlockAlt,
      children: [
        {
          name: "All Riders",
          url: `/admin/rider`,
        },
        {
          name: "Riders Referrals",
          url: "/admin/rider/referral",
        },
        {
          name: "Rider KYC Approval",
          url: "/admin/rider/kyc",
        },
        {
          name: "Rider Commission",
          url: "/admin/rider/commission",
        },
      ],
    },
    {
      label: "Role",
      icon: FaRegUser,
      children: [
        {
          name: "All Roles",
          url: "/admin/role",
        },
        {
          name: "Add Role",
          url: "/admin/role",
          state: { openModal: true },
        },
      ],
    },
    {
      label: "Permission",
      icon: FaUnlockAlt,
      children: [
        {
          name: "All Permissions",
          url: "/admin/permission",
        },
        {
          name: "Add Permission",
          url: "/admin/permission",
          state: { openModal: true },
        },
      ],
    },
    {
      label: "Category",
      icon: FaUnlockAlt,
      children: [
        {
          name: "All Categories",
          url: "/admin/category",
        },
        {
          name: "Add Category",
          url: "/admin/category",
          state: { openModal: true },
        },
      ],
    },
    {
      label: "Attribute & Values",
      icon: FaUnlockAlt,
      children: [
        {
          name: "All Attributes",
          url: "/admin/attribute",
        },
        {
          name: "Add Attribute",
          url: "/admin/attribute",
          state: { openModal: true },
        },
      ],
    },
    {
      label: "Product",
      icon: FaUnlockAlt,
      children: [
        {
          name: "Active Products",
          url: `/admin/product?status=active`,
        },
        {
          name: "Inactive Products",
          url: "/admin/product?status=inactive",
        },
        {
          name: "Add Product",
          url: "/admin/product",
          state: { openModal: true },
        },
        {
          name: "Add Bulk Products",
          url: "/admin/product/bulk-products",
        },
        {
          name: "Add Bulk Images",
          url: "/admin/product/bulk-images",
        },
      ],
    },
    {
      label: "Coupon Code",
      icon: TbSettingsFilled,
      children: [
        {
          name: "All Coupon Code",
          url: "/admin/coupon",
        },
        {
          name: "Add Coupon Code",
          url: "/admin/coupon",
          state: { openModal: true },
        },
      ],
    },
    {
      label: "Offer",
      icon: TbSettingsFilled,
      children: [
        {
          name: "All Offers",
          url: "/admin/offer",
        },
        {
          name: "Add Offer",
          url: "/admin/offer",
          state: { openModal: true },
        },
      ],
    },
    {
      label: "Taxes",
      icon: TbSettingsFilled,
      children: [
        {
          name: "All Taxes",
          url: "/admin/tax",
        },
        {
          name: "Add Tax",
          url: "/admin/tax",
          state: { openModal: true },
        },
      ],
    },
    {
      label: "Settings",
      icon: TbSettingsFilled,
      children: [
        {
          name: "Order Settings",
          url: "/admin/settings/order-settings",
        },
        {
          name: "Location",
          url: "/admin/settings/location",
        },
        {
          name: "Company Info",
          url: "/admin/settings/company-info",
        },
      ],
    },
  ];

  const riderMenuItems = [
    {
      label: "Dashboard",
      icon: TbDashboardFilled,
      url: "/rider",
    },
    {
      label: "Assigned Orders",
      icon: FaUnlockAlt,
      url: `/rider/order/assigned`,
    },
    {
      label: "Order History",
      icon: FaUnlockAlt,
      url: "/rider/order/history",
    },
    {
      label: "Your Wallet",
      icon: FaUnlockAlt,
      url: "/rider/wallet",
    },
    {
      label: "Wallet Transactions ",
      icon: FaUnlockAlt,
      url: "/rider/wallet/history",
    },
    {
      label: "KYC & Rider Profile",
      icon: FaUnlockAlt,
      url: "/rider/profile",
    },
    {
      label: "Your Referral Code",
      icon: FaUnlockAlt,
      url: "/rider/referral",
    },
    {
      label: "Referral History",
      icon: FaUnlockAlt,
      url: "/rider/referral/history",
    },
    {
      label: "Your Commission",
      icon: FaUnlockAlt,
      url: "/rider/commission",
    },
  ];

  const menuItems =
    (adminData?.admin?.role_id === 1 && adminMenuItems) ||
    (adminData?.admin?.role_id === 6 && riderMenuItems);

  return (
    <div className="flex flex-col h-screen bg-[#111827] text-gray-400 shadow-xl">
      {/* Scrollable Section */}
      <div className="flex-1 overflow-y-auto px-3 py-6 scrollbar-thin  scrollbar-thumb-gray-700">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/">
            <div className="font-extrabold text-xl text-white">
              AONE GO BASKET
            </div>
          </Link>
        </div>

        {/* Main Menu */}
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const ItemIcon = item.icon;
            const hasChildren = !!item.children;
            const isActiveParent = activeTab === item.label;

            return (
              <li key={item.label}>
                {/* Main Item */}
                <div
                  onClick={() =>
                    hasChildren
                      ? handleDropdown(item.label)
                      : handleNavigate(item.url, item.label)
                  }
                  className={`flex items-center justify-between px-2 py-2 rounded-lg cursor-pointer transition-all ${
                    isActiveParent
                      ? "bg-gradient-to-r from-blue-600 to-blue-900 text-white"
                      : "text-gray-400 hover:text-white hover:bg-[#1A1A40]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-5 flex justify-center mt-[2px]">
                      <ItemIcon
                        className={
                          isActiveParent
                            ? "text-white text-lg"
                            : "text-gray-400 text-lg"
                        }
                      />
                    </span>

                    <span className="font-medium leading-tight whitespace-normal">
                      {item.label}
                    </span>
                  </div>

                  {hasChildren && (
                    <IoChevronDownSharp
                      className={`text-sm transition-transform ${
                        openDropdown === item.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>

                {/* Dropdown */}
                {hasChildren && (
                  <ul
                    className={`ml-10 mt-2 space-y-1 overflow-hidden transition-all duration-300 ${
                      openDropdown === item.label
                        ? "max-h-40 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    {item.children.map((sub, i) => {
                      const isSubActive = activeSub === sub.name;
                      return (
                        <li
                          key={i}
                          onClick={() =>
                            handleNavigate(
                              sub.url,
                              item.label,
                              item.label,
                              sub.name,
                              sub.state, // 👈 pass state
                            )
                          }
                          className={`cursor-pointer text-sm py-1 pl-2 border-l-2 transition-all ${
                            isSubActive
                              ? "text-white border-blue-500 font-semibold"
                              : "text-gray-400 border-transparent hover:text-white hover:border-blue-400"
                          }`}
                        >
                          {sub.name}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div></div>
    </div>
  );
};

export default Sidebar;
