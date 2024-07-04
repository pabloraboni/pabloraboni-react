import styles from "./Header.module.scss";

//hooks
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

//Redux
import {logout, reset} from "../slices/authSlice";

//icons
import {
  BsSearch,
  BsHouseDoorFill,
  BsFillPersonFill,
  BsFillCameraFill,
} from "react-icons/bs";

const Header = () => {  
  const { auth, loading } = useAuth();
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate("/login");

  }

  const [isFocusedSearch, setIsFocusedSearch] = useState(true);

  const handleFocus = () => {
    setIsFocusedSearch(false);
  };

  const handleBlur = () => {
    setIsFocusedSearch(true);
  };


  return (
    <section className={styles["pr-box__header"]}>
      <div className="pr-container">
        <div className={styles["pr-header__content"]}>
          {/* <NavLink to="/" className={styles["pr-header__logo"]}><img src="https://assets-global.website-files.com/60323d6e5881a62c5b5fd596/6316c7723c13eda78705db88_p-logo.svg"></img></NavLink> */}
          <NavLink to="/" className={styles["pr-header__logo"]}>
            <span className="pr-icon-pablologo --font-14"></span>
          </NavLink>

          {auth && (
            <>
              <form className="pr-box__form">
                <label
                  className={`pr-box__input ${isFocusedSearch ? "--icon" : ""}`}
                >
                  {isFocusedSearch && <span className="pr-icon-search"></span>}
                  <input
                    type="text"
                    placeholder="Pesquise algo"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  ></input>
                </label>
              </form>
            </>
          )}

          <nav className={styles["pr-box__menu"]}>
            {auth ? (
              <>
                <NavLink to="/" className={styles["pr-menu__item"]}>
                  <span className="pr-icon-home --font-15"></span>
                </NavLink>
                <NavLink to={`/profile/${user._id}`} className={styles["pr-menu__item"]}>
                  <span className="pr-icon-camera-3 --font-17"></span>
                </NavLink>
                <NavLink to={`/users/${user._id}`} className={styles["pr-menu__item"]}>
                  <span className="pr-icon-user --font-12"></span>
                </NavLink>
                <button onClick={handleLogout} className={styles["pr-menu__item"]}>
                  <span className="pr-icon-logout --font-15"></span>
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={styles["pr-menu__item"]}>
                  Entrar
                </NavLink>
                <NavLink to="/register" className={styles["pr-menu__item"]}>
                  Cadastre-se
                </NavLink>
              </>
            )}
          </nav>
        </div>
      </div>
    </section>
  );
};

export default Header;
