import './App.css';

import {Routes, Route} from 'react-router-dom';
import {Homepage} from "./pages/Homepage";
import {Notfoundpage} from "./pages/Notfoundpage";
import {Layout} from "./components/Layout";
import {Watchespage} from "./pages/Watchespage";
import {Crudpage} from "./pages/Crudpage";

function App() {
  return (
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Homepage/>}/>
          <Route path='watches' element={<Watchespage/>}/>
          <Route path='crud' element={<Crudpage/>}/>
          <Route path='*' element={<Notfoundpage/>}/>
        </Route>
      </Routes>
  );
}

export default App;
