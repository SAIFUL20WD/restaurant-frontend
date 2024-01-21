import orderCover from "../../../assets/shop/banner2.jpg";
import { Helmet } from 'react-helmet-async';
import Cover from "../../Shared/Cover/Cover";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState } from "react";
import useMenu from "../../../hooks/useMenu";
import OrderTab from "../OrderTab/OrderTab";
import {useParams} from "react-router-dom";

const Order = () => {
    const categories = ["salad", "pizza", "soup", "dessert", "drinks"];
    const {category} = useParams();
    const initialIndex = categories.indexOf(category);
    const [tabIndex, setTabIndex] = useState(initialIndex);
    
    const [menu] = useMenu();

    const dessert = menu.filter(item => item.category === "dessert");
    const soup = menu.filter(item => item.category === "soup");
    const salad = menu.filter(item => item.category === "salad");
    const pizza = menu.filter(item => item.category === "pizza");
    const drinks = menu.filter(item => item.category === "drinks");

    return (
        <div>
            <Helmet>
                <title>Bistro | Shop</title>
            </Helmet>

            <Cover imgURL={orderCover} title={"Order Food"}/>

            <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
            <TabList>
                <Tab>Salad</Tab>
                <Tab>Pizza</Tab>
                <Tab>Soup</Tab>
                <Tab>Dessert</Tab>
                <Tab>Drinks</Tab>
            </TabList>
            <TabPanel><OrderTab items={salad}/></TabPanel>
            <TabPanel><OrderTab items={pizza}/></TabPanel>
            <TabPanel><OrderTab items={soup}/></TabPanel>
            <TabPanel><OrderTab items={dessert}/></TabPanel>
            <TabPanel><OrderTab items={drinks}/></TabPanel>
            </Tabs>
        </div>
    );
};

export default Order;