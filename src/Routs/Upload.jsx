import { useState } from "react";

function Upload() {
  const [imgFile, setImgFile] = useState(null);
  const [text, setText] = useState("");
  const [test, setTest] = useState(null)
  const [imgBuffer, setImgBuffer] = useState(null);
  const url = 'https://1k5gjm0ree.execute-api.eu-north-1.amazonaws.com/test/s3uploadmanager'

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImgFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const buffer = event.target.result;
        setImgBuffer(buffer);

        // Konvertera bildbuffern till en Base64-sträng
        const base64String = btoa(
        new Uint8Array(buffer).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );

      // Spara Base64-strängen i test.fileData
      const updatedTest = {
        ...test,
        fileData: base64String,
      };

      setTest(updatedTest);
      console.log(updatedTest)
        
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); 
    const day = String(currentDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;


    const formData = new FormData();
    if (imgBuffer) {
      formData.append("image", new Blob([imgBuffer], { type: imgFile.type }));
    }
    formData.append("text", text);
    formData.append("date", formattedDate);

    const payload = {
      fileName: imgFile.name,
      fileData: test.fileData
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log("Datan är uppladad");
      } else {
        console.error("Error laddar upp data");
      }
    } catch (error) {
      console.error("oops gick inte:", error);
    }
  };

  const handleHover=() => {
    const obs=document.querySelector(".obs")
    obs.classList.toggle("visible")
  }

  return (
    <section className="upload-section">
      <h2>Upload</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="img"
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        >Select image
        <span className="span">* 
          <p className="obs">only image files are accepted
          </p> 
          </span>
        </label>
        <input
          type="file"
          id="img"
          name="img"
          accept="image/*"
          onChange={handleFileChange}
        />
        <label htmlFor="text">Describe image*</label>
        <textarea
          name="text"
          id="text"
          cols="30"
          rows="10"
          onChange={handleTextChange}
        />
        <button type="submit">Upload</button>
      </form>
    </section>
  );
}

export default Upload;
