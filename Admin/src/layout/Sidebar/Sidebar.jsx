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
          name: "UnAssigned Order",
          url: "/admin/order/unassign",
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
      label: "Customer Profile",
      icon: FaRegUser,
      children: [
        {
          name: "All Customers",
          url: "/admin/customer",
        },
        {
          name: "KYC Approval",
          url: "/admin/customer",
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
      ],
    },
    {
      label: "Settings",
      icon: TbSettingsFilled,
      url: "/admin/settings",
    },
    {
      label: "Order rider",
      icon: FaUnlockAlt,
      children: [
        {
          name: "Assigned Orders",
          url: `/rider/order/assigned`,
        },
      ],
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
    <div className="flex flex-col justify-between h-screen tracking-tight  py-6 relative overflow-hidden shadow-xl">
      {/* Logo */}
      <div className="flex flex-col items-center">
        <Link to="/" className="">
          <div className="mb-8 font-extrabold text-xl">AONE GO BASKET</div>
        </Link>

        {/* Main Menu */}
        <div className="w-full px-5">
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
                    className={`flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer transition-all ${
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
      </div>

      <div>
        {/* Footer */}
        <div className="absolute bottom-2 left-0 w-full text-center text-gray-500 text-xs">
          Aone Go Black Dashboard
        </div>

        {/* Logout */}
        <div
          onClick={() => {
            dispatch(adminLogout(adminData?.token));
          }}
          className="flex items-center gap-3 px-6 py-3 mt-6 cursor-pointer text-red-400 hover:text-red-500"
        >
          <LuLogOut className="text-lg" />
          <span className="font-medium">Log Out</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
