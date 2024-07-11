import { useEffect, useRef } from "react";

type BonecoProps = {
  numTentativas: number;
};

export function Boneco({ numTentativas }: BonecoProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const estrutura = (context: CanvasRenderingContext2D) => {
    context.strokeStyle = "#000000";
    context.lineWidth = 10;
    context.beginPath();
    context.moveTo(175, 225);
    context.lineTo(5, 225);
    context.moveTo(40, 225);
    context.lineTo(25, 5);
    context.lineTo(100, 5);
    context.lineTo(100, 25);
    context.stroke();
  };

  const cabeca = (context: CanvasRenderingContext2D) => {
    context.lineWidth = 5;
    context.beginPath();
    context.arc(100, 50, 25, 0, Math.PI * 2, true);
    context.closePath();
    context.stroke();
  };

  const corpo = (context: CanvasRenderingContext2D) => {
    context.beginPath();
    context.moveTo(100, 75);
    context.lineTo(100, 140);
    context.stroke();
  };

  const braco_esq = (context: CanvasRenderingContext2D) => {
    context.beginPath();
    context.moveTo(100, 85);
    context.lineTo(140, 100);
    context.stroke();
  };
  const braco_dir = (context: CanvasRenderingContext2D) => {
    context.beginPath();
    context.moveTo(100, 85);
    context.lineTo(60, 100);
    context.stroke();
  };

  const perna_esq = (context: CanvasRenderingContext2D) => {
    context.beginPath();
    context.moveTo(100, 140);
    context.lineTo(80, 190);
    context.stroke();
    context.beginPath();
    context.moveTo(82, 190);
    context.lineTo(70, 185);
    context.stroke();
  };

  const perna_dir = (context: CanvasRenderingContext2D) => {
    context.beginPath();
    context.moveTo(100, 140);
    context.lineTo(125, 190);
    context.stroke();
    context.beginPath();
    context.moveTo(122, 190);
    context.lineTo(135, 185);
    context.stroke();
  };

  useEffect(() => {
    const PartesCorpo = [
      cabeca,
      corpo,
      braco_esq,
      braco_dir,
      perna_dir,
      perna_esq,
    ];

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        estrutura(ctx);
        PartesCorpo.slice(0, numTentativas).forEach((parte) => parte(ctx));
      }
    }
  }, [numTentativas]);

  return (
    <div id="container">
      <canvas
        ref={canvasRef}
        id="hangman"
        width="180"
        height="250"
        className="mx-auto mt-20 mb-20"
      ></canvas>
    </div>
  );
}
