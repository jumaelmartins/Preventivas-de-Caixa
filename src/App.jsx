import { Routes, Route } from "react-router-dom";
import Resumo from "./pages/Resumo";
import Preventivas from "./pages/Preventivas";
import "./styles/main.scss";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Resumo />} />
      <Route path="/preventivas" element={<Preventivas />} />
    </Routes>
  );
}

export default App;
