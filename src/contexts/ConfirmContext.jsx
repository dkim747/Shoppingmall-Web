import { createContext, useContext, useState } from "react";
import "../css/ConfirmContext.css";

export const ConfirmContext = createContext();

export const ConfirmDialog = ({children}) => {
    const [confirm, setConfirm] = useState({
        isOpen: false,
        message: '',
        onClickConfirm: () => {},
        onClickCancel: () => {}
    });

    const openConfirm = (message, onConfirm) => {    
        setConfirm({
            isOpen: true,
            message,
            onClickConfirm: () => {
                onConfirm();
                closeConfirm();
            },
            onClickCancel: () => {
                closeConfirm();
            }
        })
    
    };

    const closeConfirm = () => {
        setConfirm({
            isOpen: false,
            message: '',
            onClickConfirm: () => {},
            onClickCancel: () => {},
          });
    };

    return (
        <ConfirmContext.Provider value={{ openConfirm, closeConfirm }}>
          {children}
          {confirm.isOpen && (
            <div className="dialog-container">
              <p>{confirm.message}</p>
              <button onClick={confirm.onClickConfirm}>Confirm</button>
              <button onClick={confirm.onClickCancel}>Cancel</button>
            </div>
          )}
        </ConfirmContext.Provider>
      );
};

export const useConfirm = () => {
    const confirmContext = useContext(ConfirmContext);
    return confirmContext;
};