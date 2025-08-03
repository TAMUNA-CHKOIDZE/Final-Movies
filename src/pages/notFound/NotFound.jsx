import ROUTES from "../../routes/Routes";
import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css";

function NotFound() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(ROUTES.HOME);
  };
  return (
    <section className={styles.NotFound}>
      <section className={styles.NotFoundContent}>
        <h2>
          404 <span>ERROR</span>
        </h2>
        <p>Sorry, this page isn’t available</p>
        <button onClick={handleClick}>GO HOME</button>
      </section>
    </section>
  );
}

export default NotFound;
