"use client";
import Fireworks from "fireworks-js";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import FallingText from "./FallingText";
import HeartFlip from "./HeartFlip";

export default function BackgroundGallery() {
  const colRefs = useRef<HTMLDivElement[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  const handleRenderStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <HeartFlip />
            <p className="text-[32px] mt-2">Happy Birthday</p>
            <p className="font-carattere text-[120px] text-[#424242]">
              Trương Thảo Vy
            </p>
            <p className="text-[24px] font-carattere text-[#696969]">
              30/09/2002
            </p>
          </>
        );

      case 1:
        return (
          <>
            <Image
              src={"/dino01.png"}
              alt="dino"
              width={250}
              height={250}
              className="absolute -top-32 -right-32 moveUpDown"
            />
            <Image
              src={"/gifts1.png"}
              alt="gifts"
              width={250}
              height={250}
              className="absolute -bottom-32 -left-32 moveUpDown delay-1000"
            />
            <div className="flex flex-col px-6  items-center  justify-center">
              <p className="font-carattere text-[72px] text-[#424242]">
                Anh chúc em bé
              </p>
              <FallingText />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <p className="font-carattere text-[72px] text-[#424242]">
              Love youuuuuu
            </p>
          </>
        );
    }
  };
  const handleClick = () => {
    if (!sectionRef.current || !canvasRef.current) return;

    const fireworks = new Fireworks(canvasRef.current, {
      particles: 150,
      acceleration: 1.05,
      friction: 0.95,
      gravity: 1.5,
      hue: { min: 0, max: 360 },
      delay: { min: 10, max: 30 },
      brightness: { min: 50, max: 100 },
      decay: { min: 0.015, max: 0.03 },
    });

    const tl = gsap.timeline();
    if (step === 1) {
      tl.to(cardRef.current, {
        scale: 0,
        duration: 2,
        ease: "power1.inOut",
      });
    }

    tl.to(sectionRef.current, {
      opacity: 0,
      duration: 3,
      ease: "power1.inOut",
      onStart: () => {
        fireworks.start();
      },
      onComplete: () => {
        setStep((prev) => prev + 1);
      },
    })
      .to({}, { duration: 5 })
      .to(sectionRef.current, {
        opacity: 1,
        duration: 1,
        ease: "power1.inOut",
        onComplete: () => {
          fireworks.stop();
        },
      });
    if (step === 1) {
      tl.to(cardRef.current, {
        scale: 1,
        duration: 2,
        ease: "power1.in",
      });
    }
  };

  useEffect(() => {
    colRefs.current.forEach((col, i) => {
      if (!col) return;

      const colHeight = col.scrollHeight / 2;
      const direction = i % 2 === 0 ? 1 : -1;
      const wrapper = gsap.utils.wrap(-colHeight * 1.5, colHeight * 1.5);
      gsap.fromTo(
        col,
        {
          y: direction === 1 ? 0 : -colHeight,
        },
        {
          y: direction === 1 ? -colHeight : 0,
          duration: 40,
          ease: "none",
          repeat: -1,
          modifiers: {
            y: gsap.utils.unitize(wrapper),
          },
        }
      );
    });
  }, []);

  const columns = [
    ["/frame_1.png", "/frame_6.png", "/frame_1.png"],
    ["/frame_2.png", "/frame_5.png", "/frame_2.png"],
    ["/frame_3.png", "/frame_4.png", "/frame_3.png"],
    ["/frame_4.png", "/frame_3.png", "/frame_4.png"],
    ["/frame_5.png", "/frame_2.png", "/frame_5.png"],
    ["/frame_6.png", "/frame_1.png", "/frame_6.png"],
  ];

  const heart = [
    "/topleft.png",
    "/topcenter.png",
    "/topright.png",
    "/midleft.png",
    "/midcenter.png",
    "/midright.png",
    "/bottomleft.png",
    "/bottomcenter.png",
    "/bottomright.png",
  ];

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-[5]"
      />
      <div ref={sectionRef} className="relative w-full h-full opacity-100">
        <div className="absolute inset-0  bg-white/33  z-[1] blur-3xl" />
        <div className="flex rotate-[20deg] translate-x-14 -translate-y-1/2 w-[120vw] h-[110vh]">
          {columns.map((imgs, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) colRefs.current[i] = el;
              }}
              className="flex-1 flex flex-col"
              // style={{ transform: "rotate(20deg)" }} // nghiêng 20 độ
            >
              {[...imgs, ...imgs].map((src, j) => (
                <img
                  key={j}
                  src={src}
                  className="aspect-[291/1180] object-cover w-full flex-shrink-0"
                  alt={`bg-${i}-${j}`}
                />
              ))}
            </div>
          ))}
        </div>
        <div
          ref={cardRef}
          className="absolute flex flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[940px] max-h-[566px] w-full h-full rounded-[30px] bg-gradient-to-br from-[#F9F8FE] via-[#E2E0FB] to-[#E2E0FB]  z-[2]  items-center justify-center"
          onClick={handleClick}
        >
          {handleRenderStep()}
        </div>
      </div>
    </div>
  );
}
