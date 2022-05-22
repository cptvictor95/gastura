import React, { useState } from "react";
import Popup from "reactjs-popup";
import styles from "./styles.module.scss";

const AddModal: React.FC<{ children: React.ReactNode; title: string }> = ({
  children,
  title,
}) => {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
      <button onClick={openModal}>Adicionar</button>
      <Popup open={open} modal closeOnEscape onClose={closeModal}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h3>{title}</h3>
            <button className={styles.closeBtn} onClick={closeModal}>
              &times;
            </button>
          </div>
          {children}
        </div>
      </Popup>
    </>
  );
};

export default AddModal;
