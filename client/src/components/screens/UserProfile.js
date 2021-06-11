import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../App'
import { useParams } from 'react-router-dom'
const UserProfile = () => {
    const [userProfile, setProfile] = useState(null)
    const { state, dispatch } = useContext(UserContext)
    const { userid } = useParams()
    console.log(userProfile)
    useEffect(() => {
        fetch(`/user/${userid}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {

                setProfile(result)
            })
    }, [])

    const followUser = () => {
        fetch('/follow', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                followId: userid
            })
        }).then(res => res.json())
            .then(data => {

                dispatch({ type: "UPDATE", payload: { following: data.following, followers: data.followers } })
                localStorage.setItem("user", JSON.stringify(data))
                setProfile((prevState) => {
                    return {
                        ...prevState,
                        user: {
                            ...prevState.user,
                            followers: [...prevState.user.followers, data._id]
                        }
                    }
                })

            })
    }

    const unfollowUser = () => {
        fetch('/unfollow', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                unfollowId: userid
            })
        }).then(res => res.json())
            .then(data => {

                dispatch({ type: "UPDATE", payload: { following: data.following, followers: data.followers } })
                localStorage.setItem("user", JSON.stringify(data))

                setProfile((prevState) => {
                    const newFollower = prevState.user.followers.filter(item => item !== data._id)
                    return {
                        ...prevState,
                        user: {
                            ...prevState.user,
                            followers: newFollower
                        }
                    }
                })

            })
    }

    return (
        <>
            {userProfile ?
                <div style={{ maxWidth: "950px", margin: "0px auto" }}>
                    <div style={{ display: "flex", justifyContent: "space-around", margin: "18px 15px", borderBottom: "1px solid grey" }}>
                        <div className="container-fluid">
                            <div className="row justify-content-around">
                                {/* <div className="col-md-4 col-sm-4 col-xs-3"> */}
                                <img style={{ width: "180px", height: "180px", borderRadius: "90px" }}
                                    src={userProfile.user.pic} />
                                {/* </div> */}

                                <div className="col-md-6 col-sm-6 col-xs-7" style={{ padding: "20px 0px" }}>
                                    <h4 style={{ fontWeight: "bold", color: "rgba(250,250,250,0.9)" }}>{userProfile.user.name}</h4>
                                    <h5 style={{ fontWeight: "bold", color: "rgba(250,250,250,0.9)" }}>{userProfile.user.email}</h5>
                                    <div style={{ display: "flex" }}>
                                        <h6 style={{ fontWeight: "bold", color: "rgba(250,250,250,0.9)", marginRight: "8px" }}>{userProfile.posts.length} Posts</h6>
                                        <h6 style={{ fontWeight: "bold", color: "rgba(250,250,250,0.9)", marginRight: "8px" }}>{userProfile.user.followers.length} Followers</h6>
                                        <h6 style={{ fontWeight: "bold", color: "rgba(250,250,250,0.9)", marginRight: "8px " }}>{userProfile.user.following.length} Following</h6>
                                    </div>
                                    

                                        {
                                            userProfile.user.followers.includes(state._id)
                                                ?
                                                <button className="btn" style={{ margin: "15px 0px" }}
                                                    onClick={() => unfollowUser()}>
                                                    UnFollow
                                            </button>
                                                :
                                                <button className="btn" style={{ margin: "15px 0px" }}
                                                    onClick={() => followUser()}>
                                                    Follow
                                            </button>
                                        }
                                    
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="gallery md-col-3">
                        {

                            userProfile.posts.map(item => {
                                return (
                                    <img key={item._id} style={{ height: "300px" }} className="col-md-4 col-sm-6 col-lg-4" style={{ height: "250px", marginBottom: "0px", border: "solid 3px grey", padding: "0px" }} src={item.photo} alt={item.title} />
                                )
                            })
                        }
                    </div>
                </div>

                : <h2>loading...</h2>}

        </>
    )
}

export default UserProfile;