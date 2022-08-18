import { useState } from 'react';

import Sidebar from 'components/SideBar';

import { RegisterProjectType } from './Components/RegisterProjectType';

export function Infographics() {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  return (
    <>
      <Sidebar>
        <h1>Infographics</h1>
        <button onClick={() => setModalIsVisible(true)}>Modal</button>

        <RegisterProjectType
          onClose={() => setModalIsVisible(false)}
          onOpen={() => setModalIsVisible(false)}
          isOpen={modalIsVisible}
        />
      </Sidebar>
    </>
  );
}
