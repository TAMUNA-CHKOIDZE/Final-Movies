import styles from "./Layout.module.css";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main>
        {/* Outlet-ს ვიყენებ children-ის ნაცვლად. რაც უნდა იყოს Route-ში შიგნით, ავტომატურად ჩაჯდება Outlet-ში და Header/Footer შენარჩუნდება ყველა გვერდზე. <Outlet /> არის ის ადგილი Layout-ში, სადაც React Router აჩვენებს კონკრეტულ გვერდს (route-ის element-ს) */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;






