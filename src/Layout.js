import React from 'react';
import { Outlet } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import './css/Common.css'



function Layout() {
  return (
    <div className="wrapper">
    <div id="snackbar"></div>
    <header className="">
      {/* <TopContactBar /> */}
      <Header />
    </header>
    <main className="">
     
    <Outlet />  
    </main>
    {/* <div className="float_content">
    <p className="marquee">"Beware of fraudulent practices! You must use only our secure website repayment link to repay a loan. Speedoloan is not answerable and accountable for any direct bank payment or payment made to other accounts."</p>
</div> */}

    <footer className="">
      <Footer />
    </footer>
  </div>
  )
}

export default Layout;