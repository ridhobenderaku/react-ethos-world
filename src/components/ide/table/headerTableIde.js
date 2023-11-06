import React, { useEffect } from "react";

export function HeaderTableIde({
  headerMenu,
  setActiveTab,
  handleSearch,
  search,
  setSearch,
}) {
  const handleInputSearch = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    if (headerMenu) setActiveTab(headerMenu[0].title);
  }, []);

  return (
    <div className='card-header p-0 pt-0 d-flex flex-column flex-sm-row align-items-center justify-content-sm-between'>
      <ul className='nav nav-tabs mb-2 mb-sm-0 align-self-start' role='tablist'>
        {headerMenu &&
          headerMenu.map((data, index) => (
            <li key={index} className='nav-item '>
              <a
                style={{ gap: "5px" }}
                className={`nav-link ${
                  index === 0 ? "active" : null
                } d-flex align-items-center`}
                id={`${data.title}-tab`}
                data-toggle='pill'
                href={`#${data.title}`}
                role='tab'
                aria-controls={`${data.title}`}
                aria-selected='true'
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(data.title);
                }}>
                <i className={data.icon} />
                {data.title}
              </a>
            </li>
          ))}
      </ul>
      <div className='card-tools mb-3 mb-sm-0 '>
        <form className='input-group input-group-sm'>
          <input
            value={search}
            onChange={handleInputSearch}
            type='text'
            className='form-control'
            placeholder='Search ide'
          />
          <div className='input-group-append pb-2'>
            <button onClick={handleSearch} className='btn btn-success'>
              <i className='fas fa-search' />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
