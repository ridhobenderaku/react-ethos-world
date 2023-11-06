import React from "react";

function TitleTableIde({ title }) {
  return (
    <tr className='table-ide header'>
      {title.map((item, index) => (
        <th className={item.style} key={index}>
          {item.title === "" ? <i className={`fas fa-star `} /> : item.title}
        </th>
      ))}
    </tr>
  );
}

export default TitleTableIde;
