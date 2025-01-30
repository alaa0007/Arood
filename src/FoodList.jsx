import { useState } from 'react';
import FoodAR from './ArGen';

const FoodList = () => {
  const [selectedFood, setSelectedFood] = useState(null);

  const foods = [
    { id: 1, name: 'Helio', model: '/models/Helicopter.glb' },
    { id: 2, name: 'Heli', model: '/models/Helicopter.glb' },
    { id: 3, name: 'Helicopter', model: '/models/Helicopter.glb' },
  ];

  return (
    <div>
      <h1>Food Menu</h1>
      <ul>
        {foods.map((food) => (
          <li key={food.id}>
            <button onClick={() => setSelectedFood(food)}>
              View {food.name} in AR
            </button>
          </li>
        ))}
      </ul>

      {selectedFood && <FoodAR food={selectedFood} />}
    </div>
  );
};

export default FoodList;