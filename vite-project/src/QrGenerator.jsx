import React, { useState } from "react";
import QRCode from "qrcode";

const QrGenerator = () => {
  const [link, setLink] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState("");

  const generateQR = async () => {
    try {
      const dataUrl = await QRCode.toDataURL(link);
      setQrDataUrl(dataUrl);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <h2>QR Code Generator</h2>
      <input
        type="text"
        value={link}
        placeholder="Enter your link"
        onChange={(e) => setLink(e.target.value)}
        style={styles.input}
      />
      <button onClick={generateQR} style={styles.button}>
        Generate QR
      </button>
      {qrDataUrl && (
        <div style={styles.qrContainer}>
          <img src={qrDataUrl} alt="QR Code" style={{ marginTop: "20px" }} />
          <p style={{ marginTop: "10px" }}>{link}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "40px",
    fontFamily: "sans-serif"
  },
  input: {
    padding: "10px",
    width: "300px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginRight: "10px"
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px"
  },
  qrContainer: {
    marginTop: "20px"
  }
};

export default QrGenerator;
