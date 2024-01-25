import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import SignUp from './components/pages/SignUp';
import Card from './Components/Card';

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' exact component={Home} />
          <Route path='/services' component={Services} />
          <Route path='/products' component={Products} />
          <Route path='/sign-up' component={SignUp} />
        </Routes>
      </Router>
      <Card title='Card title' imageUrl='https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vectorstock.com%2Froyalty-free-vector%2Fempty-classroom-cartoon-vector-20511589&psig=AOvVaw3s_qbL33mO88cTocH3MfZ9&ust=1702794394702000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNiJrtCpk4MDFQAAAAAdAAAAABAI' body='fdsafdsaf'/>
    </>
  );
}

export default App;
