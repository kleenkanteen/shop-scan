"use client";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import gpt4Vision from "./gpt4Vision";

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
            canvas.toBlob((blob) => {
              if (blob) {
                setImage(URL.createObjectURL(blob));
                sendPhoto(blob); // Pass the blob directly
              }
            }, "image/jpeg");
          }
        }, "image/jpeg");
      }
    }
  };

  const sendPhoto = async (photoBlob: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(photoBlob);
    reader.onloadend = async () => {
      const base64data = reader.result;
      if (typeof base64data === "string") {
        const base64Photo = base64data.split(",")[1];
        await fetch("/api/gpt4", {
          method: "POST",
          body: JSON.stringify({ photo: base64Photo }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    };
  };

  return (
    <>
      <video ref={videoPlayerRef} id="player" autoPlay></video>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      <button
        onClick={handleCapture}
        className="rounded-full bg-blue-500 px-2 py-2 font-bold text-white hover:bg-blue-700"
      >
        Click here to capture
      </button>
      {
        /*preview, remove for production*/ image && (
          <Image src={image} width={500} height={500} alt="Captured" />
        ) /*preview, remove for production*/
      }
    </>
  );
}
