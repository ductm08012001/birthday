"use client";
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import gsap from "gsap";

export type FallingTextRef = {
  isFinished: boolean;
};

type Props = {
  onFinish?: () => void;
};

const FallingText = forwardRef<FallingTextRef, Props>(({ onFinish }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const finishedRef = useRef(false);

  useImperativeHandle(ref, () => ({
    get isFinished() {
      return finishedRef.current;
    },
  }));

  useEffect(() => {
    if (!containerRef.current) return;

    const words = containerRef.current.querySelectorAll("span");

    gsap.fromTo(
      words,
      { y: -100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.3,
        ease: "bounce.out",
        stagger: 0.05,
        onComplete: () => {
          finishedRef.current = true;
          onFinish?.(); 
        },
      }
    );
  }, [onFinish]);

  const paragraphs = [
    `Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum,
    nulla odio nisl vitae. In aliquet pellentesque aenean hac
    vestibulum turpis mi bibendum diam. Tempor integer aliquam in
    vitae malesuada fringilla.`,

    `Elit nisi in eleifend sed nisi. Pulvinar at orci, proin
    imperdiet commodo consectetur convallis risus. Sed condimentum
    enim dignissim adipiscing faucibus consequat, urna. Viverra
    purus et erat auctor aliquam. Risus, volutpat vulputate posuere
    purus sit congue convallis aliquet. Arcu id augue ut feugiat
    donec porttitor neque. Mauris, neque ultricies eu vestibulum,
    bibendum quam lorem id. Dolor lacus, eget nunc lectus in tellus,
    pharetra, porttitor.`,

    `Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim
    mauris id. Non pellentesque congue eget consectetur turpis.
    Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt
    aenean tempus. Quis velit eget ut tortor tellus. Sed vel, congue
    felis elit erat nam nibh orci.`,
  ];

  return (
    <div ref={containerRef} className="space-y-6">
      {paragraphs.map((para, i) => (
        <p key={i} className="text-lg text-[#475467] leading-relaxed">
          {para.split("").map((word, j) => (
            <span key={j} className="inline-block mr-0.5">
              {word}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
});

FallingText.displayName = "FallingText";
export default FallingText;
