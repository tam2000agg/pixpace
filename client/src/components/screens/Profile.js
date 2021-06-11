import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../App'

const Profile = () => {
    const [mypics, setPics] = useState([])
    const { state, dispatch } = useContext(UserContext)
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    console.log(state)
    useEffect(() => {
        fetch('/mypost', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result);
                setPics(result.posts)
            })
    }, [])

    useEffect(() => {
        if (image) {
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
                    fetch('/updatepic', {
                        method: "put",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem("jwt")
                        },
                        body: JSON.stringify({
                            pic: data.url
                        })
                    }).then(res => res.json())
                        .then(result => {

                            console.log(result)
                            localStorage.setItem("user", JSON.stringify({ ...state, pic: result.pic }))
                            dispatch({ type: "UPDATEPIC", payload: result.pic })
                        })

                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [image])

    const updatePhoto = (file) => {
        setImage(file)

    }
    return (

        <div style={{ maxWidth: "950px", margin: "0px auto" }}>
            <div style={{ display: "flex", justifyContent: "space-around", margin: "18px 15px", borderBottom: "1px solid grey" }}>
                <div className="container-fluid">

                    <div className="row justify-content-around">
                        {/* <div className="col-md-4 col-sm-4 col-xs-3"> */}
                            <img style={{ width: "180px", height: "180px", borderRadius: "90px" }}
                                src={state ? state.pic : "loading"} />
                        {/* </div> */}

                        <div className="col-md-6 col-sm-6 col-xs-7" style={{ padding: "20px 0px" }}>
                            <h4 style={{ fontWeight: "bold", color: "rgba(250,250,250,0.9)" }}>{state ? state.name : "loading"}</h4>
                            <h5 style={{ fontWeight: "bold", color: "rgba(250,250,250,0.9)" }}>{state ? state.email : "loading"}</h5>
                            <div style={{ display: "flex" }}>
                                <h6 style={{ fontWeight: "bold", color: "rgba(250,250,250,0.9)", marginRight: "8px" }}>{mypics.length} Posts </h6>
                                <h6 style={{ fontWeight: "bold", color: "rgba(250,250,250,0.9)", marginRight: "8px" }}>{state ? state.followers.length : "0"} Followers </h6>
                                <h6 style={{ fontWeight: "bold", color: "rgba(250,250,250,0.9)" }}>{state ? state.following.length : "0"} Following </h6>
                            </div>
                        </div>

                    </div>

                    <div className="file-field input-field" style={{ margin: "10px" }}>
                        <div className="btn">
                            <span>Update pic</span>
                            <input type="file"
                                onChange={(e) => updatePhoto(e.target.files[0])}
                            />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="input-field" className="file-path validate" type="text" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="gallery md-col-3">
                {

                    mypics.map(item => {
                        return (
                            <img className="col-md-4 col-sm-6 col-lg-4" key={item._id} style={{ height: "250px", marginBottom: "0px", border: "solid 3px grey", padding: "0px" }} src={item.photo} alt={item.title} />
                        )
                    })
                }
            </div>
        </div>

    )
}

export default Profile;