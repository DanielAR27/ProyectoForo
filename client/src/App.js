import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Test from './pages/Test';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Se definen las rutas para cuando se llame en link */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;