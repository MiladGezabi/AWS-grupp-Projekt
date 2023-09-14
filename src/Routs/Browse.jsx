import axios from "axios";
import { useState, useEffect } from "react";

function Browse() {
  const [data, setData] = useState([]);
  const [isData, setIsData] = useState(false)

  useEffect(() => {
    
    const url = 'https://1k5gjm0ree.execute-api.eu-north-1.amazonaws.com/test/s3fetch';

    
    axios.get(url)
      .then((response) => {
<<<<<<< HEAD
        setData(response); 
        console.log(data)
=======
        setData(response.data.body); 
>>>>>>> b644d32fa2171c46140b07cfed82074755dca0a8
      })
      .catch((error) => {
        console.error('There was a problem with the Axios request:', error);
      });
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      console.log(data.length);
      data.forEach((item) => (
        console.log(item),
        console.log("https://spicypants-s3bucket.s3.eu-north-1.amazonaws.com/" + item.Key)
      ));
      setIsData(true)
    }
  }, [data]);

  return(
    <section className="browse-section">
      <div className="search-filter">
        <h2>Browse</h2>
        <input type="date" />
      </div>

      <div className="picture-container">
        {isData && data.map((img, index) => (
          <img key={index} src={"https://spicypants-s3bucket.s3.eu-north-1.amazonaws.com/" + img.Key} />

        ))}
      </div>
    </section>
  )
}

export default Browse

