import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/CitiesProvider";
export default function CityItem({ cityName, emoji, date, id, position }) {
  const { currentCity, deleteCity } = useCities();
  const { lat, lng } = position;
  const formatDate = (date) =>
    // eslint-disable-next-line no-undef
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(new Date(date));

  return (
    <li>
      <Link
        to={`${id}?lat=${lat}&lng=${lng}`}
        className={`${styles.cityItem} ${
          currentCity?.id === id && styles["cityItem--active"]
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}> {cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button
          className={styles.deleteBtn}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            deleteCity(id);
          }}
        >
          &times;
        </button>
      </Link>
    </li>
  );
}
