import HeroBanner from "../components/Home/HeroBanner";
import CategoryCards from "../components/Home/CategoryCards";
import DiscountBanner from "../components/Home/DiscountBanner";
import { useEffect } from "react";
import { getHomeData } from "../features/actions/home";
import { useDispatch, useSelector } from "react-redux";
import HomeProduct from "../components/Home/HomeProduct";
import AppDownloadBanner from "../components/Home/AppDownloadBanner";

function Home() {
  const dispatch = useDispatch();
  const { homeData, homeLoading } = useSelector((state) => state.home);

  const featuredProducts = homeData.featured_products || [];
  const categories = homeData.categories || [];
  const latestProducts = homeData.latest_products || [];

  useEffect(() => {
    dispatch(getHomeData());
  }, []);

  return (
    <div className="min-h-screen  bg-white">
      {/* The HeroBanner starts here */}
      <HeroBanner />
      <CategoryCards categoryData={categories} loading={homeLoading} />
      <HomeProduct
        loading={homeLoading}
        products={latestProducts}
        viewMore={"products?sort=new"}
        heading={"Newly Added Products"}
        subheading={"Discover the latest items freshly stocked for you"}
      />
      <HomeProduct
        loading={homeLoading}
        products={featuredProducts}
        viewMore={"products?sort=featured"}
        heading={"Featured Products"}
        subheading={"Popular choices customers love the most"}
      />
      <DiscountBanner />
      <AppDownloadBanner />
    </div>
  );
}

export default Home;
