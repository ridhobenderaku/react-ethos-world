import React from "react";

export default function Card({ name, title, body, footer }) {
  return (
    <div className="card" name={name}>
      <div className="card-header">
        <div className="card-title w-100">{title}</div>
      </div>
      <div className="card-body">{body}</div>
      <div className="card-footer">{footer}</div>
    </div>
  );
}
