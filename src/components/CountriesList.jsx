import { useCities } from "../contexts/CitiesProvider";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

export default function CountryList() {
  const { isLoading, cities } = useCities();
  //filter countries by country
  const uniqueCountries = cities?.reduce((acc, city) => {
    if (!acc.some((item) => item.country === city.country)) {
      acc.push(city);
    }
    return acc;
  }, []);
  ///////////////
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message
        message={"Add your first city by clicking on a city on the map"}
      />
    );
  return (
    <>
      <ul className={styles.countryList}>
        {uniqueCountries?.map((country, index) => (
          <CountryItem key={index} country={country} />
        ))}
      </ul>
    </>
  );
}
