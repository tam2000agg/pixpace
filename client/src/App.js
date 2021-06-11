import React,{useEffect,createContext,useReducer,useContext} from 'react' 
import Navbarr from './components/Navbar';
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom';
import './App.css';
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import Signup from './components/screens/Signup';
import Signin from './components/screens/Login';
import CreatePost from './components/screens/CreatePost';
import UserProfile from './components/screens/UserProfile'
import Resetpass from './components/screens/Reset'
import Newpass from './components/screens/Newpassword'
import Subscribepost from './components/screens/SubscribeUserPosts'
import {initialState, reducer} from './reducers/userReducer'

export const UserContext=createContext()

const Routing=()=>{
  const history=useHistory();
  const {state,dispatch}=useContext(UserContext) 
  
  useEffect(()=>
  {
    
      const user=JSON.parse(localStorage.getItem("user"))
      
      if(user)
      {
        
      dispatch({type:"USER",payload:user})
      
      }
      else
      if(!history.location.pathname.startsWith("/reset"))
      history.push('/signin')
  },[])
  return(
    <>
    <Navbarr></Navbarr>
    <div className="image"></div>
    <div className="navhead"></div>
    <Switch>
      <Route exact path="/"><Home/></Route>
      <Route path="/signup"><Signup/></Route>
      <Route path="/signin"><Signin/></Route>
      <Route exact path="/profile"><Profile/></Route>
      <Route path="/profile/:userid"><UserProfile/></Route>
      <Route path="/create"><CreatePost/></Route>
      <Route path="/myfollowerpost"><Subscribepost/></Route>
      <Route exact path="/reset"><Resetpass/></Route>
      <Route path="/reset/:token"><Newpass/></Route>
    </Switch>
    </>
  )
}
function App() {
const [state,dispatch]=useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    
     <Routing />
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
