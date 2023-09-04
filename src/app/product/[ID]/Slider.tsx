'use client';

import { useState } from 'react';
import SimpleImageSlider from 'react-simple-image-slider';
import FsLightbox from 'fslightbox-react';

export default function Slider({ urlArr }: { urlArr: string[] }) {
  const images: { url: string }[] = urlArr.map((path) => {
    return { url: path };
  });

  const [toggler, setToggler] = useState(false);

  return (
    <>
      <SimpleImageSlider
        width={360}
        height={480}
        images={images}
        showBullets={images.length > 1 ? true : false}
        showNavs={images.length > 1 ? true : false}
        style={{ position: 'relative', borderRadius: '15px', cursor: 'pointer' }}
        onClick={() => setToggler(!toggler)}
      />
      <FsLightbox toggler={toggler} sources={urlArr} />
    </>
  );
}
