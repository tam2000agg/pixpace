import React,{useState,useContext} from 'react'
import M from 'materialize-css'
import {Link,useHistory,NavLink} from 'react-router-dom'
import {Button,NavItem} from 'reactstrap';
import {UserContext} from '../../App'

const Signin=()=>{
    const {state,dispatch}=useContext(UserContext)
    const history=useHistory();
       //react hooks
    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")
    
    const PostData=()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
        {
         M.toast({html:"invalid email",classes:"#c62828 red darken-4"})
         return
        }
        fetch("/signin",{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            
            password:password,
            email:email
        })
    }).then(res=>res.json())
    .then(data=>{
        console.log(data);
        if(data.error){
         M.toast({html:data.error,classes:"#c62828 red darken-4"})
        }
        else{
    //saving token so that we can use that in posting data and getting data
            localStorage.setItem("jwt",data.token)
            localStorage.setItem("user",JSON.stringify(data.user))
            dispatch({type:"USER",payload:data.user})
            M.toast({html:"signedin successfully",classes:"2e7d32 green darken-4"})
            history.push('/')
        }
    }).catch(err=>{
        console.log(err)
    })

}
return (
    <div className="mycard">
        <div className=" auth-card input-field">
       <h2 style={{
           color:"rgba(250,250,250,0.9)",
           fontWeight: "bold",
           fontFamily: 'Cinzel Decorative, cursive',
           fontSize:"30px",
           marginBottom:"30px"}}>
             Welcome To Pixpace</h2>
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
         <button className="btn" style={{marginBottom:"30px"}}
         onClick={PostData}>
             Login
         </button>
         <NavItem>
             <NavLink to="/signup" style={{ color:"rgba(250,250,250,0.9)",
           fontWeight: "bold",
           fontFamily: 'Cinzel Decorative, cursive',
           fontSize:"20px"}}>Don't have an account?</NavLink>
        </NavItem>
        <NavItem>
             <NavLink to="/reset" style={{ color:"rgba(250,250,250,0.9)",
           fontWeight: "bold",
           fontFamily: 'Cinzel Decorative, cursive',
           fontSize:"20px"}}>Forget Password?</NavLink>
        </NavItem>
        </div>
      </div>
   
       )
}

export default Signin;