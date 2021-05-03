import {Aggregated} from "./components/Aggregated.js";
import {SicherheitsbestandSchwankendeNachfrage} from "./components/SicherheitsbestandSchwankendeNachfrage.js";
import {SC_Optimum} from "./components/SC-Optimum.js";
import {Kapazitätsmanagement} from "./components/Kapazitätsmanagement.js";

function App() {
  return (
    <div >
      <h2>Aggregation</h2>
      <Aggregated/>
      <h2>Bestimmung von Sicherheitsbestände</h2>
      <SicherheitsbestandSchwankendeNachfrage/>
      <h2>SC Optimum berechnen</h2>
      <SC_Optimum/>
      <h2>Kapazitäts Management</h2>
      <Kapazitätsmanagement/>
    </div>
  );
}

export default App;
