import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Panel from "./pages/Panel/Panel";
import Sidebar from "./components/Sidebar";
import useWindowWidth from "./utils/useWindowWidth";
import Partidos from "./pages/Partidos/Partidos";
import Eleicoes from "./pages/Eleicoes/Eleicoes";
import { generateToken } from "./services/auth";

const queryClient = new QueryClient();
const App: React.FC = () => {
  useEffect(() => {
    generateToken();
  }, []);
  const windowWidth = useWindowWidth();
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className={`flex ${windowWidth > 800 ? "" : "flex-col"}`}>
          <Sidebar />

          <Routes>
            <Route path="/" element={<Panel />} />
            <Route path="/mapa" element={<Home />} />
            <Route path="/partidos" element={<Partidos />} />
            <Route path="/eleicoes" element={<Eleicoes />} />
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
