import React from "react";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <section className={styles["pr-box__footer"]}>
      <div className="pr-container">
        <div className={styles["pr-footer__content"]}>
          <p>Desenvolvido por RABONI TECNOLOGIA® em 2024, todos os direitos reservados.</p>
          <span className="pr-icon-pablo --font-15"></span>
        </div>
      </div>
    </section>
  );
};

export default Footer;
