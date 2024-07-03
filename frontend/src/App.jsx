import "./App.scss";
import { useState } from "react";
import { Outlet } from "react-router-dom";


//components
import Header from './components/Header'
import Footer from './components/Footer'

// Hooks
import { useAuth } from "./hooks/useAuth";
import Loading from "./components/Loading";

function App() {

  const {auth, loading} = useAuth();

  if (loading) {
    return <Loading/>;
  }

  return (
    <>
      <Header />
      <div className="pr-container">        
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
