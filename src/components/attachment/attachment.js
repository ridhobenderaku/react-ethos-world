import React from "react";

export default function Attachment({ handleUploadImage, isUploading }) {
  return (
    <>
      <div className='form-group mt-2'>
        <div
          style={{ width: "fit-content" }}
          className='btn btn-primary btn-file d-flex align-items-center'>
          {isUploading ? (
            <div className='spinner-border mr-2' role='status'></div>
          ) : (
            <i className='fas fa-paperclip mr-2' />
          )}

          <p className='text-center m-0 p-0'>
            {isUploading ? "Uploading" : "Attachment"}
          </p>
          {!isUploading && (
            <input
              accept='.jpeg,.svg,.jpg,.png,.WEBM,.pdf,.doc,.docx,.xlsx,.pptx,.xls,.ppt'
              type='file'
              multiple={false}
              name='attachment'
              onChange={handleUploadImage}
            />
          )}
        </div>
        <p className='help-block'>Max. 6MB</p>
      </div>
    </>
  );
}
