import JumlahOutlet from "./jumlahoutlet";
import Kontribusiofflinesellin from "./kontribusiofflinesellin";
import Pencapaianofflinesales from "./pencapaianofflinesales";
import PerbandinganSellIn from "./perbandingansell";

function OfflineIndex({ dataChart, setUpdate }) {
  return (
    <div
      className='tab-pane fade'
      id='custom-tabs-four-offline'
      role='tabpanel'
      aria-labelledby='custom-tabs-four-offline-tab'>
      <Pencapaianofflinesales
        dataChart={dataChart ? dataChart.pencapaianofflinesales : null}
        setUpdate={setUpdate}
      />
      <Kontribusiofflinesellin
        dataChart={dataChart ? dataChart.kontribusiofflinesellin : null}
        setUpdate={setUpdate}
      />
      <PerbandinganSellIn
        dataChart={dataChart ? dataChart.perbandinganofflineqty : null}
        setUpdate={setUpdate}
      />
      <JumlahOutlet
        dataChart={dataChart ? dataChart.jumlahoutletoffline : null}
        setUpdate={setUpdate}
      />
    </div>
  );
}

export default OfflineIndex;
