import React,{useState,useContext} from 'react'
import M from 'materialize-css'
import {Link,useHistory,useParams} from 'react-router-dom'


const Newpass=()=>{
  
    const history=useHistory();
    const [password,setPassword]=useState("")
    const {token}=useParams()
    const PostData=()=>{
        
        fetch("/new-password",{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            password:password,
            token:token
        })
    }).then(res=>res.json())
    .then(data=>{
       if(data.error){
         M.toast({html:data.error,classes:"#c62828 red darken-4"})
        }
        else{
            M.toast({html:data.message,classes:"2e7d32 green darken-4"})
            history.push('/signin')
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
           marginBottom:"30px"}}>Pixpace</h2>
       
         <input style={{marginBottom:"30px"}}
         type="password"
         placeholder="enter new password"
         value={password}
         onChange={(e)=>setPassword(e.target.value)}
         />
         <button className="btn"
         onClick={PostData}>
          Update Password
         </button>
         
        </div>
      </div>
   
       )
}

export default Newpass;