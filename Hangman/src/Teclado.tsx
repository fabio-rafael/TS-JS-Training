import styles from "./tecladoEstilos.module.css";

const Teclas = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

type TecladoProps = {
  letrasUsadas: string[];
  letrasInativas: string[];
  addTentativa: (letra: string) => void;
  disabled?: boolean;
  letrasCorretas: string[];
};

export function Teclado({
  letrasUsadas,
  letrasInativas,
  addTentativa,
  disabled = false,
  letrasCorretas,
}: TecladoProps) {
  return (
    <div className="grid grid-cols-6 gap-2 p-5">
      {Teclas.map((key) => {
        const estaAtivo = letrasUsadas.includes(key);
        const estaInativo = letrasInativas.includes(key);
        const estaCerta = letrasCorretas.includes(key);

        return (
          <button
            className={`${styles.btn} ${estaAtivo ? styles.active : ""}
            ${estaInativo ? styles.inactive : ""} ${
              estaCerta ? styles.certo : ""
            } max-h-8 max-w-70`}
            key={key}
            onClick={() => addTentativa(key)}
            disabled={estaAtivo || estaInativo || disabled}
          >
            {key}
          </button>
        );
      })}
    </div>
  );
}
