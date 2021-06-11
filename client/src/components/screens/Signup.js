import React,{useEffect, useState} from 'react'
import {Link,useHistory,NavLink} from 'react-router-dom'
import {Button,NavItem} from 'reactstrap';
import M from 'materialize-css'
const Signup=()=>{
    const history=useHistory();
    const [name,setName]=useState("")   //react hooks
    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")
    const [image,setImage]=useState("")
    const [url,setUrl]=useState(undefined)
useEffect(()=>{
if(url)
{
    uploadfields()
}
},[url]) //this url means when this url change then useeffect works again

    const uploadpic=()=>{
        const data=new FormData()
        data.append("file",image)
        data.append("upload_preset","insta-clone")
        data.append("cloud_name","tamanna")
    
        fetch("https://api.cloudinary.com/v1_1/tamanna/image/upload",{
        method:"post",
        body:data
        })
        .then(res=>res.json())
        .then(data=>{
          setUrl(data.url)
        })
        .catch(err=>{
          console.log(err)
        })
    
    
    }

    const PostData=()=>{
        if(image){
           uploadpic()
        }else{
            uploadfields()
        }

}

const uploadfields=()=>{

if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
{
 M.toast({html:"invalid email",classes:"#c62828 red darken-4"})
 return
}
fetch("/signup",{
method:"post",
headers:{
    "Content-Type":"application/json"
},
body:JSON.stringify({
    name:name,
    password:password,
    email:email,
    pic:url
})
}).then(res=>res.json())
.then(data=>{
if(data.error)
{
 M.toast({html:data.error,classes:"#c62828 red darken-4"})
}
else{
    
    M.toast({html:data.message,classes:"2e7d32 green darken-4"})
    history.push('/signin');
}
}).catch(err=>{
console.log(err)
})
}

return (
    <div className="mycard">
        <div className="auth-card input-field">
       <h2 style={{
           color:"rgba(250,250,250,0.9)",
           fontWeight: "bold",
           fontFamily: 'Cinzel Decorative, cursive',
           fontSize:"30px",
           marginBottom:"30px"}}>
             Welcome To Pixpace</h2>
       <input style={{marginBottom:"30px"}}
         type="text"
         placeholder="name"
         value={name}
         onChange={(e)=>setName(e.target.value)}
         />
         <input style={{marginBottom:"30px"}}
         type="text"
         placeholder="email"
         value={email}
         onChange={(e)=>setEmail(e.target.value)}
         />
         <input style={{marginBottom:"30px"}}
         type="password"
         placeholder="password"
         value={password}
         onChange={(e)=>setPassword(e.target.value)}
         />
         <div className="file-field input-field">
         <div className="btn">
        <span>Upload Pic</span>
        <input  type="file"
        onChange={(e)=>setImage(e.target.files[0])}
        />
        </div>
        <div className="file-path-wrapper">
        <input className="input-field"className="file-path validate" type="text"/>
        </div>
        </div>
 
         <button className="btn" style={{marginBottom:"30px"}}
         onClick={PostData}
         >
          
             Signup
         </button>
         <NavItem>
             <NavLink to="/signin" style={{ color:"rgba(250,250,250,0.9)",
           fontWeight: "bold",
           fontFamily: 'Cinzel Decorative, cursive',
           fontSize:"20px"}}>Already have an account?</NavLink>
         </NavItem>
        </div>
      </div>
   
       )
}

export default Signup;