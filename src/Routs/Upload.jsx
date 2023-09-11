

function Upload() {

  return(
    <section className="upload-section">
      <h2>Upload</h2>
      <form action="">
        <label htmlFor="img">Select image*</label>
        <input type="file" id="img" name="img" accept="image/*" />
        <label htmlFor="text">Describe image*</label>
        <textarea name="text" id="text" cols="30" rows="10" />
        <button>Upload</button>
      </form>
    </section>
  )
}

export default Upload