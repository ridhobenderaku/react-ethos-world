import React, { useState, useEffect } from "react";

const CheckBox = ({ id, index, onChange, checkedAll, resetCheck }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    e.stopPropagation();
    onChange(id, index, !isChecked);
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    setIsChecked(checkedAll);
  }, [checkedAll]);

  useEffect(() => {
    setIsChecked(false);
  }, [resetCheck]);
  return (
    <input
      style={{ cursor: "pointer" }}
      type='checkbox'
      checked={isChecked}
      onChange={handleCheckboxChange}
      onClick={(e) => {
        e.stopPropagation();
      }}
    />
  );
};

export default CheckBox;
