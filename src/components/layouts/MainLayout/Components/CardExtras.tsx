import React, { useEffect, useState } from 'react';

import { Video } from "@/types/types";

const CardExtras = ({ video }: { video: Video }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?id=${video.key}&key=AIzaSyCGgAzS5GT3Mq_jnjzcm_r7pRMnHUW7OV8&part=snippet`
        );

        const data = await response.json();
        const thumbnailUrl = data.items[0].snippet.thumbnails.medium.url;
        setThumbnailUrl(thumbnailUrl);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de la vidéo:', error);
      }
    };

    fetchVideoDetails();
  }, [video.key]);

  const handleCardClick = () => {
    window.open(`https://www.youtube.com/watch?v=${video.key}`, "_blank");
  };

  const handleOnMouseOver = (e: React.MouseEvent<HTMLImageElement>) => {
    const sibling = e.currentTarget.nextElementSibling as HTMLElement;
    if (sibling) {
      sibling.classList.add("border-white/75", "scale-105");
      sibling.classList.remove("border-transparent");
    }
  };

  const handleOnMouseOut = (e: React.MouseEvent<HTMLImageElement>) => {
    const sibling = e.currentTarget.nextElementSibling as HTMLElement;
    if (sibling) {
      sibling.classList.remove("border-white/75", "scale-105");
      sibling.classList.add("border-transparent");
    }
  };

  return (
    <div onClick={handleCardClick} className='cursor-pointer'>
      <div className="relative">
        <img
          src={thumbnailUrl}
          alt={video.name}
          className="object-cover inset-0 w-full h-full z-10 rounded transition-all duration-300 hover:shadow-xlb hover:shadow-black shadow-3lg hover:scale-105"
          onMouseOver={handleOnMouseOver}
          onMouseOut={handleOnMouseOut}
        />
        <div className="absolute border-transparent w-full h-full top-0 border-4 rounded box-border z-20 transition-all duration-300 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default CardExtras;
