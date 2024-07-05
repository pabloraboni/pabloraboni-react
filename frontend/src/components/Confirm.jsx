import { useState, useEffect } from "react";
import styles from "./Confirm.module.scss";

const Confirm = ({ children, onConfirm, onCancel }) => {
  const [showConfirm, setShowConfirm] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [entering, setEntering] = useState(true);

  useEffect(() => {
    const enterTimer = setTimeout(() => {
      setEntering(false);
    }, 500);
    return () => {
      clearTimeout(enterTimer);
    };
  });

  const executeCloseConfirmation = () => {
    setExiting(true);
    setTimeout(() => {
      setShowConfirm(false);
    }, 500);
  };

  const confirm = () => {
    onConfirm();
    executeCloseConfirmation();
  };

  const cancel = () => {
    onCancel();
    executeCloseConfirmation();
  };





  return (
    <>
      {showConfirm && (
        <div className={styles["pr-modal__confirm"]}>
          <div className={`${styles["pr-confirm__content"]} ${entering ? styles["--enter"] : ""} ${exiting ? styles["--exit"] : ""}`}>
            <div className={styles["pr-confirm__head"]}>
              <p>Confirmação</p>
              <button className={styles["pr-confirm__close"]} onClick={cancel}></button>
            </div>
            {/* Mensagem da confirmação */}
            <p>{children}</p>
            {/* Botão confirmar ou desistir */}
            <div className={styles["pr-confirm__foot"]}>
                <button onClick={cancel} className="pr-button --outline --small">Cancelar</button>
                <button onClick={confirm} className="pr-button --small">Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Confirm;
