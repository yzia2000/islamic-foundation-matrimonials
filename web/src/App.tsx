import React from 'react';
import axios from 'axios';
import Routes from './Routes';

axios.defaults.baseURL =
    "http://localhost:5000/";

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
