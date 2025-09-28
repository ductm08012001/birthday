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
    `Hôm  nay  là  ngày  mà  em  bé  của  anh  lớn  thêm  1  tuổi.
     Và  cũng  là  năm  sinh  nhật  đầu  tiên  mình  có  nhau.  Cảm  ơn  em  bé  vì  đã
     đến  với  anh,  hong  chê  anh  :>  Mặc  dù  anh  hay  làm  em  quạo,  em  bùn,  em  giận
     nhưng  mà  em  bé  vẫn  tha  lỗi  cho  anh.  Cái  này  là  lần  đầu  tiên  anh  làm  lun,  nên  nó  sẽ  hơi  "Miền  tây"  =)))
     hơi  sến  nhưng  mà  a  ráng  lắm  ó,  nên  em  bé  mà  chê  là  anh  nghĩ  quẩn  ó...
     Anh  chúc  vợ  iu  tuổi  mới,  xinh  đẹp  hơn  nữa  (dù  em  quá  trời  đẹp  sẵn  òi)
     và  ngày  càng  vui  vẻ  hơn.  Anh  sẽ  bù  đắp  lại  cho  em  bé,  những  gì  em  bé 
     xứng  đáng  được  nhận  anh  sẽ  cố  gắng  lo  cho  em  bé.  Văn  anh  lủng  củng 
     anh  viết  được  tới  đây  thui,  anh  snghi  cũng  lâu  dữ  lắm  mới  ra  được  nhiu 
      đây  chữ  ó  em  bé.  Chúc  em  bé  sinh  nhật  vui  vẻ  nhoo.  Anh  thương  em  nhìu  và  cũng  yêu  em  bé  nhìuuuuu`,
  ];

  return (
    <div ref={containerRef} className="space-y-6">
      {paragraphs.map((para, i) => (
        <p key={i} className="text-lg text-[#475467] leading-relaxed">
          {para.split(" ").map((word, j) => (
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
