import './App.css';
import { useState } from 'react'
import AppLeft from './components/AppLeft/AppLeft'
import AppRight from './components/AppRight/AppRight'
import 'leaflet/dist/leaflet.css'

function App() {
  const [casesType, setCasesType] = useState('cases');
  return (
    <div className="app">
      <div className="app__left">
        <AppLeft casesType={casesType} setCasesType={setCasesType} />
      </div>
      <div className="app__right">
        <AppRight casesType={casesType} />
      </div>
    </div>
  );
}

export default App;
