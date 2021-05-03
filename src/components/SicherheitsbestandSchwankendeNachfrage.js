import React, { useState } from 'react';

export function SicherheitsbestandSchwankendeNachfrage() {
  const[fs, setFs] = useState(0.0);
  const[dN, setdN] = useState(0)
  const[sta, setSta] = useState(0)
  const[l, setL] = useState(0)
  const si = berechneSi(l, sta, fs);
  const[sl, setSl] = useState(0)
  const si_l = berechneSiLieferUnsicherheit(l, sta, dN, sl, fs);
  const[n, setN] = useState(0)
  const si_a = berechneSiAggregation(l, sta, n, fs);
  const bestellniveau = berechneBestellniveau(l,dN, sta, fs);

  return(<div>
    <h3>bei Unsicherer Nachfrage</h3>
    Fs^-1: <input type="number" step="0.01" value={fs} onChange={(e)=>{
    setFs(parseFloat(e.target.value))
  }}/>
    Durchchnittliche Nachfrage (dN)(: <input type="number" step="0.01" value={dN} onChange={(e)=>{
      setdN(parseFloat(e.target.value))
    }}/>
    Standardabweichung Nachfrage (sta)(: <input type="number" step="0.01" value={sta} onChange={(e)=>{
      setSta(parseFloat(e.target.value))
    }}/>
    Lieferzeit (l)(: <input type="number" step="0.01" value={l} onChange={(e)=>{
      setL(parseFloat(e.target.value))
    }}/>
    <br/>
    Sicherheitsbestand: {si}
    <br/>
    <br/>
    Bestellniveau: {bestellniveau}
    <br/>
    <h3>bei Lieferunsicherheit</h3>
    Standardabweichung Lieferzeit (sl)(: <input type="number" step="0.01" value={sl} onChange={(e)=>{
    setSl(parseFloat(e.target.value))
  }}/>
    <br/>
    Sicherheitsbestand: {si_l}
    <h3>bei Produktaggregation</h3>
    Anzahl verschiedner Produkte (n)(: <input type="number" step="0.01" value={n} onChange={(e)=>{
    setN(parseFloat(e.target.value))
  }}/> <br/>
    Sicherheitsbestand: {si_a}
  </div>)
}
function berechneSi(l, sta, fs) {
  const ol = parseFloat(Math.sqrt(l)*sta);
  const si = fs*ol
  return si;
}
function berechneSiLieferUnsicherheit(l, sta, d, sl, fs) {
  const ol = parseFloat(Math.sqrt(((l*Math.pow(sta, 2))+(Math.pow(d, 2)*Math.pow(sl, 2)))));
  const si = parseFloat(fs)*ol;
  return si;
}

function berechneSiAggregation(l, sta, n, fs) {
  const oa = Math.sqrt(n*Math.pow(sta, 2));
  const ol = Math.sqrt(l)*oa;
  const si = fs*ol;
  return si;
}

function berechneBestellniveau(l,dN, sta, fs) {
  const ol = Math.sqrt(l)*sta;
  const si = fs*ol;
  const bestellniveau = (dN*l)+si;
  return bestellniveau;
}