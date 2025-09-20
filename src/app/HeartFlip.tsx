import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

const HeartFlip = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.to(cardRef.current, {
      rotationY: 180,
      duration: 1,
      repeat: -1,
      yoyo: true,
      repeatDelay: 3,
      transformOrigin: "50% 50%",
      ease: "power1.inOut",
    });
  }, []);

  return (
    <div className="relative w-[265px] h-[236px] perspective-1000">
      <div ref={cardRef} className="relative w-full h-full transform-style-3d">
        <Image
          src="/heartImage.png"
          alt="heart"
          width={265}
          height={236}
          className="absolute inset-0 backface-hidden"
        />
        <Image
          src="/heartColor.png"
          alt="heart"
          width={265}
          height={236}
          className="absolute inset-0 rotate-y-180 backface-hidden"
        />
      </div>
    </div>
  );
};

export default HeartFlip;
