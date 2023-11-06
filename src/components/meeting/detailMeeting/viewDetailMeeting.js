import Lampiran from "../../lampiran";
import { ViewMember } from "./ViewMember";
import Table from "./table";

function ViewDetailMeeting({ dataMeeting, handleBack }) {
  const {
    id,
    judul,
    namapembuat,
    anggota,
    alamat,
    jenis,
    tglAwal,
    tglAkhir,
    filenya,
    isinya,
  } = dataMeeting;

  return (
    <section className='pl-3 pr-3 pb-3'>
      <Table
        Content={
          <>
            <div className='py-3 px-2 d-flex flex-column flex-sm-row'>
              <div className='col-12 col-sm-6 border-right'>
                <div className='col d-flex flex-column mt-2 mb-4'>
                  <h5 style={{ color: "#619A3F" }}>
                    Tanggal dan Waktu Meeting
                  </h5>
                  <div className='row'>
                    <div className='col'>
                      <p className='m-0'>Start</p>
                      <p>{new Date(tglAwal).toLocaleString()}</p>
                    </div>
                    <div className='col'>
                      <p className='m-0'>End</p>
                      <p>{new Date(tglAkhir).toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className='col d-flex flex-column mt-2 mb-4'>
                  <h5 style={{ color: "#619A3F" }}>Jenis Meeting</h5>
                  <p>{jenis}</p>
                </div>

                <div className='col d-flex flex-column mt-2 mb-4'>
                  <h5 style={{ color: "#619A3F" }}>Alamat/Link Meeting</h5>
                  <p>{alamat}</p>
                </div>
                <div className='col d-flex flex-column mt-2 mb-4'>
                  <h5 style={{ color: "#619A3F" }}>Deskripsi Meeting</h5>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: isinya,
                    }}
                  />
                </div>
              </div>
              <div className='col-12 col-sm-6 '>
                <div className='col d-flex flex-column mt-2 mb-4'>
                  <h5 style={{ color: "#619A3F" }}> Anggota Meeting</h5>
                  <div className='row'>
                    <ViewMember title='pemilik' name={namapembuat} />
                    {anggota.length > 0 &&
                      anggota.map((data, index) => (
                        <ViewMember
                          key={index}
                          title={data.editor}
                          name={data.label}
                        />
                      ))}
                  </div>
                </div>
                <div className='col d-flex flex-column mt-2 mb-2'>
                  <h5 style={{ color: "#619A3F" }}>Lampiran</h5>
                  <Lampiran data={filenya} />
                </div>
              </div>
            </div>
          </>
        }
        Footer={<></>}
      />
    </section>
  );
}

export default ViewDetailMeeting;
