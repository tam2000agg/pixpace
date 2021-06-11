import React,{useContext,useState} from 'react'
import {useHistory,NavLink,Link} from 'react-router-dom';
import {Modal, ModalHeader, ModalBody,Navbar, Nav, NavbarToggler, Collapse, NavItem ,Button, ModalFooter} from 'reactstrap';
import {UserContext}from '../App'

const Navbarr = ()=>{
const {state,dispatch}=useContext(UserContext)
const [isNavOpen, setIsOpen] = useState(false);
const [userDetails,setUserDetails]=useState([])
const [isModalOpen,setisopen]=useState(false);
const [search,setSearch]=useState('')
const history=useHistory()

const fetchuser= (query)=>{
setSearch(query)
fetch('/search-users',{
    method:"post",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
        query:query
    })
}).then(res=>res.json())
.then(results=>{
    setUserDetails(results.user)
})
}
    return(
        <>
        <Navbar className="nav_ab test" expand="md" dark>
        <div className="nav-wrapper container-fluid" >
        <NavLink to={state?"/":"/signin"} className="logo" id="idlogo">PIXPACE</NavLink>
        <NavbarToggler className="ml-auto navbar" onClick={()=> setIsOpen(!isNavOpen)} />
        <Collapse  isOpen ={isNavOpen} navbar className= "offset-lg-1 offset-xl-4">
        <Nav navbar className='container' style={{width:'auto'}}>
          {
      state? 
      <>
      <NavItem>
          
          <i style={{cursor:"pointer"}}className="material-icons" onClick={()=>setisopen(!isModalOpen)}>search</i>
          
      </NavItem>
      <NavItem>
          <NavLink exact to="/profile">
              Profile
          </NavLink>
      </NavItem>
      <NavItem>
          <NavLink to="/create">
              Create 
          </NavLink>
      </NavItem>
      <NavItem>
          <NavLink style={{color:"white"}} to="/myfollowerpost">
              Friend's Pics
          </NavLink>
      </NavItem>
      <NavItem>
         <button className="btn" onClick={()=>{
           localStorage.clear()
           dispatch({type:"CLEAR"})
           history.push('/signin');
         }}>Logout
         </button>
      </NavItem> 
     
      </>
        :
      <>
      <NavItem>
          <NavLink to="/signin">
              Signin
          </NavLink>
      </NavItem>
      <NavItem>
          <NavLink to="/signup">
              Signup
          </NavLink>
      </NavItem>
     </>
     }
        </Nav>
        </Collapse>
        </div>
        </Navbar>

        <Modal  scrollable={true} isOpen={isModalOpen} toggle={() => setisopen(!isModalOpen)} >
        <ModalHeader style={{fontFamily: 'Cinzel Decorative, cursive',fontWeight:"bold"}}>search user</ModalHeader>
        <ModalBody >
        <input 
         type="text"
         placeholder="ENTER NAME"
         value={search}
         onChange={(e)=>fetchuser(e.target.value)}
         />
         <ul  className="collection">
             {
            userDetails.map(item=>{
              return <li className="collection-item">
                  <Link to={item._id!==state._id ?"/profile/"+item._id:"/profile"}
                  onClick={()=>{
                    setisopen(!isModalOpen);
                    setSearch('')
                    }}>
                  {item.email}</Link>
                  </li>
             })
            }
          </ul>
         </ModalBody>
         <ModalFooter>
         <button className="btn" onClick={()=>{
         setSearch('');
         setisopen(!isModalOpen)
         }}>
             close
         </button>
         </ModalFooter>
         </Modal>

       </>
    );

}


export default Navbarr;


