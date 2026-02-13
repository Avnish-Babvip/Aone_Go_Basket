import { FiX, FiShoppingBag } from "react-icons/fi";

function CartSidebar({ isOpen, onClose }) {
  return (
    <div className={`fixed top-0 right-0 h-full w-full sm:w-[380px] bg-white z-[120] shadow-2xl transition-transform duration-300 flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
      <div className="flex items-center justify-between p-5 border-b">
        <span className="text-lg font-bold">Shopping Cart</span>
        <button onClick={onClose} className="text-2xl text-gray-400"><FiX /></button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
        <FiShoppingBag className="text-5xl text-gray-200 mb-4" />
        <h3 className="text-lg font-bold">Your cart is empty</h3>
        <button onClick={onClose} className="mt-6 bg-emerald-500 text-white w-full py-3 rounded-md font-bold hover:bg-emerald-600 transition-colors">
          Return to Shop
        </button>
      </div>
    </div>
  );
}

export default CartSidebar;