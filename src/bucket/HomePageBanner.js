import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import {
  EffectCoverflow,
  Autoplay,
  Pagination,
  Navigation,
} from "swiper/modules";
const HomePageBanner = ({title, description, images, enableLinks}) => {
  return (
    <div className="homeBanner" >
     <div className="">
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              loop={true}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              loopedSlides={images?.length}
              slidesPerView={"auto"}
              coverflowEffect={{
                rotate: 0,
                stretch: 10,
                depth: 100,
                modifier: 3.5,
              }}
              // pagination={{ el: ".swiper-pagination", clickable: true }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
                clickable: true,
              }}
              modules={[  EffectCoverflow,
  Autoplay,
  Pagination,
  Navigation,  ]}
              className="swiper_container"
            >
              {!!images?.length && images.map((item, i) => (
                <SwiperSlide key={i}>
               <img src={item} alt="banner" onContextMenu={(e) => e.preventDefault()} />
                </SwiperSlide>
              ))} 
            </Swiper>
          </div>







      {/* <div className="homeBannerOverlay"></div> */}
      {/* <img src="/homeBanner1.jpg" alt="banner" className='homeBannerImg' /> */}
      <div className="homeBannerContainer">
        <h2>{title}</h2>
        <h5 className="homeBannerContainerText">{description}</h5>
       {enableLinks && <div className="homeBannerContainerBtnContainer">
          <Link to='/property' className="btn">View Properties</Link>
        </div>}
      </div>
    </div>
  );
};

export default HomePageBanner;
