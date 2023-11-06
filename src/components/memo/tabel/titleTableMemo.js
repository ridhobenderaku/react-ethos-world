import React from "react";

function TitleTableMemo({ title }) {
  return (
    <tr className='table-memo header'>
      {title.map((item, index) => (
        <th className={item.style} key={index}>
          {item.title === "" ? <i className={`fas fa-star `} /> : item.title}
        </th>
      ))}
    </tr>
  );
}

export default TitleTableMemo;
