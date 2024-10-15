import { useEffect, useState } from "react";
import "./App.css";

interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: string;
  medical_history: string;
  photo: string;
}

function App() {
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/pets", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setPets(data));
  }, []);

  return (
    <>
      <div className="flex flex-1 h-full gap-4">
        {pets.map((pet, index) => (
          <div className="border-red-500 border max-w-60" key={index}>
            <p>{pet.name}</p>
            <p>{pet.species}</p>
            <p>{pet.breed}</p>
            <p>{pet.age}</p>
            <p>{pet.medical_history}</p>
            <img src={pet.photo} />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
