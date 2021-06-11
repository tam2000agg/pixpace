import React,{useState} from 'react'
import M from 'materialize-css'
import {Link,useHistory} from 'react-router-dom'

const Resetpass=()=>{

    const history=useHistory();
    const [email,setEmail]=useState("")
    
    const PostData=()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
        {
         M.toast({html:"invalid email",classes:"#c62828 red darken-4"})
         return
        }
        fetch("/reset-password",{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email:email
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
           marginBottom:"30px"}}>
             Pixpace</h2>
       <input style={{marginBottom:"30px"}}
         type="text"
         placeholder="email"
         value={email}
         onChange={(e)=>setEmail(e.target.value)}
         />
         <button className="btn"
         onClick={PostData}>
             Reset Password
         </button>
         
        </div>
      </div>
   
       )
}

export default Resetpass;