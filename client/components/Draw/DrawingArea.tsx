import { KonvaEventObject } from "konva/lib/Node";
import React, {
  FC,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { Layer, Line, Stage } from "react-konva";

const DrawingArea: FC<{}> = () => {
  const canvasref = useRef<HTMLCanvasElement>();
  const contextRef = useRef<CanvasRenderingContext2D>();
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  useEffect(() => {
    const canvas = canvasref.current;
    canvas.width = 1000;
    canvas.height = 500;

    canvas.style.width = "1000px";
    canvas.style.height = "80%";

    canvas.style.backgroundColor = "#fff";
    canvas.style.borderRadius = "1rem";

    const context = canvas.getContext("2d");
    context.scale(1, 1);
    context.lineCap = "square";
    context.strokeStyle = "black";
    context.lineWidth = 2;
    contextRef.current = context;
  }, []);

  const drawing = ({ nativeEvent }: React.MouseEvent) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const startDrawing = ({ nativeEvent }: React.MouseEvent) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  return (
    <canvas
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={drawing}
      ref={canvasref}
    ></canvas>
  );
};
export default DrawingArea;
