import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUser } from "react-icons/fa";
import { TbSettingsFilled } from "react-icons/tb";
import { LuLogOut } from "react-icons/lu";
import { TbDashboardFilled } from "react-icons/tb";
import { IoChevronDownSharp } from "react-icons/io5";
import {
  setActiveAccountCenterTab,
  setActiveSubTab,
} from "../../features/slices/references";
import { adminLogout } from "../../features/actions/authentication";
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
      url: "/admin/dashboard",
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
          name: "KYC Approval",
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
          name: "KYC Approval",
          url: "/admin/rider/kyc",
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
      label: "Settings",
      icon: TbSettingsFilled,
      url: "/admin/settings",
    },
    {
      label: "Order Rider",
      icon: FaUnlockAlt,
      children: [
        {
          name: "Assigned Orders",
          url: `/rider/order/assigned`,
        },
      ],
    },
    {
      label: "Profile",
      icon: FaUnlockAlt,
      url: "/rider/profile",
    },
  ];

  const riderMenuItems = [
    {
      label: "Dashboard",
      icon: TbDashboardFilled,
      url: "/admin/dashboard",
    },
    {
      label: "Order Management",
      icon: FaUnlockAlt,
      children: [
        {
          name: "Assigned Orders",
          url: `/rider/order/assigned`,
        },
      ],
    },
  ];

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
            {adminMenuItems.map((item) => {
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

      <div>
     

      </div>
        {/* Logout */}
  <div className="px-10 py-4 border-t border-gray-700">
        <div
          onClick={() => dispatch(adminLogout(adminData?.token))}
          className="flex items-center gap-3 cursor-pointer text-red-400 hover:text-red-500"
        >
          <LuLogOut className="text-lg" />
          <span className="font-medium">Log Out</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
