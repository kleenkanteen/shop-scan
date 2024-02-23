"use client";
import Image from "next/image";
import Link from "next/link";
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
      <button
        onClick={handleCapture}
        className="rounded-full bg-blue-500 px-2 py-2 font-bold text-white hover:bg-blue-700"
      >
        Click here to capture
      </button>
      <Link href="/inventory" className="ml-5">
        My Inventory
      </Link>

      {image && <Image src={image} width={500} height={500} alt="Captured" />}
    </>
  );
}
