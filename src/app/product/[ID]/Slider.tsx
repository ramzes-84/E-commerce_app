'use client';

import { useState } from 'react';
import SimpleImageSlider from 'react-simple-image-slider';

export default function Slider({ urlArr }: { urlArr: string[] }) {
  const images: { url: string }[] = urlArr.map((path) => {
    return { url: path };
  });

  const [popupVisible, setPopupVisible] = useState(false);

  function showPopup() {
    setPopupVisible(true);
  }

  function closePopup() {
    setPopupVisible(false);
  }

  return (
    <>
      <SimpleImageSlider
        width={360}
        height={480}
        images={images}
        showBullets={images.length > 1 ? true : false}
        showNavs={images.length > 1 ? true : false}
        style={{ position: 'relative', borderRadius: '15px', cursor: 'pointer' }}
        onClick={showPopup}
      />
      <div className={popupVisible ? 'absolute top-6 shadow-2xl' : 'hidden'}>
        <SimpleImageSlider
          width={600}
          height={800}
          images={images}
          showBullets={images.length > 1 ? true : false}
          showNavs={images.length > 1 ? true : false}
          style={{ marginTop: '10px' }}
          onClick={closePopup}
        />
      </div>
    </>
  );
}
