"use client";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { supabase } from "./utils/supabase/client";
import { redirect } from "next/navigation";

export default function Cam() {
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState("");
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
                sendPhoto(blob);
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
        const response: any = await fetch("/api/gpt4-vision", {
          method: "POST",
          body: JSON.stringify({
            photo: base64Photo,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        let res = await response.json();

        if (res.status === 500) {
          setError("There is no product called like that!");
          return;
        }

        const { data: inventories } = await supabase.from("inventory").select();

        const product = inventories?.find(
          (prod) => prod.name === res.description.content,
        );

        if (product) {
          await supabase.from("cart").insert(product);
          setError("");
          redirect("/");
        }

        setError("There is no product like the one in your image!");
      }
    };
  };

  return (
    <div className="flex flex-col items-center">
      <video ref={videoPlayerRef} id="player" autoPlay></video>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      <button
        onClick={handleCapture}
        className="mx-auto w-1/3 rounded-full bg-blue-500 px-2 py-2 font-bold text-white hover:bg-blue-700"
      >
        Click here to capture
      </button>
      {error !== "" ? (
        <div className="mx-auto my-5 w-3/4 rounded-lg bg-red-400 p-2 text-center text-white">
          {error}
        </div>
      ) : null}

      {image && (
        <Image
          src={image}
          width={1000}
          height={1000}
          alt="Captured"
          className="px-5"
        />
      )}
    </div>
  );
}
