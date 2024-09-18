import React, { useState } from "react";
import "./App.css";
const App = () => {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Posted, setPosted] = useState("");
  const [img, setImg] = useState("");
  const [Search, setSearch] = useState("");
  const [Alldata, setAlldata] = useState([
    {
      Title: "img",
      Description: "this is img",
      Posted: "anand",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAHwOPRt53LyND40n_W5Ryz93I4JQfWzUBhQ&s",
    },
  ]);

  const handeldata = (e) => {
    e.preventDefault();

    let data = {
      Title,
      Description,
      Posted,
      img,
    };
    console.log(data);
  };
  console.log(Search);

  return (
    <React.Fragment>
      <br />
      <br />
      <div className="form-group">
        <input
          type="text"
          class="form-control"
          placeholder="Search"
          value={Search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <hr />
      <form className="div" onSubmit={handeldata}>
        <div class="form-group">
          <label for="exampleInputEmail1">Title</label>
          <input
            type="text"
            class="form-control"
            placeholder="Enter title"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">description</label>
          <input
            type="text"
            class="form-control"
            placeholder="Enter description"
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Posted by</label>
          <input
            type="text"
            class="form-control"
            placeholder="Enter Posted by name"
            value={Posted}
            onChange={(e) => setPosted(e.target.value)}
          />
        </div>
        <form>
          <div class="form-group">
            <label for="exampleFormControlFile1">Choose your profile</label>
            <input
              type="file"
              class="form-control-file"
              value={img}
              onChange={(e) => setImg(e.target.value)}
            />
          </div>
        </form>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
      <div>
        <table>
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">S.No.</th>
                <th scope="col">Title</th>
                <th scope="col">description</th>
                <th scope="col">Posted by</th>
                <th scope="col">img</th>
              </tr>
            </thead>
            {Alldata.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.Title}</td>
                <td>{item.Description}</td>
                <td>{item.Posted}</td>
                <td>{<img src={item.img} alt="Flowers in Chania" />}</td>
              </tr>
            ))}
          </table>
        </table>
      </div>
    </React.Fragment>
  );
};
export default App;
