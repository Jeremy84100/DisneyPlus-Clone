import background from "@/assets/images/background.png";

const Background = () => {
  return (
    <div className="fixed top-0 h-screen w-screen -z-1">
      <img
        className="object-cover h-full w-full"
        src={background}
        alt="background"
      />
    </div>
  );
};

export default Background;
