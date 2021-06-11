import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'reactstrap';
import M from 'materialize-css'
const CreatePost = () => {
  const history = useHistory()
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [image, setImage] = useState("")
  const [url, setUrl] = useState("")
  //this use effect prevent this fetch from being executed until postdetails()
  //completed all its requests
  useEffect(() => {
    if (url) {
      fetch("/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify({

          title,
          body,
          pic: url
        })
      }).then(res => res.json())
        .then(data => {

          if (data.error) {
            M.toast({ html: data.error, classes: "#c62828 red darken-4" })
          }
          else {
            M.toast({ html: "created post successfully", classes: "2e7d32 green darken-4" })
            history.push('/');
          }
        }).catch(err => {
          console.log(err)
        })
    }
  }, [url])

  const postDetails = () => {
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "insta-clone")
    data.append("cloud_name", "tamanna")

    fetch("https://api.cloudinary.com/v1_1/tamanna/image/upload", {
      method: "post",
      body: data
    })
      .then(res => res.json())
      .then(data => {
        setUrl(data.url)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className="input-filed"
      style={{
        margin: "60px auto",
        maxWidth: "600px",
        textAlign: "center",
        padding: "30px"
      }}>
      <input className="input-field" style={{ marginBottom: "30px",color:"white" }}
        type="text" placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input className="input-field" style={{ marginBottom: "30px" ,color:"white"}}
        type="text" placeholder="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <div className="file-field input-field" style={{ marginBottom: "30px" }}>
        <div className="btn">
          <span>Upload Image</span>
          <input type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="file-path-wrapper">
          <input className="input-field" className="file-path validate" type="text" />
        </div>

      </div>
      <div style={{textAlign:'center'}}>
        <button className="btn" style={{ width: '150px' }}
          onClick={postDetails}
        >
          Submit Post
     </button>
      </div>
    </div>
  );
}

export default CreatePost;