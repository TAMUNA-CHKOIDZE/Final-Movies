import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import PopularCard from "../popularCard/PopularCard";
import styles from "./PopularCarousel.module.css";
import "react-loading-skeleton/dist/skeleton.css";

const PopularCarousel = ({ movies, isLoading }) => {
  const slides = isLoading
    ? Array.from({ length: 9 }).map((_, i) => (
        <SwiperSlide key={i}>
          <PopularCard isLoading />
        </SwiperSlide>
      ))
    : movies.map((movie) => (
        <SwiperSlide key={movie.id}>
          <PopularCard movie={movie} />
        </SwiperSlide>
      ));

  return (
    <Swiper
      spaceBetween={48}
      className={styles.swiper}
      pagination={{ clickable: true }}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 40,
        },
      }}
      modules={[Pagination]}
    >
      {slides}
    </Swiper>
  );
};

export default PopularCarousel;




