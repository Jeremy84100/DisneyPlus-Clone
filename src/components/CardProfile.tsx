import { Image } from "@/types/types";

const CardProfile = ({ image }: { image: Image }) => {
  const handleOnMouseOver = (e: React.MouseEvent<HTMLImageElement>) => {
    const sibling = e.currentTarget.nextElementSibling;
    if (sibling) {
      sibling.classList.add("border-white/75", "scale-105");
      sibling.classList.remove("border-transparent");
    }
  };

  const handleOnMouseOut = (e: React.MouseEvent<HTMLImageElement>) => {
    const sibling = e.currentTarget.nextElementSibling;
    if (sibling) {
      sibling.classList.remove("border-white/75", "scale-105");
      sibling.classList.add("border-transparent");
    }
  };

  return (
    <span className="relative h-36 w-36 rounded-full">
      <img
        src={image.image}
        alt={image.alt}
        className="object-cover inset-0 w-full h-full z-10 rounded-full transition-all duration-300 hover:shadow-xlb hover:scale-105"
        onMouseOver={handleOnMouseOver}
        onMouseOut={handleOnMouseOut}
      />
      <div className="absolute border-transparent w-full h-full top-0 border-4 rounded-full box-border z-20 transition-all duration-300 pointer-events-none" />
    </span>
  );
};

export default CardProfile;
