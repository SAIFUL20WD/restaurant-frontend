import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImg from "../../../assets/home/featured.jpg";
import "./Featured.css";

const Featured = () => {
    return (
        <div className="featured-item bg-fixed text-white pt-8 my-20">
            <SectionTitle heading={"Check It Out"} subHeading={"Featured Item"} />
            <div className="md:flex justify-center items-center py-20 px-36">
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div className="md:ml-10">
                    <p>Aug 2023</p>
                    <p className="uppercase">Where can i get some?</p>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla illo voluptate hic, temporibus deserunt corporis reprehenderit facilis nam pariatur! Ipsum eius temporibus eligendi qui saepe consequuntur, eveniet modi nemo iste assumenda. Cupiditate officia eius laborum doloribus, velit voluptatem sunt ut perspiciatis accusamus veniam assumenda aliquam rerum odio dolorem non architecto?</p>
                    <button className="btn btn-outline border-0 border-b-4">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;