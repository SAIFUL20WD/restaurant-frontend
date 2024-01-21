import { Helmet } from 'react-helmet-async';
import Cover from "../../Shared/Cover/Cover";
import menuImg from "../../../assets/menu/banner3.jpg";
import dessertImg from "../../../assets/menu/dessert-bg.jpeg";
import pizzaImg from "../../../assets/menu/pizza-bg.jpg";
import saladImg from "../../../assets/menu/salad-bg.jpg";
import soupImg from "../../../assets/menu/soup-bg.jpg";
import useMenu from "../../../hooks/useMenu";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";

const Menu = () => {
    const [menu] = useMenu();
    const dessert = menu.filter(item => item.category === "dessert");
    const soup = menu.filter(item => item.category === "soup");
    const salad = menu.filter(item => item.category === "salad");
    const pizza = menu.filter(item => item.category === "pizza");
    const offered = menu.filter(item => item.category === "offered");
    
    return (
        <div>
            <Helmet>
                <title>Bistro | Menu</title>
            </Helmet>
            <Cover imgURL={menuImg} title="Our Menu"/>
            <SectionTitle heading="Today's Offer" subHeading="Don't Miss" />
            <MenuCategory items={offered} />
            <MenuCategory items={dessert} coverImg={dessertImg} title={"dessert"}/>
            <MenuCategory items={pizza} coverImg={pizzaImg} title={"pizza"}/>
            <MenuCategory items={salad} coverImg={saladImg} title={"salad"}/>
            <MenuCategory items={soup} coverImg={soupImg} title={"soup"}/>
        </div>
    );
};

export default Menu;