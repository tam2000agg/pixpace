import React,{useState,useEffect, useContext} from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'
const Home=()=>
{
    const [data,setData]=useState([])
    const [isOpen, setIsOpen] = useState(false);
    const {state,dispatch}=useContext(UserContext)
    useEffect(()=>{
       fetch('/allpost',{
       headers:{
        
           "Authorization":"Bearer "+localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(result=>{
        console.log(result)
        setData(result.posts)
       })
    },[])

    const likePost=(id)=>{
       fetch('/like',{
           method:'put',
           headers:{
               'Content-Type':'application/json',
               'Authorization':"Bearer "+localStorage.getItem("jwt")
           },
           body:JSON.stringify({
               postId:id
           })
       }).then(res=>res.json())
       .then(result=>{
        console.log(result)
         const newData=data.map(item=>{
            
             if(item._id==result._id)
             {
                return result
             }
             else
             {
                return item 
             }
         })
        
         setData(newData) 
       }).catch(err=>{
           console.log(err)
       })
    }

    const unlikePost=(id)=>{
        fetch('/unlike',{
            method:'put',
            headers:{
                'Content-Type':'application/json',
                'Authorization':"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
           
            const newData=data.map(item=>{
                if(item._id==result._id)
                {
                  return result
                }
                else
                {
                   return item 
                }
            })
            setData(newData) 
        }).catch(err=>{
            console.log(err)
        })
     }

const makeComment=(text,postId)=>{
    fetch('/comment',{
        method:"put",
        headers:
        {
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            postId:postId,
            text:text
        })
    }).then(res=>res.json())
    .then(result=>{
          console.log(result)
          const newData=data.map(item=>{
            if(item._id==result._id)
            {
              return result
            }
            else
            {
               return item 
            }
        })
        setData(newData)
        }).catch(err=>{
            console.log(err)
        })
}

const deletePost=(postid)=>{
    fetch(`/deletepost/${postid}`,{
        method:"delete",
        headers:{
            Authorization:"Bearer "+localStorage.getItem('jwt')
        }
    }).then(res=>res.json())
    .then(result=>{
        console.log(result)
        const newData=data.filter(item=>{
            console.log(item._id)
            console.log(result._id)
            return item._id !== result._id
        })
        console.log(newData)
        setData(newData)
    }).catch(err=>{
        console.log(err)
    })
}

return (
    <div className="home">
        {
             data.map(item=>
                {
              return (
                <div className="card home-card " key={item._id}>
                <h5 style={{fontWeight:"bold",padding:"3px 5px"}}>
                  <Link to={item.postedBy._id!==state._id ?"/profile/"+item.postedBy._id:"/profile"} style={{color:"black"}}> {item.postedBy.name} </Link>
                  {item.postedBy._id==state._id  &&
                  <i className="material-icons" style={{float:"right",cursor:"default"}}
                  onClick={()=>deletePost(item._id)}
                  >delete</i>
                  }  </h5> 
                <div className="card-image">
                  <img src={item.photo}/>
                </div> 
                <div className="card-content">
                    {
                    item.likes.includes(state._id)
                        ?
                        <> 
                        <i className="material-icons" style={{marginRight:"8px",color:"red"}}>favorite</i>
                        <i className="material-icons" style={{cursor:"default",marginRight:"8px"}}
                        onClick={()=>{unlikePost(item._id)}}>thumb_down</i>
                      <i onClick={() => setIsOpen(!isOpen)} className="material-icons" style={{cursor:"default"}}> comment </i>
                        </>
                        :
                        <>
                        <i className="material-icons" style={{marginRight:"8px",color:"red"}}>favorite_border</i>
                        <i className="material-icons" style={{cursor:"default",marginRight:"8px"}}
                        onClick={()=>{likePost(item._id)}}
                        >thumb_up</i>
                          <i onClick={() => setIsOpen(!isOpen)} className="material-icons" style={{cursor:"default"}}> comment </i>
                        </>
                        
                    }
                   
                    <h6 style={{margin:"3px"}}>{item.likes.length} likes</h6>
                    <h6 style={{margin:"3px",fontWeight:"bold"}}>{item.title}</h6>
                    <h6 style={{margin:"3px"}}>{item.body}</h6>
                    <div style={{height:"10px"}}></div>
                   {
                    isOpen?
                       item.comments.map(record=>{
                          return (
                              <h6 key={record._id}><span style={{fontWeight:'bold',margin:"3px"}}>{record.postedBy.name}</span> {record.text}</h6>

                          )
                       }):null
                    }
                    <form onSubmit={(e)=>{
                         e.preventDefault()
                        makeComment(e.target[0].value,item._id)
                        e.target[0].value="";
                    }}>
                    <input id="maininput"  type="text" placeholder="add a comment"></input>
                    </form>
                </div>
                </div>
              )
            })
        }
        
    </div>
       
    )
}

export default Home;