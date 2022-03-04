import React, { useState, useEffect } from 'react';
//import ReactDOM from 'react-dom';
//import Jumbotron from 'react-bootstrap/Jumbotron';
//import Form from 'react-bootstrap/Form';
//import Button from 'react-bootstrap/Button';
import axios from 'axios';
//import './login.css'
//
import View from './View'
import StudentList from './StudentsList'
//
function Login() {
  //state variable for the screen
  const [screen, setScreen] = useState('auth');
  //state variables to store input field data, user name and password
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "/students/login";
  // send username and password to the server
  // for initial authentication
  const authenticateUser = async () => {
    console.log('calling auth')
    console.log(username)
    try {
      //make a get request to /authenticate end-point on the server
      const loginData = { auth: { username, password } }
      //call api
      const res = await axios.post(apiUrl, loginData);
      console.log(res.data.auth)
      console.log(res.data.screen)
      //process the response
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen); //
        console.log(res.data.screen);
      }
    } catch (e) { //print the error
      console.log(e);
    }
  
  };

  
  //check if the user already logged-in
  const readCookie = async () => {
    try {
      console.log('--- in readCookie function ---');

      //
      const res = await axios.get('/read-cookie');
      // 
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        console.log(res.data.screen)
      }
    } catch (e) {
      setScreen('auth');
      console.log(e);
    }
  };
  //runs the first time the view is rendered
  //to check if user is signed in
  useEffect(() => {
    readCookie();
  }, []); //only the first render
  //
  return (
    <div className="App">
      {screen === 'auth' 
        ? <div class ="container">
            <div class="container">
              <label>Username: </label>
              <input type="text" class = "fields" onChange={e => setUsername(e.target.value)} />
            </div>
            <div class="container">
              <label>Password: </label>
              <input type="password" class = "fields"  onChange={e => setPassword(e.target.value)} />
            </div>
            <div class="container">
              <button class="form-field-no-caption" onClick={authenticateUser}>Login</button>
            </div>

        </div>        
        : <View screen={screen} setScreen={setScreen} />
      }
    </div>
  );
}

export default Login;

