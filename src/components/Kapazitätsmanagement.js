import React, { useState } from 'react';

export function Kapazitätsmanagement() {
  const [dn, SetDn] = useState(0);
  const [stdA, SetStdA] = useState(0);
  const [p1, SetP1] = useState(0);
  const [p2, SetP2] = useState(0);
  const [fs, SetFs] = useState(0);
  const [mtw_1, Setmtw_1] = useState(0);
  const [mtw_2, Setmtw_2] = useState(0);
  const [mtw_3, Setmtw_3] = useState(0);
  const [std_1, Setstd_1] = useState(0);
  const [std_2, Setstd_2] = useState(0);
  const [std_3, Setstd_3] = useState(0);
  const [p_1, Setp_1] = useState(0);
  const [p_2, Setp_2] = useState(0);
  const [p_3, Setp_3] = useState(0);

  const csl = berechneCSL(p1, p2);
  const y = berechneSicherheitabstand(dn, stdA, fs);
  const csl_3_1 = berechneCSL(p_1, p_3)
  const [fs_3_1, Setfs_3_1] = useState(0)
  const y3_1 = berechneSicherheitabstand(mtw_1,std_1, fs_3_1)
  const csl_3_2 = berechneCSL(p_2, p_3)
  const [fs_3_2, Setfs_3_2] = useState(0)
  const y3_2 = berechneSicherheitabstand(mtw_2,std_2, fs_3_2)
  const y2= y3_1+y3_2;
  const csl_2_1 = berechneCSL(p_1, p_2);
  const [fs_2_1, Setfs_2_1] = useState(0)
  const y2_1 = berechneSicherheitabstand(mtw_1,std_1, fs_2_1)

  const mtw2 = mtw_1 + mtw_2
  const std2 = berechneStd_b(std_1, std_2)
  const p2_b = berechnePreis(mtw_1, p_1, mtw_2, p_2, mtw2);
  const csl_2b = berechneCSL(p2_b, p_3);
  const [fs_2b, Setfs_2b] = useState(0)
  const y2_b = berechneSicherheitabstand(mtw2, std_2,fs_2b )

  const mtw1 = mtw_1
  const std1 = berechneStd_b(std_1, 0)
  const p1_b = berechnePreis(mtw_1, p_1, 0, 0, mtw1);
  const csl_1b = berechneCSL(p1_b, p_2);
  const [fs_1b, Setfs_1b] = useState(0)
  const y1_b = berechneSicherheitabstand(mtw_1, std_1,fs_1b )

  return (<div>
    <h3>Sicherheitsabstand</h3>
    Erwartungswer (dn): <input type="number" step="0.01" value={dn} onChange={(e)=>{
    SetDn(parseFloat(e.target.value))
  }}/>
    <br/>
    Standardabweichung (stdA): <input type="number" step="0.01" value={stdA} onChange={(e)=>{
    SetStdA(parseFloat(e.target.value))
  }}/>
    <br/>
    P1 : <input type="number" step="0.01" min="-5" value={p1} onChange={(e)=>{
    SetP1(parseFloat(e.target.value))
  }}/>
    <br/>
    P2 : <input type="number" step="0.01" min="-5" value={p2} onChange={(e)=>{
    SetP2(parseFloat(e.target.value))
  }}/>
    <br/>
  csl: {csl}
  <br/>
    Fs^-1 : <input type="number" step="0.01" min="-5" value={fs} onChange={(e)=>{
    SetFs(parseFloat(e.target.value))
  }}/>
    <br/>
  y*: {y}
  <h3>EMSR-a Heuristik</h3>
    <table>
      <thead>
      <tr>
        <td>Kategorie</td>
        <td>Mittlewert</td>
        <td>Standardabweichung</td>
        <td>preis</td>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td><input type="number" step="0.01" min="-5" value={1}/></td>
        <td><input type="number" step="0.01" min="-5" value={mtw_1} onChange={(e)=>{
          Setmtw_1(parseFloat(e.target.value))
        }}/></td>
        <td><input type="number" step="0.01" min="-5" value={std_1} onChange={(e)=>{
          Setstd_1(parseFloat(e.target.value))
        }}/></td>
        <td><input type="number" step="0.01" min="-5" value={p_1} onChange={(e)=>{
          Setp_1(parseFloat(e.target.value))
        }}/></td>
      </tr>
      <tr>
        <td><input type="number" step="0.01" min="-5" value={2}/></td>
        <td><input type="number" step="0.01" min="-5" value={mtw_2} onChange={(e)=>{
          Setmtw_2(parseFloat(e.target.value))
        }}/></td>
        <td><input type="number" step="0.01" min="-5" value={std_2} onChange={(e)=>{
          Setstd_2(parseFloat(e.target.value))
        }}/></td>
        <td><input type="number" step="0.01" min="-5" value={p_2} onChange={(e)=>{
          Setp_2(parseFloat(e.target.value))
        }}/></td>
      </tr>
      <tr>
        <td><input type="number" step="0.01" min="-5" value={3}/></td>
        <td><input type="number" step="0.01" min="-5" value={mtw_3} onChange={(e)=>{
          Setmtw_3(parseFloat(e.target.value))
        }}/></td>
        <td><input type="number" step="0.01" min="-5" value={std_3} onChange={(e)=>{
          Setstd_3(parseFloat(e.target.value))
        }}/></td>
        <td><input type="number" step="0.01" min="-5" value={p_3} onChange={(e)=>{
          Setp_3(parseFloat(e.target.value))
        }}/></td>
      </tr>
      </tbody>
    </table>
    <br/>
    <div>
      csl3_1: {csl_3_1}
      <br/>
      Fs^-1_3_1 : <input type="number" step="0.01" min="-5" value={fs_3_1} onChange={(e)=>{
      Setfs_3_1(parseFloat(e.target.value))
    }}/>
      <br/>
      y3_1: {y3_1}
    </div>
    <div>
      csl3_2: {csl_3_2}
      <br/>
      Fs^-1_3_2 : <input type="number" step="0.01" min="-5" value={fs_3_2} onChange={(e)=>{
      Setfs_3_2(parseFloat(e.target.value))
    }}/>
      <br/>
      y3_2: {y3_2}
    </div>
    <div>
      y2: {y2}
    </div>
    <div>
      csl2_1: {csl_2_1}
      <br/>
      Fs^-1_2_1 : <input type="number" step="0.01" min="-5" value={fs_2_1} onChange={(e)=>{
      Setfs_2_1(parseFloat(e.target.value))
    }}/>
      <br/>
      y1: {y2_1}
    </div>
    <h3>EMSR-b</h3>
    <div>
      Mittelwert mtw2 : {mtw2}
      <br/>
      Standartabweichung  std2 : {std2}
      <br/>
      Preisp2: {p2_b}
      <br/>
      csl_2b: {csl_2b}
      <br/>
      Fs^-1_2b : <input type="number" step="0.01" min="-5" value={fs_2b} onChange={(e)=>{
      Setfs_2b(parseFloat(e.target.value))
    }}/>
      <br/>
      y2b: {y2_b}
      <br/>
      Mittelwert mtw1 : {mtw1}
      <br/>
      Standartabweichung  std1 : {std1}
      <br/>
      Preisp1: {p1_b}
      <br/>
      csl_1b: {csl_1b}
      <br/>
      Fs^-1_1b : <input type="number" step="0.01" min="-5" value={fs_1b} onChange={(e)=>{
      Setfs_1b(parseFloat(e.target.value))
    }}/>
      <br/>
      y1b: {y1_b}
    </div>
  </div>)
}

function berechneCSL(p1, p2) {

  return 1-(p2/p1).toFixed(2);
}

function berechneSicherheitabstand(dn, stdA, fs) {
  return dn+(stdA*fs);
}

function berechneStd_b(std_1, std_2) {
  const sum = Math.pow(std_1,2)+Math.pow(std_2, 2)
  return Math.sqrt(sum);
}

function berechnePreis(mtw_1, p_1, mtw_2, p_2, mtw2) {
  return (( (mtw_1*p_1) + (mtw_2*p_2) )/mtw2);
}