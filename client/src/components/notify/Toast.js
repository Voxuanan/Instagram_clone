import React from "react";

const Toast = ({ msg, handleShow, type }) => {
    const icons = {
        Success: "fas fa-check-circle",
        Info: "fas fa-info-circle",
        Error: "fas fa-exclamation-triangle",
    };

    return (
        <div id="toast_nofication">
            <div className={`toast_nofication toast_nofication--${type.toLowerCase()}`}>
                <div className={`toast_nofication_icon ${icons[type]}`}>
                    <i className="fas }" />
                </div>
                <div className="toast_nofication_body">
                    <h3 className="toast_nofication_tittle">{type}</h3>
                    <p className="toast_nofication_msg">{msg}</p>
                </div>
                <div className="toast_nofication_close">
                    <i className="fas fa-times" onClick={handleShow} />
                </div>
            </div>
        </div>
    );
};

export default Toast;
