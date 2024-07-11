type PalavraProps = {
  tentativa: string[];
  palavraOriginal: string;
  revelar?: boolean;
  removeAcentos: (s: string) => string;
};

export function Palavra({
  tentativa,
  palavraOriginal,
  revelar = false,
  removeAcentos,
}: PalavraProps) {
  return (
    <div className="flex gap-4 font-mono font-bold text-6xl uppercase mx-auto mb-20 justify-center">
      {palavraOriginal.split("").map((letra, index) => (
        <span className="border-b-8 border-black" key={index}>
          <span
            style={{
              visibility:
                tentativa.includes(removeAcentos(letra)) || revelar
                  ? "visible"
                  : "hidden",
              color:
                !tentativa.includes(removeAcentos(letra)) && revelar
                  ? "red"
                  : "black",
            }}
          >
            {letra}
          </span>
        </span>
      ))}
    </div>
  );
}
