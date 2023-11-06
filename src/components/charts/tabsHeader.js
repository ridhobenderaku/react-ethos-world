import React from "react";
import { NumericFormat } from "react-number-format";
const TabsHeader = (props) => {
  return (
    <div className='form-group' style={{ textAlign: "center" }}>
      <div className='row text-center'>
        <div className='col-md-3'>
          <div className='card card-success'>
            <div className='card-header'>
              <div className='card-bbs-header'>
                <p className='' style={{ fontSize: "12px" }}>
                  {props.titleCard1}
                </p>
              </div>
            </div>
            <div className='card-body-bbs'>
              <p style={{ fontSize: "20px" }}>
                <NumericFormat
                  displayType='text'
                  thousandSeparator=','
                  value={props.bodyCard1}
                />
              </p>
            </div>
          </div>
        </div>
        <div className='col-md-3'>
          <div className='card card-success'>
            <div className='card-header'>
              <div className='card-bbs-header'>
                <p className='' style={{ fontSize: "12px" }}>
                  {props.titleCard2}
                </p>
              </div>
            </div>
            <div className='card-body-bbs'>
              <p style={{ fontSize: "20px" }}>
                <NumericFormat
                  displayType='text'
                  thousandSeparator=','
                  value={props.bodyCard2}
                />
              </p>
            </div>
          </div>
        </div>
        <div className='col-md-3'>
          <div className='card card-success'>
            <div className='card-header'>
              <div className='card-bbs-header'>
                <p className='' style={{ fontSize: "12px" }}>
                  {props.titleCard3}
                </p>
              </div>
            </div>
            <div className='card-body-bbs'>
              <p style={{ fontSize: "20px" }}>
                <NumericFormat
                  displayType='text'
                  thousandSeparator=','
                  value={props.bodyCard3}
                />
              </p>
            </div>
          </div>
        </div>
        <div className='col-md-3'>
          <div className='card card-success'>
            <div className='card-header'>
              <div className='card-bbs-header'>
                <p className='' style={{ fontSize: "12px" }}>
                  {props.titleCard4}
                </p>
              </div>
            </div>
            <div className='card-body-bbs'>
              <p style={{ fontSize: "20px" }}>
                <NumericFormat
                  displayType='text'
                  thousandSeparator=','
                  value={props.bodyCard4}
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabsHeader;
