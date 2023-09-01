'use client';

import SimpleImageSlider from 'react-simple-image-slider';

export default function Slider({ urlArr }: { urlArr: string[] }) {
  const images: { url: string }[] = urlArr.map((path) => {
    return { url: path };
  });

  return (
    <SimpleImageSlider
      width={360}
      height={480}
      images={images}
      showBullets={images.length > 1 ? true : false}
      showNavs={images.length > 1 ? true : false}
      style={{ position: 'relative', borderRadius: '15px' }}
    />
  );
}
