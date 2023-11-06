import React from "react";
import Produktifitas from "./prokduktifitas";
import ProduktivitasInternal from "./produktivitasinternal";
import ProduktivitasOffline from "./produktivitasOffline";

function ManpowerIndex({ dataChart, setUpdate }) {
  return (
    <div
      className='tab-pane fade'
      id='custom-tabs-four-manpower'
      role='tabpanel'
      aria-labelledby='custom-tabs-four-manpower-tab'>
      <Produktifitas
        dataChart={dataChart ? dataChart.manpowerinternal : null}
        setUpdate={setUpdate}
      />
      <ProduktivitasInternal
        dataChart={dataChart ? dataChart.manpowergroupinternal : null}
        setUpdate={setUpdate}
      />

      <ProduktivitasOffline
        dataChart={dataChart ? dataChart.manpoweroffline : null}
        setUpdate={setUpdate}
      />
    </div>
  );
}

export default ManpowerIndex;
