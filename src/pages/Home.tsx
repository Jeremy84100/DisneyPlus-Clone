import Brand from "@/components/Brand";
import Category from "@/components/Category";
import SliderHeader from "@/components/SliderHeader";


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
