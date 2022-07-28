import React, { useEffect, useState } from 'react';
import { auth } from './firebase';
import Home from './Home';
import Login from './Login'

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if(authUser){
        setUser(authUser)
      } else {
        setUser(null);
      }
    })
    console.log(user)
  },[])

  return (
    <>
      {
        user ? <Home user={user} /> : <Login /> 
      }
    </>
  );
}

export default App;
