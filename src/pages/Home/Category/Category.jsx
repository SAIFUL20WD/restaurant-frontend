import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import slideImg1 from "../../../assets/home/slide1.jpg";
import slideImg2 from "../../../assets/home/slide2.jpg";
import slideImg3 from "../../../assets/home/slide3.jpg";
import slideImg4 from "../../../assets/home/slide4.jpg";
import slideImg5 from "../../../assets/home/slide5.jpg";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";


const Category = () => {
    return (
        <section>
            <SectionTitle heading={"Order Online"} subHeading={"From 11.00am to 10.00pm"} />
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper mb-24 max-w-screen-lg"
                >
                <SwiperSlide>
                    <img src={slideImg1} alt="" />
                    <h3 className="text-4xl uppercase text-center -mt-16 text-white">Salads</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slideImg2} alt="" />
                    <h3 className="text-4xl uppercase text-center -mt-16 text-white">Pizzas</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slideImg3} alt="" />
                    <h3 className="text-4xl uppercase text-center -mt-16 text-white">Soups</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slideImg4} alt="" />
                    <h3 className="text-4xl uppercase text-center -mt-16 text-white">Desserts</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slideImg5} alt="" />
                    <h3 className="text-4xl uppercase text-center -mt-16 text-white">Salads</h3>
                </SwiperSlide>
            </Swiper>
        </section>
    );
};

export default Category;