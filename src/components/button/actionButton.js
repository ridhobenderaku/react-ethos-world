import React from "react";

export default function ActionButton({
  type,
  variant,
  className,
  dataToggle,
  dataTarget,
  dataDismis,
  onClick,
  disabled,
  icon,
  text,
  styles,
}) {
  return (
    <>
      <button
        style={styles}
        className={
          variant === "danger"
            ? `btn btn-danger ${className}`
            : variant === "success"
            ? `btn btn-success  ${className}`
            : variant === "primary"
            ? `btn btn-primary  ${className}`
            : `btn btn-default  ${className}`
        }
        data-toggle={dataToggle}
        data-target={dataTarget}
        data-dismiss={dataDismis}
        onClick={onClick}
        disabled={disabled}
        type={type}>
        <i className={`${icon}`} />
        {text}
      </button>
    </>
  );
}
