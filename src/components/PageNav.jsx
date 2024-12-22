import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
import { useAuth } from "../contexts/AuthProvider";
const { nav, ctaLink } = styles;
export default function PageNav() {
  const { isAuthenticated } = useAuth();
  return (
    <nav className={nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>

        {!isAuthenticated && (
          <li>
            <NavLink to="/login" className={ctaLink}>
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
