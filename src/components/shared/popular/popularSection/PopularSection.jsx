import React, { useEffect, useState } from "react";
import { fetchPopularMovies } from "../../../../api";
import PopularCarousel from "../popularCarusel/PopularCarousel";
import styles from "./PopularSection.module.css";
// react-toastify ერორისთვის
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Popular() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPopularMovies()
      .then((data) => {
        // ხელოვნურად ვაყოვნებ, რომ სკელეტონი დავინახო
        setTimeout(() => {
          setPopularMovies(data.results);
          setError(null); // როცა წარმატებით ჩაიტვირთება ერორი აღარ გამოჩნდება
          setIsLoading(false);
        }, 1000);
      })
      .catch((err) => {
        toast.error("Network error: " + err.message, {
          // toastId-ის წყალობით ორჯერ არ გამოჩნდება StrictMode-ის გამო. რადგან useEffect ორჯერ ეშვება StrictMode-ის გარემოში
          toastId: "unique_error_id",
        });
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  return (
    <section className={styles.popularSection}>
      <h3>Most Popular</h3>
      {/* თუ ერორი არ არის, მაშინ ხდება ფილმების ჩატვირთვა  */}
      {!error && (
        // PopularCarousel-ს აქვს 2 props: ფილმების მასივი და loading
        <PopularCarousel movies={popularMovies} isLoading={isLoading} />
      )}

      {/* ToastContainer ავტომატურად ჩნდება ერორის დროს */}
      <ToastContainer
        position="top-center"
        autoClose={false}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        className={styles.toastWrapper}
      />
    </section>
  );
}

export default Popular;
