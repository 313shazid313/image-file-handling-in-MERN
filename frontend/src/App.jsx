import { useEffect, useState } from "react";
import axios from "axios";
import "./app.css";

function App() {
  const [image, setImage] = useState();
  const [allImage, setAllImage] = useState([]);

  useEffect(() => {
    getImage();
  }, []);

  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image);

    axios
      .post("http://localhost:8000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        console.log(formData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onInputChange = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const getImage = async () => {
    const result = await axios.get("http://localhost:8000/pics");
    console.log("i am topg", result);
    setAllImage(result.data.data);
  };

  return (
    <div className="all">
      <form onSubmit={submitImage}>
        <input type="file" onChange={onInputChange} accept="image/*" />
        <button type="submit">Submit</button>
      </form>
      <br /><br /> <hr />
      {allImage == null
        ? ""
        : allImage.map((data, topg) => {
            return (
              <div>
                <img
                  key={topg}
                  src={`http://localhost:8000/pics/${data.image}`}
                />
                {console.log(`http://localhost:8000/pics/${data.image}`)}
              </div>
            );
          })}
    </div>
  );
}

export default App;
