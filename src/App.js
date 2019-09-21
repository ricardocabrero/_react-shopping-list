import React from 'react';
import './App.css';
import 'bulma/css/bulma.css'

import Header from './components/Header'
import Form from './components/Form'

function App() {
  return (
    <div className="App">
      <Header text='React Shopping List'/>
      <Form/>
    </div>
  );
}

export default App;
