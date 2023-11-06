import React, { useState, useEffect } from "react";
import Pagination from "../pagination";
import { getUsers } from "../../api/pesanApi";

export function BoxControls({
  handleSelectAll,
  handleDeleteItem,
  handleRefresh,
  handleDecrementPages,
  handleIncrementPages,
  handleChangePage,
  currentPage,
  totalPages,
}) {
  const [isChecked, setIsChecked] = useState(false);

  const refresh = (e) => {
    e.preventDefault();
    getUsers().then((res) => {
      if (res) {
        sessionStorage.setItem("dataUsers", btoa(JSON.stringify(res)));
      }
    });
    handleRefresh();
  };
  return (
    <div className='mailbox-controls'>
      <div className='btn-group'>
        {handleDeleteItem && (
          <div className='btn btn-default btn-sm checkbox-toggle'>
            <input
              style={{ cursor: "pointer" }}
              type='checkbox'
              className=''
              checked={isChecked}
              onChange={(e) => {
                e.stopPropagation();
                handleSelectAll();
                setIsChecked(!isChecked);
              }}
            />
          </div>

          // <button
          //   type='button'
          //   onClick={handleSelectAll}
          //   className='btn btn-default btn-sm checkbox-toggle'>
          //   <i className='far fa-square' />
          // </button>
        )}
        {handleDeleteItem && (
          <button
            type='button'
            className='btn btn-default btn-sm'
            onClick={handleDeleteItem}>
            <i className='far fa-trash-alt' />
          </button>
        )}
        {/* <button type='button' className='btn btn-default btn-sm'>
          <i className='fas fa-reply' />
        </button>
        <button type='button' className='btn btn-default btn-sm'>
          <i className='fas fa-share' />
        </button> */}
        <button
          type='button'
          className='btn btn-default btn-sm'
          onClick={refresh}>
          <i className='fas fa-sync-alt' />
        </button>
      </div>

      <div className='float-right'>
        <Pagination
          total={totalPages}
          current={currentPage}
          pagination={(crPage) => handleChangePage(crPage)}
        />
      </div>
    </div>
  );
}
