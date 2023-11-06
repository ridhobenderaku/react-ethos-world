import React, { useRef, useEffect } from "react";
import Slider from "react-slick";
import getBanner from "../../api/bannerAPI";
import { useState } from "react";

const dataSlider = [
  "img/banner/slogan.png",
  "img/banner/meeting.png",
  "img/banner/training.png",
];

function SliderBanner() {
  const slider = useRef();
  const [dataBanner, setDataBanner] = useState(null);
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  const slideLeft = () => {
    slider.current.slickPrev();
  };

  const slideRight = () => {
    slider.current.slickNext();
  };

  useEffect(() => {
    getBanner().then((resp) => {
      if (resp) setDataBanner(resp);
    });
  }, []);

  return (
    <div className="position-relative h-100">
      <h2
        style={{
          backgroundColor: "#619A3F",
          zIndex: "10",
          left: "0",
          right: "0",
          color: "white",
          width: "fit-content",
          borderRadius: "0px 0px 30px 30px",
        }}
        className=" p-2 position-absolute mx-auto "
      >
        Ethos Daily
      </h2>
      <img
        onClick={slideRight}
        src="img/icon/arrowLeft.svg"
        className="position-absolute my-auto arrow arrow-right"
      />
      <img
        onClick={slideLeft}
        src="img/icon/arrowRight.svg"
        className="position-absolute my-auto arrow arrow-left"
      />
      <Slider className="slider" {...sliderSettings} ref={slider}>
        {dataBanner &&
          dataBanner.map((data, index) => (
            <div key={index} className="w-100 h-100 position-relative">
              <div className="slider-overlay" />
              <div
                onClick={() => {
                  window.open(
                    `https://ethosworld.co.id/ethosdaily/${btoa(data.slugnya)}`,
                    "_blank"
                  );
                }}
                style={{ color: "white" }}
                className="position-absolute w-100 h-100 d-flex flex-column justify-content-end p-4 slider-content"
              >
                <h1>{data.judulnya}</h1>
                <p>{data.tgl}</p>
              </div>

              <img
                src={data.gambarnya}
                className="slider-img"
                alt="User Image"
              />
            </div>
          ))}
      </Slider>
    </div>
  );
}

export default SliderBanner;
