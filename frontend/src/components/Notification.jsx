import React from 'react';
import styles from "./Notification.module.scss";

const Notification = ({children, type}) => {
  return (
    <div className={`${styles["pr-message"]} ${styles[type]}`}>
        <span className={styles["pr-message__icon"]}></span>
        <div className={styles["pr-message__items"]}>{children}</div>
    </div>
  )
}

export default Notification