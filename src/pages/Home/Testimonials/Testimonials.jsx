import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import {API} from "../../../../config.js";


const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch(`${API}/reviews`)
        .then(res => res.json())
        .then(data => setReviews(data))
    }, []);
    return (
        <section>
            <SectionTitle heading={"Testimonials"} subHeading={"What Our Client Say"} />
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {
                    reviews.map(review => <SwiperSlide key={review._id}>
                        <div className="flex flex-col items-center mx-24 my-16">
                            <Rating style={{ maxWidth: 250 }} value={review.rating} readOnly="true" />
                            <p className="my-8">{review.details}</p>
                            <h3 className="text-2xl text-orange-400">{review.name}</h3>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </section>
    );
};

export default Testimonials;