import { useState } from "react";
import MainNavbar from "./MainNavbar";
import BottomMobileNav from "./BottomMobileNav";
import MobileMenuSidebar from "./MobileMenuSidebar";
import CartSidebar from "./CartSidebar";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-white border-b border-gray-100">
        <MainNavbar setIsCartOpen={setIsCartOpen} />
      </header>

      <BottomMobileNav setIsMenuOpen={setIsMenuOpen} setIsCartOpen={setIsCartOpen} />

      {/* SHARED OVERLAY */}
      {(isMenuOpen || isCartOpen) && (
        <div 
          className="fixed inset-0 bg-black/40 z-[110] backdrop-blur-sm" 
          onClick={() => { setIsMenuOpen(false); setIsCartOpen(false); }} 
        />
      )}

      <MobileMenuSidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

export default Header;