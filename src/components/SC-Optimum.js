import React, { useState } from 'react';

export function SC_Optimum() {
  const [cm, SetCm] = useState(0);
  const [cr, SetCr] = useState(0);
  const [p, SetP] = useState(0);
  const [s, SetS] = useState(0);
  const [dn, SetDn] = useState(0);
  const [stdA, SetStdA] = useState(0);

  // individuelle bestellmenge
  const [fs, SetFs] = useState(0);
  const [fz, SetFz] = useState(0);
  const cu = berechneUnterdeckung(p, cr);
  const co = berechneÜberdeckung(cr, s);
  const csl = berechneCSL(cu, co)
  const q = berechneQ(fs, stdA, dn);
  const gR = gewinnHaender(cu, co,dn, fz,stdA);
  const gM = gewinnHersteller(q, cr, cm);
  const gg = gR + gM;

  // opmiale bestellmenge nach SC
  const [fs_sc, SetFs_Sc] = useState(0);
  const [fz_sc, SetFz_sc] = useState(0);
  const cu_sc = berechneUnterdeckung(p, cm);
  const co_sc = berechneÜberdeckung(cm, s);
  const csl_sc = berechneCSL(cu_sc, co_sc)
  const q_sc = berechneQ(fs_sc, stdA, dn);
  const gg_sc = gewinnHaender(cu_sc, co_sc,dn, fz_sc, stdA);

  // rückkaufvertrag
  const [fs_r, SetFs_r] = useState(0);
  const [fz_r, SetFz_r] = useState(0);
  const b = berechneRückkaufbetrag(p, cm, s, cr);
  const cu_r = berechneUnterdeckung(p, cr);
  const co_r = berechneÜberdeckung(cr, b);
  const csl_r = berechneCSL(cu_r, co_r);
  const q_r = berechneQ(fs_r, stdA, dn);
  const gR_r = gewinnHaender(cu_r, co_r,dn, fz_r,stdA);
  const gM_r = gg_sc - gR_r;

  // umsatzbeteiligung
  const [cr_u, SetCr_u] = useState(0);
  const u = berechneUmsatzbeteiligung(s,p,cm,cr_u).toFixed(3);
  const gR_u = gewinnHaender_U(u,cr_u,p, s, dn, fz_sc,stdA);
  
  return(<div>
    <h3>bei unsicherer Nachfrage</h3>
    <h4>SC-optimum </h4>
    <h5>Individuelle Bestellmenge </h5>
    Hestellkosten (cm): <input type="number" step="0.01" value={cm} onChange={(e)=>{
    SetCm(parseFloat(e.target.value))
  }}/>
    <br/>
    Großhandelspreis (cr): <input type="number" step="0.01" value={cr} onChange={(e)=>{
    SetCr(parseFloat(e.target.value))
  }}/>
    <br/>
    Verkaufspreis (p): <input type="number" step="0.01" value={p} onChange={(e)=>{
    SetP(parseFloat(e.target.value))
  }}/>
    <br/>
    Verwertungspreis (s): <input type="number" step="0.01" value={s} onChange={(e)=>{
    SetS(parseFloat(e.target.value))
  }}/>
    <br/>
    Erwartungswert (dn): <input type="number" step="0.01" value={dn} onChange={(e)=>{
    SetDn(parseFloat(e.target.value))
  }}/>
    <br/>
    Standardabweichung (stdA): <input type="number" step="0.01" value={stdA} onChange={(e)=>{
    SetStdA(parseFloat(e.target.value))
  }}/>
    <br/>
    cu: {cu}
    <br/>
    co: {co}
    <br/>
    CSL*: {csl}
    <br/>
      Fs^-1 : <input type="number" step="0.01" min="-5" value={fs} onChange={(e)=>{
      SetFs(parseFloat(e.target.value))
    }}/>
      fz : <input type="number" step="0.01" min="-5" value={fz} onChange={(e)=>{
      SetFz(parseFloat(e.target.value))
    }}/>
    <br/>
    optimale Bestellmenge (Q*): {q}
    <br/>
    Gewinn des Händler: {gR}
    <br/>
    Gewinn des Hersteller: {gM}
    <br/>
    Gesamt Gewinn: {gg}
    <br/>
    <br/>
    <h5>Optimale Bestellmenge aus der Sicht der SC </h5>
    Cu_sc: {cu_sc}
    <br/>
    Co_sc: {co_sc}
    <br/>
    CSL*_sc: {csl_sc}
    <br/>
    Fs^-1 : <input type="number" step="0.01" min="-5" value={fs_sc} onChange={(e)=>{
    SetFs_Sc(parseFloat(e.target.value))
  }}/>
    fz : <input type="number" step="0.01" min="-5" value={fz_sc} onChange={(e)=>{
    SetFz_sc(parseFloat(e.target.value))
  }}/>
    <br/>
    Optimale Bestellmenge/Losgröße (Q*_sc): {q_sc}
    <br/>
    Gewinn der SC (Q*_sc): {gg_sc}
    <h5>Optimale Rücknahmebetrag</h5>
    b: {b}
    <br/>
    CSL*_r: {csl_r}
    <br/>
    Fs^-1 : <input type="number" step="0.01" min="-5" value={fs_r} onChange={(e)=>{
    SetFs_r(parseFloat(e.target.value))
  }}/>
    fz : <input type="number" step="0.01" min="-5" value={fz_r} onChange={(e)=>{
    SetFz_r(parseFloat(e.target.value))
  }}/>
    <br/>
    optimale Bestellmenge (Q*): {q_r}
    <br/>
    Gewinn des Händler: {gR_r}
    <br/>
    Gewinn des Hersteller: {gM_r}
    <br/>
    <h5>Umsatzbeteiligung</h5>
    Großhandelspreis (cr_u): <input type="number" step="0.01" value={cr_u} onChange={(e)=>{
    SetCr_u(parseFloat(e.target.value))
  }}/>
  <br/>
  u: {u}
  <br/>
    <br/>
    Gewinn des Händler: {gR_u}
  </div>)
}

function berechneUnterdeckung(p, cr) {
  return p-cr;
}

function berechneÜberdeckung(cr, s) {
  return cr-s;
}

function berechneCSL(cu, co) {
  return(cu/(cu+co));
}

function berechneQ(fs, stdA, dn) {
  return Math.round(fs*stdA+dn);
}
function gewinnHaender(cu, co, dn, fz,stdA) {
  return (cu*dn) - ((cu+co)*fz*stdA)
}
function gewinnHersteller(q, cr, cm) {
  return q*(cr-cm);
}

function berechneRückkaufbetrag(p, cm, s, cr) {
  return p*((cm-s)/(cm-p)) + cr*(((s-p)/(cm-p)));
}

function berechneUmsatzbeteiligung(s,p,cm,cr_u) {
  return s*((p-cm)/(p*(s-cm))) + cr_u*(((s-p)/(p*(s-cm))));
}
function gewinnHaender_U(u,cr_u,p, s, dn, fz,stdA) {
  console.log(u);
  console.log(cr_u);
  console.log(p);
  console.log(s);
  console.log(dn);
  console.log(fz);
  console.log(stdA);
  const a = (((u*p)-cr_u)*dn);
  const b = (((u*p)-s)*fz*stdA);
  console.log(a);
  console.log(b);


  return (((u*p)-cr_u)*dn) - (((u*p)-s)*fz*stdA)
}