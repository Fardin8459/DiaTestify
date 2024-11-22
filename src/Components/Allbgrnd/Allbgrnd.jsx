import React from 'react';
import Particles from 'react-tsparticles';

function Bgrnd() {
  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <Particles
        id="tsparticles"
        options={{
          background: { color: { value: "#000000" } },
          particles: {
            number: { value: 50 },
            size: { value: 3 },
            move: { enable: true, speed: 1 },
            opacity: { value: 0.5 },
            color: { value: "#ffffff" },
            links: { enable: true, color: "#ffffff", opacity: 0.3 },
          },
        }}
        style={{ position: 'absolute', top: 0 }}
      />
      <h1 style={{ color: 'white', textAlign: 'center', paddingTop: '40vh', position: 'relative', zIndex: 1 }}>
        Particle Background Example
      </h1>
    </div>
  );
}

export default Bgrnd;
