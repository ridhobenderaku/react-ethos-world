import Lampiran from "../../lampiran";
import Table from "./table";
import ViewMember from "../viewMember";
import ProgesBar from "../progesBar";
import { convertToDateTimeWithName } from "../../../utils/dateConversion";

function ViewDetailProject({ dataProject, handleBack }) {
  const {
    judul,
    isi,
    filenya,
    progres,
    sts,
    tglawal,
    tglakhir,
    anggota,
    pemilik,
  } = dataProject;
  return (
    <>
      <section className='p-3'>
        <Table
          name='detail project'
          Header={
            <>
              <ul className='nav nav-tabs card-header p-0'>
                <li className='nav-item'>
                  <a
                    style={{ gap: "5px" }}
                    className='nav-link active d-flex align-items-center'
                    id='detailProject'
                    data-toggle='pill'
                    href='#detailProject'
                    role='tab'
                    aria-controls='detailProject'
                    aria-selected='true'>
                    <h5 className='p-0 m-0'>Ikhtisar</h5>
                  </a>
                </li>
              </ul>
            </>
          }
          Content={
            <>
              <div className='py-3 px-2 d-flex flex-column flex-sm-row'>
                <div className='border-right col-12 col-sm-6'>
                  <div className='col d-flex flex-column mt-2 mb-2'>
                    <h5 style={{ color: "#619A3F" }}>Deskripsi Project</h5>
                    <p>{isi}</p>
                  </div>
                  <div className='col d-flex flex-column mt-2 mb-2'>
                    <h5 style={{ color: "#619A3F" }}>Lampiran</h5>
                    <Lampiran data={filenya} />
                  </div>
                </div>
                <div className='d-flex flex-column col-12 col-sm-6'>
                  <div className='border-bottom'>
                    <div
                      style={{ color: "#619A3F" }}
                      className='col d-flex flex-column mt-2 mb-2'>
                      <h5>Progess Project</h5>
                      <ProgesBar value={progres} />
                    </div>
                    <div className='col d-flex justify-content-md-between p-0  mt-2 mb-2'>
                      <div className='col d-flex flex-column '>
                        <h5 style={{ color: "#619A3F" }}>Status Project</h5>
                        <p>{sts}</p>
                      </div>
                      <div className='col d-flex flex-column'>
                        <h5 style={{ color: "#619A3F" }}>Timeline Project</h5>
                        <p>
                          {convertToDateTimeWithName(new Date(tglawal)) +
                            " - " +
                            convertToDateTimeWithName(new Date(tglakhir))}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className='col d-flex flex-column mt-2 mb-4'>
                      <h5 style={{ color: "#619A3F" }}> Anggota Project</h5>
                      <div className='row'>
                        <ViewMember
                          title='pemilik'
                          name={pemilik}
                          styles='col  col-12 col-md-6 d-flex align-items-center mt-3'
                          styleContent='col d-flex flex-column p-0 m-0 '
                        />
                        {anggota.length > 0 &&
                          anggota.map((data, index) => (
                            <ViewMember
                              key={index}
                              title={data.editor}
                              name={data.label}
                              styleContent='col d-flex flex-column p-0 m-0 '
                              styles='col  col-12 col-md-6 d-flex align-items-center mt-3'
                            />
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          }
          Footer={<></>}
        />
      </section>
    </>
  );
}

export default ViewDetailProject;
