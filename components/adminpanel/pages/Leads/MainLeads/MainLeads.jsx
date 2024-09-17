"use client"

import LeadCard from "../LeadCard/LeadCard";
import { useState, useEffect } from 'react';
import {API_URL} from "@/config";



const MainLeads = () => {
    const [data, setData] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    async function fetchData() {
        const res = await fetch(`/api/application/getAll`, {
            method: "GET"
        })
        const categoryData = await res.json();
        setData(categoryData.applications);
    }

    async function updateData(id) {
      console.log(id)
      const data = { id: id, status: "done" };
      const res = await fetch(`/api/application/update`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(response => response.json())
      .then(json => console.log(json))
      .then(() => fetchData())
      // .catch(error => console.error(error));
    }
  
    useEffect(() => {
        fetchData();
    }, []);

    console.log(data)
    return (
      <div>
        {
          data.map((item) => (
            <LeadCard id={item.id} name={item.name} phone={item.phone} update={updateData}/>
          ))
        }
      </div>
    )
}

export default MainLeads;