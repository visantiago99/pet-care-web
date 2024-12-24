import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="relative bg-gradient-to-br from-red-100 to-orange-400 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-20 flex flex-col lg:flex-row gap-10 items-center">
        {/* Left Side */}
        <div className="text-white space-y-6 flex-1">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            Adote um Amigo para Toda a Vida
          </h1>
          <p className="text-lg sm:text-xl">
            Descubra animais incríveis que esperam por um lar cheio de amor.
            Transforme sua vida e a deles com a adoção responsável.
          </p>
          <Button>Encontre seu Pet</Button>
        </div>

        {/* Right Side */}
        <div className="relative flex-1">
          <div className="absolute inset-0">
            <div className="absolute -top-8 -left-8 w-40 h-40 bg-red-300 rounded-full opacity-70"></div>
            <div className="absolute top-16 -right-12 w-56 h-56 bg-yellow-300 rounded-full opacity-70"></div>
            <div className="absolute bottom-10 -left-12 w-32 h-32 bg-white rounded-full opacity-70"></div>
          </div>
          <div className="relative">
            <img src="/images/pets.png" alt="Animais para adoção" />
          </div>
        </div>
      </div>
    </div>
  );
}
