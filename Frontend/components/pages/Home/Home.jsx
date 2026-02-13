import HeroBanner from "./HeroBanner";
import CategoryCards from "./CategoryCards";
import TopSellingProduct from "./TopSellingProduct";
import DiscountBanner from "./DiscountBanner";

function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* The HeroBanner starts here */}
      <HeroBanner />
      <CategoryCards />
      <TopSellingProduct />
      <DiscountBanner />
      <TopSellingProduct />
      {/* Main Content Area */}
    </div>
  );
}

export default Home;