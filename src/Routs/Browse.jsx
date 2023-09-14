import axios from "axios";
import { useState, useEffect } from "react";

function Browse() {
  const [data, setData] = useState([]);
  const [isData, setIsData] = useState(false);
  const [sort, setSort] = useState("Latest");

  function sortByLatestUploadDate() {
    const sortedData = [...data].sort(
      (a, b) => {
        const dateA = parseInt(a.Metadata.uploaddate.replace("-", ""), 10)
        const dateB = parseInt(a.Metadata.uploaddate.replace("-", ""), 10)
        
        return dateA - dateB
    
      });
      console.log(sortedData);
  }


  function handleSort() {
    if (sort === "Latest") {
      const sortedItemsLatestFirst = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
      console.log(sortedItemsLatestFirst)
    } else if (sort === "Oldest") {
      const sortedItemsEarliestFirst = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
      console.log(sortedItemsEarliestFirst)
    }
  }
  useEffect(() => {
    const url =
      "https://1k5gjm0ree.execute-api.eu-north-1.amazonaws.com/test/s3fetch";

    axios
      .get(url)
      .then((response) => {
        setData(response.data.body);
      })
      .catch((error) => {
        console.error("There was a problem with the Axios request:", error);
      });
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      console.log(data.length);
      // data.forEach(
      //   (item) => (
      //     console.log(item),
      //     console.log(
      //       "https://spicypants-s3bucket.s3.eu-north-1.amazonaws.com/" +
      //         item.Key
      //     )
      //   )
      // );
      setIsData(true);
    }
  }, [data]);

  return (
    <section className="browse-section">
      <div className="search-filter">
        <h2>Browse</h2>
        <button className="sorting" onClick={() => so()}>
          {sort}
        </button>
      </div>

      <div className="picture-container">
        {isData &&
          data.map((img, index) => (
            <figure key={index}>
              <p className="date">{img.Metadata.uploaddate}</p>
              <img
                src={
                  "https://spicypants-s3bucket.s3.eu-north-1.amazonaws.com/" +
                  img.Key
                }
              />

              <p className="description">{img.Metadata.description}</p>
            </figure>
          ))}
      </div>
    </section>
  );
}

export default Browse;
