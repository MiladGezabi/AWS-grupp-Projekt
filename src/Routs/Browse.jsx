import axios from "axios";
import { useState, useEffect } from "react";

function Browse() {
  const [data, setData] = useState([]);
  const [isData, setIsData] = useState(false);
  const [sort, setSort] = useState("Latest");
  const [sortedArray, setSortedArray] = useState([]); // Skapa en tom array som börjar med []
  const [showSortedData, setShowSortedData] = useState(false); // Visa sorterad data eller ej

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
      setIsData(true);
    }
  }, [data]);

  function sortByOldestUploadDate() {
    // Sortera datan
    const sorted = [...data].sort((a, b) =>
      Number(a.Metadata.uploaddate.replaceAll("-", "")) -
      Number(b.Metadata.uploaddate.replaceAll("-", ""))
    );

    // Uppdatera sortedArray
    setSortedArray(sorted);
    setShowSortedData(true); // Visa sorterad data när den är klar att användas
  }

  function sortByLatestUploadDate() {
    // Sortera datan
    const sorted = [...data].sort((a, b) =>
      Number(b.Metadata.uploaddate.replaceAll("-", "")) -
      Number(a.Metadata.uploaddate.replaceAll("-", ""))
    );

    // Uppdatera sortedArray
    setSortedArray(sorted);
    setShowSortedData(true); // Visa sorterad data när den är klar att användas
  }

  return (
    <section className="browse-section">
      <div className="search-filter">
        <h2>Browse</h2>
        <button className="sorting" onClick={
          () => (sortByOldestUploadDate())
          }>
          {'Äldst först'}
        </button>
        <button className="sorting" onClick={
          () => (sortByLatestUploadDate())
          }>
          {'Senaste först'}
        </button>
      </div>

      <div className="picture-container">
        {isData &&
          (showSortedData ? sortedArray : data).map((img, index) => (
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
