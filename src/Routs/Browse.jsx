import axios from "axios";
import { useState, useEffect } from "react";

function Browse() {
  const [data, setData] =useState([])

  useEffect(() => {
    
    const url = 'https://1k5gjm0ree.execute-api.eu-north-1.amazonaws.com/test/s3fetchmanager';

    
    axios.get(url)
      .then((response) => {
        setData(response.data); 
        console.log(data)
      })
      .catch((error) => {
        console.error('There was a problem with the Axios request:', error);
      });
  }, []);

  return(
    <section className="browse-section">
      <div className="search-filter">
        <h2>Browse</h2>
        <input type="date" />
      </div>

      <div className="picture-container">

      </div>
    </section>
  )
}

export default Browse