import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

export const CitiesContext = createContext();
const BASE_URL = "http://localhost:5005";
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "getAllCities":
      return { ...state, cities: action.payload, isLoading: false };

    case "getCurrentCity":
      return { ...state, currentCity: action.payload, isLoading: false };

    case "city/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        isLoading: false,
        currentCity: {},
      };

    case "stopLoading":
      return { ...state, isLoading: false };
    case "error":
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
}
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
};
export default function CitiesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cities, isLoading, currentCity, error } = state;

  async function getCities() {
    try {
      dispatch({ type: "loading" });
      const response = await fetch(`${BASE_URL}/cities`);
      const data = await response.json();
      dispatch({ type: "getAllCities", payload: data });
    } catch (error) {
      dispatch({ type: " stopLoading" });
      console.log(error);
      dispatch({ type: "error", payload: error.message });
    } finally {
      dispatch({ type: " stopLoading" });
    }
  }

  useEffect(() => {
    getCities();
  }, []);

  const fetchCity = useCallback(
    async function fetchCity(id) {
      if (currentCity.id === Number(id)) return;
      try {
        dispatch({ type: "loading" });
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "getCurrentCity", payload: data });
      } catch (error) {
        dispatch({ type: " stopLoading" });
        console.log(error);
        dispatch({ type: "error", payload: error.message });
      } finally {
        dispatch({ type: " stopLoading" });
      }
    },
    [currentCity.id]
  );

  async function createCity(city) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(city),
      });

      if (!res.ok) {
        throw new Error("Failed to create city. Please try again.");
      }

      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch (error) {
      dispatch({ type: " stopLoading" });
      console.error("Error creating city:", error.message);
      dispatch({ type: "error", payload: error.message });
    } finally {
      dispatch({ type: " stopLoading" });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      dispatch({ type: " stopLoading" });
      console.error("Error deleting city:", error.message);
      dispatch({ type: "error", payload: error.message });
    } finally {
      dispatch({ type: " stopLoading" });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        fetchCity,
        createCity,
        deleteCity,
        error,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside of its Provider");
  return context;
}

export { useCities };
