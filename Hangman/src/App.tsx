/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useState } from "react";
import palavras from "./palavras.json";
import { Boneco } from "./Boneco";
import { Palavra } from "./Palavra";
import { Teclado } from "./Teclado";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// Função para remover acentos
const removeAcentos = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

function App() {
  const [palavraOriginal, setPalavraOriginal] = useState(() => {
    return palavras[Math.floor(Math.random() * palavras.length)];
  });
  const [palavra, setPalavra] = useState(() => {
    return removeAcentos(palavraOriginal);
  });

  const [tentativa, setTentativa] = useState<string[]>([]);

  const letrasIncorretas = tentativa.filter(
    (letra) => !palavra.includes(letra)
  );
  const letrasCorretas = tentativa.filter((letra) => palavra.includes(letra));

  const perdeu = letrasIncorretas.length >= 6;
  const ganhou = palavra.split("").every((letra) => tentativa.includes(letra));

  useEffect(() => {
    if (ganhou) {
      const ganhouModal = document.getElementById(
        "ganhou_modal"
      ) as HTMLDialogElement | null;
      if (ganhouModal) {
        ganhouModal.showModal();
      }
    }
    if (perdeu) {
      const perdeuModal = document.getElementById(
        "perdeu_modal"
      ) as HTMLDialogElement | null;
      if (perdeuModal) {
        perdeuModal.showModal();
      }
    }
  }, [ganhou, perdeu]);

  const addTentativa = useCallback(
    (letra: string) => {
      if (tentativa.includes(letra) || ganhou || perdeu) return;

      setTentativa((prevTentativas) => [...prevTentativas, letra]);
    },
    [tentativa, ganhou, perdeu]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addTentativa(key);
    };
    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [addTentativa]);

  return (
    <div className=" bg-base-100 h-screen w-screen disable-dbl-tap-zoom font-mono select-none ">
      <div className="flex flex-col justify-center items-center">
        {ganhou && (
          <dialog id="ganhou_modal" className="modal text-center">
            <div className="modal-box">
              <h3 className="font-bold text-4xl">Parabéns Ganhou!</h3>
              <span className="py-4">
                <script
                  src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs"
                  type="module"
                ></script>
                <DotLottieReact
                  src="https://lottie.host/908cabf7-ff69-4b45-8667-82e72f08ceff/M63O2FdzQl.json"
                  loop
                  autoplay
                  className="w-300 h-300"
                ></DotLottieReact>
              </span>
              <div className="modal-action">
                <form method="dialog" className="w-full flex justify-between">
                  <button
                    className="btn"
                    onClick={() => window.location.reload()}
                  >
                    Jogar Novamente
                  </button>
                  <button className="btn">Sair para Menu</button>
                </form>
              </div>
            </div>
          </dialog>
        )}
        {perdeu && (
          <dialog id="perdeu_modal" className="modal">
            <div className="modal-box text-center">
              <h3 className="font-bold text-4xl">Oh Perdeu ...</h3>
              <span className="py-4">
                <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
                <DotLottieReact
                  src="https://lottie.host/5e36f956-c55f-440d-9eb2-5f51af5d8779/zGloSikxZO.json"
                  loop
                  autoplay
                ></DotLottieReact>
              </span>
              <div className="modal-action">
                <form method="dialog" className="w-full flex justify-between">
                  <button
                    className="btn"
                    onClick={() => window.location.reload()}
                  >
                    Jogar Novamente
                  </button>
                  <button className="btn">Sair para Menu</button>
                </form>
              </div>
            </div>
          </dialog>
        )}
      </div>
      <Boneco numTentativas={letrasIncorretas.length} />
      <Palavra
        palavraOriginal={palavraOriginal}
        tentativa={tentativa}
        revelar={perdeu}
        removeAcentos={removeAcentos}
      />
      <div className="self-stretch">
        <Teclado
          disabled={ganhou || perdeu}
          letrasUsadas={tentativa}
          letrasInativas={letrasIncorretas}
          addTentativa={addTentativa}
          letrasCorretas={letrasCorretas}
        />
      </div>
    </div>
  );
}

export default App;
