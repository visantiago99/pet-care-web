import { useEffect, useState } from "react";
import "./App.css";
import FormInputField from "./components/formInputField";

interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: string;
  medical_history: string;
  photo: string;
}

export type RegisterPetForm = Omit<Pet, "id" | "medical_history">;

function App() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [petRegisterForm, setPetRegisterForm] = useState<RegisterPetForm>({
    name: "",
    age: "",
    breed: "",
    species: "",
    photo: "",
  });

  useEffect(() => {
    fetch("http://localhost:3000/pets", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setPets(data));
  }, []);

  const handlePetFormOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPetRegisterForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(petRegisterForm);
  };

  const registerPetMutation = (petRegisterForm: RegisterPetForm) => {
    event?.preventDefault();
    // const { name, age, breed, species, photo } = petRegisterForm;

    const searchParams = new URLSearchParams();
    Object.entries(petRegisterForm).forEach((entry) => {
      if (entry[1]) {
        searchParams.append(...entry);
      }
    });

    fetch("http://localhost:3000/pets", {
      method: "POST",
      body: searchParams,
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <div className="flex flex-col gap-10">
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

      <div className="w-100">
        <form onSubmit={() => registerPetMutation(petRegisterForm)}>
          <fieldset className="flex flex-col gap-4">
            <FormInputField
              value={petRegisterForm.name}
              labelValue="Name"
              name="name"
              onChange={handlePetFormOnChange}
            />
            <FormInputField
              value={petRegisterForm.age}
              labelValue="Age"
              name="age"
              onChange={handlePetFormOnChange}
            />
            <FormInputField
              value={petRegisterForm.breed}
              labelValue="Breed"
              name="breed"
              onChange={handlePetFormOnChange}
            />
            <FormInputField
              value={petRegisterForm.species}
              labelValue="Species"
              name="species"
              onChange={handlePetFormOnChange}
            />
            <FormInputField
              value={petRegisterForm.photo}
              labelValue="Photo"
              name="photo"
              onChange={handlePetFormOnChange}
            />
          </fieldset>
          <button className="mt-6" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
