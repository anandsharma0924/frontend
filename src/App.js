// import React, { useState } from "react";
// import "./App.css";
// const App = () => {
//   const [Title, setTitle] = useState("");
//   const [Description, setDescription] = useState("");
//   const [Posted, setPosted] = useState("");
//   const [img, setImg] = useState("");
//   const [Search, setSearch] = useState("");
//   const [Alldata, setAlldata] = useState([
//     {
//       Title: "img",
//       Description: "this is img",
//       Posted: "anand",
//       img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAHwOPRt53LyND40n_W5Ryz93I4JQfWzUBhQ&s",
//     },
//   ]);

//   const handeldata = (e) => {
//     e.preventDefault();

//     let data = {
//       Title,
//       Description,
//       Posted,
//       img,
//     };
//     console.log(data);
//   };
//   console.log(Search);

//   return (
//     <React.Fragment>
//       <br />
//       <br />
//       <div className="form-group">
//         <input
//           type="text"
//           class="form-control"
//           placeholder="Search"
//           value={Search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>
//       <hr />
//       <form className="div" onSubmit={handeldata}>
//         <div class="form-group">
//           <label for="exampleInputEmail1">Title</label>
//           <input
//             type="text"
//             class="form-control"
//             placeholder="Enter title"
//             value={Title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>
//         <div class="form-group">
//           <label for="exampleInputPassword1">description</label>
//           <input
//             type="text"
//             class="form-control"
//             placeholder="Enter description"
//             value={Description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>
//         <div class="form-group">
//           <label for="exampleInputPassword1">Posted by</label>
//           <input
//             type="text"
//             class="form-control"
//             placeholder="Enter Posted by name"
//             value={Posted}
//             onChange={(e) => setPosted(e.target.value)}
//           />
//         </div>
//         <form>
//           <div class="form-group">
//             <label for="exampleFormControlFile1">Choose your profile</label>
//             <input
//               type="file"
//               class="form-control-file"
//               value={img}
//               onChange={(e) => setImg(e.target.value)}
//             />
//           </div>
//         </form>
//         <button type="submit" class="btn btn-primary">
//           Submit
//         </button>
//       </form>
//       <div>
//         <table>
//           <table class="table table-striped">
//             <thead>
//               <tr>
//                 <th scope="col">S.No.</th>
//                 <th scope="col">Title</th>
//                 <th scope="col">description</th>
//                 <th scope="col">Posted by</th>
//                 <th scope="col">img</th>
//               </tr>
//             </thead>
//             {Alldata.map((item, index) => (
//               <tr key={index}>
//                 <th scope="row">{index + 1}</th>
//                 <td>{item.Title}</td>
//                 <td>{item.Description}</td>
//                 <td>{item.Posted}</td>
//                 <td>{<img src={item.img} alt="Flowers in Chania" />}</td>
//               </tr>
//             ))}
//           </table>
//         </table>
//       </div>
//     </React.Fragment>
//   );
// };
// export default App;



import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [posted, setPosted] = useState("");
  const [img, setImg] = useState("");
  const [alldata, setAlldata] = useState([]);
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:5000/api/posts");
    setAlldata(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { title, description, posted, img };

    if (editId) {
      await axios.put(`http://localhost:5000/api/posts/${editId}`, data);
    } else {
      await axios.post("http://localhost:5000/api/posts", data);
    }
    fetchData();
    resetForm();
  };

  const handleEdit = (post) => {
    setTitle(post.title);
    setDescription(post.description);
    setPosted(post.posted);
    setImg(post.img);
    setEditId(post._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/posts/${id}`);
    fetchData();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPosted("");
    setImg("");
    setEditId(null);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Posted by"
          value={posted}
          onChange={(e) => setPosted(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />
        <button type="submit">{editId ? "Update" : "Submit"}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Title</th>
            <th>Description</th>
            <th>Posted by</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {alldata.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.posted}</td>
              <td>
                <img src={item.img} alt={item.title} style={{ width: '50px' }} />
              </td>
              <td>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;

