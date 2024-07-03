import { useState, useEffect } from "react";
import styles from "./Message.module.scss";

const Message = ({ children, type, duration = 5000 }) => {
  const [showAlert, setShowAlert] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [entering, setEntering] = useState(true);
  
  useEffect(() => {

    const enterTimer = setTimeout(() => {
        setEntering(false);
    }, 500);

    const exitTimer = setTimeout(() => {
        executeCloseMessage();
    }, duration);
    // Limpa o timer quando o componente é desmontado ou o efeito é re-executado
    return () => {
        clearTimeout(enterTimer);
        clearTimeout(exitTimer);
    };
  }, [duration]);

  const executeCloseMessage = () =>{
    setExiting(true);
    setTimeout(() => {
        setShowAlert(false);
    }, 500);
  }

  return (
    <>
      {showAlert && (
        <div className={`${styles["pr-message"]} ${styles[type]} ${entering ? styles["--enter"] : ""} ${exiting ? styles["--exit"] : ""}`}>
          {/* <div className={styles["pr-message__loading-bar"]} style={{ animation: `loadingBar ${duration}ms linear` }}></div> */}
          <div className={styles["pr-message__loading-bar"]}></div>
          <span className={styles["pr-message__icon"]}></span>
          <div className={styles["pr-message__items"]}>{children}</div>
          <button className={styles["pr-message__close"]} onClick={() => executeCloseMessage()}></button>
        </div>
      )}
    </>
  );
};

export default Message;
