'use client';

import SimpleImageSlider from 'react-simple-image-slider';

type SliderOptions = {
  useGPURender: boolean;
  showNavs: boolean;
  showBullets: boolean;
  loop: boolean;
  autoPlay: boolean;
  autoPlayDelay: number;
  startIndex: number;
  navStyle: 1 | 2;
  navSize: number;
  navMargin: number;
  duration: number;
  bgColor: string;
};

export default function Slider({ urlArr }: { urlArr: string[] }) {
  const images: { url: string }[] = urlArr.map((path) => {
    return { url: path };
  });

  return <SimpleImageSlider width={360} height={480} images={images} showBullets={true} showNavs={true} />;
}
