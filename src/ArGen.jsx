import { useEffect } from 'react';
import PropTypes from 'prop-types';
import 'aframe';
import 'ar.js';

const FoodAR = ({ food }) => {
  useEffect(() => {
    // Check for AR support
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('AR is not supported on this device. Please try on a mobile device with a camera.');
      return;
    }

    // Create the AR scene
    const scene = document.createElement('a-scene');
    scene.setAttribute('embedded', '');
    scene.setAttribute('arjs', 'sourceType: webcam; detectionMode: mono_and_matrix; matrixCodeType: 3x3;');

    // Add the Hiro marker
    const marker = document.createElement('a-marker');
    marker.setAttribute('type', 'pattern');
    marker.setAttribute('url', '/patterns/hiro.patt'); // Path to the Hiro marker pattern file
    marker.setAttribute('id', 'marker');

    // Add the 3D model
    const model = document.createElement('a-entity');
    model.setAttribute('gltf-model', food.model); // Use the selected food's model
    model.setAttribute('scale', '0.5 0.5 0.5');
    model.setAttribute('position', '0 0.5 0');
    model.setAttribute('rotation', '0 0 0');

    marker.appendChild(model);
    scene.appendChild(marker);

    // Add a camera
    const camera = document.createElement('a-entity');
    camera.setAttribute('camera', '');
    scene.appendChild(camera);

    // Append the scene to the body
    document.body.appendChild(scene);

    // Cleanup on component unmount
    return () => {
      document.body.removeChild(scene);
    };
  }, [food]);

  return (
    <div>
      <h2>Viewing {food.name} in AR</h2>
      <p>Scan the Hiro marker to see the 3D model.</p>
    </div>
  );
};

FoodAR.propTypes = {
  food: PropTypes.shape({
    name: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
  }).isRequired,
};

export default FoodAR;