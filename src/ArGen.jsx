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
  }, [food]);

  return (
    <div>
      <h2>Viewing {food.name} in AR</h2>
      <p>Scan the Hiro marker to see the 3D model.</p>

      {/* A-Frame Scene */}
      <a-scene embedded arjs="sourceType: webcam; debugUIEnabled: false;">
        {/* Assets */}
        <a-assets>
          <a-asset-item id="model" src={food.model}></a-asset-item>
        </a-assets>

        {/* Marker */}
        <a-marker preset="hiro">
          <a-entity
            gltf-model="#model"
            scale="0.5 0.5 0.5"
            position="0 0.5 0"
            rotation="0 0 0"
          ></a-entity>
        </a-marker>

        {/* Camera */}
        <a-entity camera></a-entity>
      </a-scene>
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