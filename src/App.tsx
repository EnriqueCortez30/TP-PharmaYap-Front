import { useState } from 'react';
import Clientes from './Clientes';
import Mono from './Mono';

function App() {
  const [vista, setVista] = useState<'clientes' | 'mono'>('clientes');

  return (
    <>
      {vista === 'clientes' && <Clientes setVista={setVista} />}
      {vista === 'mono' && <Mono setVista={setVista} />}
    </>
  );
}

export default App;
