import { createContext, useContext, useReducer } from "react";
const FAKE_USER = {
  name: "ahmed",
  email: "ahmedgamhody1@outlook.com",
  password: "123456",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
const AuthContext = createContext();
const initialState = {
  user: null,
  isAuthenticated: false,
};
0;
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
export default function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, isAuthenticated } = state;
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    } else {
      alert("Invalid email or password!");
    }
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside of its Provider");
  return context;
}

export { useAuth };
