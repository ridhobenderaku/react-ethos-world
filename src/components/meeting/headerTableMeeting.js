import React, { useEffect } from "react";

import ActionButton from "../button/actionButton";
import CreateMeetingModal from "../../components/meeting/createMeetingModal";
import SearchProject from "../project/searchProject";

export function HeaderTableMeeting({
  headerMenu,
  setActiveTab,
  handleRefresh,
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
    <div className='card-header p-0 pt-0 d-flex flex-column-reverse flex-sm-row align-items-center justify-content-sm-between'>
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
      <div className='d-flex p-2 flex-column flex-sm-row align-items-center'>
        <div className='row  align-items-center mr-0 mr-sm-2 '>
          <button
            type='button'
            className='col-2 btn btn-default btn-sm'
            onClick={(e) => {
              e.preventDefault();
              handleRefresh();
            }}>
            <i className='fas fa-sync-alt' />
          </button>
          <div className='col-10 '>
            <ActionButton
              className='btn-block nama'
              text=' Buat Meeting'
              icon='fas fa-plus'
              dataToggle='modal'
              dataTarget='#createMeetingModal'
            />
            <CreateMeetingModal handleRefresh={handleRefresh} />
          </div>
        </div>

        <div className=' mt-2 mt-sm-0 mr-0 mr-sm-2'>
          <SearchProject
            value={search}
            handleSearch={handleSearch}
            onChange={handleInputSearch}
            placeholder='Cari Meeting'
          />
        </div>
      </div>
    </div>
  );
}
