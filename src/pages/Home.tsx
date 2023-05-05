import Brand from "@/components/layouts/MainLayout/Components/Brand";
import Category from "@/components/layouts/MainLayout/Components/Category";
import SliderHeader from "@/components/layouts/MainLayout/Components/SliderHeader";

const Home = () => {
  return (
    <div>
      <SliderHeader />
      <Brand />
      <Category />
    </div>
  );
};

export default Home;
