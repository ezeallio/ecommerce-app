import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import ProductDetail from "./productDetail/ProductDetail";
import Login from "./login/Login";
import Signin from "./signin/Signin";
import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app';
import { createContext } from 'react';
import { getDatabase } from "firebase/database";

const firebaseConfig: FirebaseOptions = {
  
};

const app: FirebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const FirebaseContext = createContext(database);

export default function Router() {
  return <>
      <FirebaseContext.Provider value={database}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='productDetail/:id' element={<ProductDetail />} />
            <Route path='login' element={<Login/>} />
            <Route path='signin' element={<Signin/>} />
          </Routes>
        </BrowserRouter>
        </FirebaseContext.Provider>
  </>
}
