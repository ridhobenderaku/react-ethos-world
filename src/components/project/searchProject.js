import React from "react";

export default function SearchProject({
  handleSearch,
  className,
  placeholder,
  value,
  onChange,
}) {
  return (
    <>
      <form className='input-group'>
        <input
          value={value}
          onChange={onChange}
          className={`form-control ${className}`}
          type='search'
          placeholder={placeholder}
          aria-label='Search'
        />
        <div className='input-group-append bg-success rounded-right'>
          <button
            className='btn btn-success'
            type='submit'
            onClick={handleSearch}>
            <i className='fas fa-search'></i>
          </button>
        </div>
      </form>
    </>
  );
}
