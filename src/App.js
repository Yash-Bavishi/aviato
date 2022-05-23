import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Landing from './components/Landing'
import Doggo from './components/Doggo'
import Main from './components/Main'
function App() {
  return (
    <div className="App">
	  <Router>
	  <Routes>
		<Route exact path="/" element={<Landing />} /> 
		<Route path="/doggo" element={<Doggo />} />
		<Route path="/app" element={<Main />} />
	  </Routes>
	  </Router>
    </div>
  );
}

export default App;
