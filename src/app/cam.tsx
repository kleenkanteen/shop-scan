"use client";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

export default function Cam() {
  const [image, setImage] = useState<string | null>(null);
  const videoPlayerRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const initializeMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoPlayerRef.current) {
          videoPlayerRef.current.srcObject = stream;
        }
      } catch (error) {
        console.log("Error accessing camera:", error);
      }
    };

    initializeMedia();
  }, []);

  const handleCapture = () => {
    const video = videoPlayerRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        canvas.toBlob((blob) => {
          if (blob) {
            setImage(URL.createObjectURL(blob));
          }
        }, "image/jpeg");
      }
    }
  };

  return (
    <>
      <video ref={videoPlayerRef} id="player" autoPlay></video>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      <button onClick={handleCapture} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-full">
        Click here to capture
      </button>
      {image && <Image src={image} width={500} height={500} alt="Captured" />}
    </>
  );
}
