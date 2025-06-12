import React, { useState, useRef, useEffect } from "react";
import QRCode from "qrcode";

const QrGenerator = () => {
  const [link, setLink] = useState("");
  const [generate, setGenerate] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (generate && canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, link, (error) => {
        if (error) console.error(error);
      });
    }
  }, [generate, link]);

  const downloadQR = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "qr-ticket.png";
    a.click();
  };

  const handleGenerate = () => {
    if (link.trim() === "") return;
    setGenerate(true);
  };

  return (
    <div style={styles.container}>
      <h2>QR Ticket Generator</h2>
      <input
        type="text"
        value={link}
        placeholder="Enter your link"
        onChange={(e) => setLink(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleGenerate} style={styles.button}>
        Generate QR
      </button>

      {generate && (
        <div style={styles.qrContainer}>
          <canvas ref={canvasRef} />
          <p>{link}</p>
          <button onClick={downloadQR} style={styles.downloadButton}>
            Download QR Ticket
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "40px",
    fontFamily: "sans-serif",
  },
  input: {
    padding: "10px",
    width: "300px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginRight: "10px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    marginTop: "10px",
  },
  downloadButton: {
    marginTop: "20px",
    padding: "8px 16px",
    fontSize: "14px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  qrContainer: {
    marginTop: "20px",
  },
};

export default QrGenerator;
