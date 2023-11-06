import React from "react";

function TitleTablePesan({ title }) {
  return (
    <tr className='table-pesan header'>
      {title.map((item, index) => (
        <th className={item.style} key={index}>
          {item.title === "" ? <i className={`fas fa-star `} /> : item.title}
        </th>
      ))}
    </tr>
  );
}

export default TitleTablePesan;
