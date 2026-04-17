import HeroBanner from "../components/Home/HeroBanner";
import CategoryCards from "../components/Home/CategoryCards";
import DiscountBanner from "../components/Home/DiscountBanner";
import { useEffect } from "react";
import { getHomeContent, getHomeData } from "../features/actions/home";
import { useDispatch, useSelector } from "react-redux";
import HomeProduct from "../components/Home/HomeProduct";
import AppDownloadBanner from "../components/Home/AppDownloadBanner";

function Home() {
  const dispatch = useDispatch();
  const { homeData, contentData, homeLoading } = useSelector(
    (state) => state.home,
  );
  const content = Array.isArray(contentData) ? contentData : [];

  const sectionContent = content?.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {});

  const heroContent = sectionContent?.section_1 || [];
  const categoryContent = sectionContent?.section_2?.[0] || {};
  const latestContent = sectionContent?.section_3?.[0] || {};
  const featuredContent = sectionContent?.section_4?.[0] || {};
  const discountContent = sectionContent?.section_5?.[0] || {};
  const appContent = sectionContent?.section_6?.[0] || {};

  const featuredProducts = homeData?.featured_products || [];
  const categories = homeData?.categories || [];
  const latestProducts = homeData?.latest_products || [];

  useEffect(() => {
    dispatch(getHomeData());
    dispatch(getHomeContent());
  }, []);

  return (
    <div className="min-h-screen  bg-white">
      <HeroBanner data={heroContent} />
      <CategoryCards
        categoryData={categories}
        loading={homeLoading}
        title={categoryContent?.title}
        subtitle={categoryContent?.subtitle}
      />
      <HomeProduct
        loading={homeLoading}
        products={latestProducts}
        viewMore={"products?sort=new"}
        heading={latestContent?.title}
        subheading={latestContent?.subtitle}
      />
      <HomeProduct
        loading={homeLoading}
        products={featuredProducts}
        viewMore={"products?sort=featured"}
        heading={featuredContent?.title}
        subheading={featuredContent?.subtitle}
      />
      <DiscountBanner data={discountContent} />
      <AppDownloadBanner data={appContent} />
    </div>
  );
}

export default Home;
