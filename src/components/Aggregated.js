import React, { useState } from 'react';

export function Aggregated() {
  const [d, setD] = useState(0)
  const [s, setS] = useState(0)
  const [h, setH] = useState(0)
  const [c, setC] = useState(0.0)
  const q = berechneOptimaleBestellmenge(d, s, h, c)
  const uB = umschlagBestand(q)
  const optLos = berechneOptimaleBestellmenge(d, s, h, c)
  const tc = gesamtKosten(c, d, s, q, uB, h)

  return (<div>
       Nachfrage (D): <input value={d} onChange={(e)=>{
    setD(parseFloat(e.target.value));
    }} />
       Bestellkosten (S): <input value={s} onChange={(e)=>{
    setS(parseFloat(e.target.value));
  }}/>
    Stückkosten (C): <input value={c} onChange={(e)=>{
    setC(parseFloat(e.target.value));
  }}/>
       Lagererhaltungssatz (h): <input type="number" step="0.01" value={h} onChange={(e)=>{
    setH(parseFloat(e.target.value));
  }}/> <br/>
       optimale Losgröße (q): {optLos}
       <br/>
       UmschlagBeatand (uB): {uB}
       <br/>
       GesamtKosten (TC): {tc}
    </div>
  )
}

function berechneOptimaleBestellmenge(nachfrage, bestellKosten, lagererhaltungssatz, stückkosten) {
  const opt = parseFloat(Math.sqrt((2*nachfrage *bestellKosten)/(lagererhaltungssatz*stückkosten)));
  return opt;
}

function umschlagBestand(optBestellmenge) {
  return optBestellmenge/2;
}

function gesamtKosten(c, d, s, q, uB, h) {
  return (c*d) + (s*(d/q))+(uB*h*c);
}