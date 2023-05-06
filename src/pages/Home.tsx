import Brand from "@/components/layouts/MainLayout/Components/Brand";
import Category from "@/components/layouts/MainLayout/Components/Category";
import SliderHeader from "@/components/layouts/MainLayout/Components/SliderHeader";


const Home = ({ genres }: { genres: any }) => {
  return (
    <div>
      <SliderHeader />
      <Brand />
      <Category genres={genres} />
    </div>
  );
};

export default Home;
