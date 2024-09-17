import ReviewItem from './ReviewItem';
import { useState, useEffect } from 'react';
import {API_URL} from "@/config";



const MainReview = () => {
    const [items, setItems] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    async function fetchData() {
        // const data = { type: "all" };
        const res = await fetch(`/api/reviews/?type=all`, {
            method: "GET"
        })
        const categoryData = await res.json();
        setItems(categoryData.data);
    }


  
    useEffect(() => {
        fetchData();
    }, []);

    return (
      <div>
        {
          items?.map((item) => (
            <ReviewItem key={item.id} data={item} reviews={items} setReviews={setItems} />
          ))
        }
      </div>
    )
}

export default MainReview;