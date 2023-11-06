import React from "react";
import { Routes, Route } from "react-router-dom";

import project from "../pages/project/index";
import DetailProject from "../pages/project/detailProject";

import agenda from "../pages/agenda/index";
import { Home } from "../pages/home";
import Login from "../pages/login/login";

import meeting from "../pages/meeting/index";
import DetailMeeting from "../pages/meeting/detailMeeting";

import pesan from "../pages/pesan/index";
import BerbintangPesan from "../pages/pesan/berbintangPesan";
import TerkirimPesan from "../pages/pesan/terkirimPesan";
import DraftPesan from "../pages/pesan/draftPesan";
import ArsipPesan from "../pages/pesan/arsipPesan";
import SampahPesan from "../pages/pesan/sampahPesan";
import BuatPesan from "../pages/pesan/buatPesan";
import KontakMasukPesan from "../pages/pesan/kontakMasukPesan";
import DetailPesan from "../pages/pesan/detailPesan";

import ide from "../pages/ide";
import ArsipIde from "../pages/ide/arsipIde";
import BerbagiIde from "../pages/ide/berbagiIde";
import BerbintangIde from "../pages/ide/berbintangIde";
import BuatIde from "../pages/ide/buatIde";
import SampahIde from "../pages/ide/sampahIde";
import RuangIde from "../pages/ide/ruangIde";
import DetailIde from "../pages/ide/detailIde";

import MemoPengajuan from "../pages/memo/creator/pengajuanMemo";
import BerbintangMemo from "../pages/memo/creator/berbintangMemo";
import TerkirimMemo from "../pages/memo/creator/terkirimMemo";
import ArsipMemo from "../pages/memo/creator/arsipMemo";
import SampahMemo from "../pages/memo/creator/sampahMemo";
import TambahMemo from "../pages/memo/creator/tambahMemo";
import PegawaiMemo from "../pages/memo/creator/index";
import DetailMemoCreator from "../pages/memo/creator/detailMemoCreator";
import DisetujuiMemo from "../pages/memo/creator/disetujuiMemo";

import Dokumentasi from "../pages/dokumentasi/index";
import Partnership from "../pages/partnership/index";
import Ruangkantor from "../pages/kantor/index";
import EditPesan from "../pages/pesan/editPesan";
function PegawaiRouter() {
  return (
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route
        exact
        path='/login'
        name='Login Page'
        render={(props) => <Login {...props} />}
      />
      <Route path='/login' Component={Login} />

      <Route path='/ide' Component={ide}>
        <Route path='ruangide' Component={RuangIde} />
        <Route
          path='ruangide/:id'
          Component={() => <DetailIde type='ruangIde' />}
        />

        <Route path='berbintang' Component={BerbintangIde} />
        <Route
          path='berbintang/:id'
          Component={() => <DetailIde type='berbintang' />}
        />
        <Route path='berbagiide' Component={BerbagiIde} />
        <Route
          path='berbagiide/:id'
          Component={() => <DetailIde type='berbagiIde' />}
        />
        <Route path='arsip' Component={ArsipIde} />
        <Route path='arsip/:id' Component={() => <DetailIde type='arsip' />} />
        <Route path='sampah' Component={SampahIde} />
        <Route
          path='sampah/:id'
          Component={() => <DetailIde type='sampah' />}
        />
        <Route path='buatide' Component={BuatIde} />
      </Route>

      <Route path='/project' Component={project}></Route>
      <Route path='project/:id' Component={() => <DetailProject />} />

      <Route path='/agenda' Component={agenda} />

      <Route path='/meeting' Component={meeting} />
      <Route path='meeting/:id' Component={() => <DetailMeeting />} />

      <Route path='/memo' Component={PegawaiMemo}>
        <Route path='pengajuan' Component={MemoPengajuan} />
        <Route
          path='pengajuan/:id'
          Component={() => <DetailMemoCreator type='memo' />}
        />
        <Route path='berbintang' Component={BerbintangMemo} />
        <Route
          path='berbintang/:id'
          Component={() => <DetailMemoCreator type='memo' />}
        />
        <Route path='disetujui' Component={DisetujuiMemo} />
        <Route
          path='disetujui/:id'
          Component={() => <DetailMemoCreator type='arsip' />}
        />
        <Route path='terkirim' Component={TerkirimMemo} />
        <Route
          path='terkirim/:id'
          Component={() => <DetailMemoCreator type='arsip' />}
        />
        <Route path='arsip' Component={ArsipMemo} />
        <Route
          path='arsip/:id'
          Component={() => <DetailMemoCreator type='arsip' />}
        />
        <Route path='sampah' Component={SampahMemo} />
        <Route
          path='sampah/:id'
          Component={() => <DetailMemoCreator type='memo' />}
        />
        <Route path='buatmemo' Component={TambahMemo} />
      </Route>

      <Route path='/pesan' Component={pesan}>
        <Route path='kontakmasuk' Component={KontakMasukPesan} />
        <Route
          path='kontakmasuk/pesan/:id'
          Component={() => <DetailPesan type='kontakmasuk' />}
        />
        <Route
          path='kontakmasuk/memo/:id'
          Component={() => <DetailMemoCreator type='arsip' />}
        />
        <Route path='berbintang' Component={BerbintangPesan} />
        <Route
          path='berbintang/:id'
          Component={() => <DetailPesan type='berbintang' />}
        />
        <Route path='terkirim' Component={TerkirimPesan} />
        <Route
          path='terkirim/:id'
          Component={() => <DetailPesan type='terkirim' />}
        />
        <Route path='draft' Component={DraftPesan} />
        <Route path='draft/:id' Component={() => <EditPesan />} />
        <Route path='arsip' Component={ArsipPesan} />
        <Route
          path='arsip/:id'
          Component={() => <DetailPesan type='arsip' />}
        />
        <Route path='sampah' Component={SampahPesan} />
        <Route
          path='sampah/:id'
          Component={() => <DetailPesan type='sampah' />}
        />
        <Route path='buatpesan' Component={BuatPesan} />
      </Route>
      <Route path='dokumentasi' Component={Dokumentasi}></Route>
      <Route path='/partnership' Component={Partnership}></Route>
      <Route path='/ruangkantor' Component={Ruangkantor} />
    </Routes>
  );
}

export default PegawaiRouter;