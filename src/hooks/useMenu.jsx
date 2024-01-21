// import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {API} from "../../config.js";

const useMenu = () => {
    // const [menu, setMenu] = useState([]);
    // const [loading, setLoading] = useState(true);
    
    // useEffect(() => {
    //     fetch(`${API}/menu`)
    //     .then(res => res.json())
    //     .then(data => {
    //         setMenu(data);
    //         setLoading(false);
    //     })
    // }, []);

    const {data: menu = [], isLoading: loading, refetch} = useQuery({
        queryKey: ["menu"],
        queryFn: async () => {
            const res = await fetch(`${API}/menu`)
            return res.json();
        }
    })

    return [menu, loading, refetch];
}

export default useMenu;