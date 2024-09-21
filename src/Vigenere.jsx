import { useState } from "react";

const Vigenere = () => {
  const [mode, setMode] = useState("encode");
  const [plaintext, setPlaintext] = useState("");
  const [key, setKey] = useState("");
  const [ciphertext, setCiphertext] = useState("");
  const [error, setError] = useState("");

  const handleModeChange = (e) => {
    setMode(e.target.value);
    setCiphertext("");
  };

  // Hàm để mã hóa hoặc giải mã văn bản với mật mã Vigenère
  const handleEncryption = () => {
    if (!key || !/^[a-zA-Z]+$/.test(key)) {
      setError("Khóa chỉ được chứa các chữ cái và không được để trống!");
      return;
    }
    setError("");
    let result = "";
    const k = key.toUpperCase();
    const input = plaintext.toUpperCase();

    for (let i = 0, j = 0; i < input.length; i++) {
      const char = input[i];
      if (char >= "A" && char <= "Z") {
        const charCode = char.charCodeAt(0) - 65;
        const keyCode = k[j % k.length].charCodeAt(0) - 65;
        let encryptedChar;

        if (mode === "encode") {
          encryptedChar = String.fromCharCode(((charCode + keyCode) % 26) + 65);
        } else {
          encryptedChar = String.fromCharCode(
            ((charCode - keyCode + 26) % 26) + 65
          );
        }
        result += encryptedChar;
        j++; // Chỉ tăng chỉ số j khi gặp ký tự chữ cái
      } else {
        result += char; // Giữ nguyên ký tự không phải chữ cái
      }
    }
    setCiphertext(result);
  };

  return (
    <div className="flex flex-col justify-center items-center bg-blue-100">
      <h2 className="text-3xl text-center mb-6">Vigenere</h2>
      <div className="bg-white w-1/2 p-4 rounded-xl">
        {/* Radio buttons for mode selection */}
        <div className="flex gap-4 mb-4">
          <div className="flex items-center">
            <input
              type="radio"
              name="mode"
              id="encode"
              value="encode"
              className="size-6 mr-4 cursor-pointer"
              onChange={handleModeChange}
              defaultChecked
            />
            <label htmlFor="encode" className="text-2xl">
              Mã Hóa
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              name="mode"
              id="decode"
              value="decode"
              className="size-6 mr-4 cursor-pointer"
              onChange={handleModeChange}
            />
            <label htmlFor="decode" className="text-2xl">
              Giải Mã
            </label>
          </div>
        </div>

        <div>
          <input
            rows="4"
            cols="50"
            placeholder="Enter text"
            className="w-full mb-4 bg-blue-200 rounded-lg outline-none p-3"
            value={plaintext}
            onChange={(e) => setPlaintext(e.target.value)}
          />
        </div>
        <div>
          <label>
            Nhập khóa:
            <input
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="mb-4 bg-blue-200 rounded-lg outline-none p-3 ml-4"
            />
          </label>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          onClick={handleEncryption}
          className="px-4 py-2 mb-4 rounded-2xl bg-blue-400 border-2 border-blue-400 text-white hover:bg-white hover:text-blue-400 hover:border-blue-400"
        >
          {mode === "encode" ? "Mã Hóa" : "Giải Mã"}
        </button>
        <div className="flex">
          <h3>Kết quả:</h3>
          <p className="ml-4">{ciphertext}</p>
        </div>
      </div>
    </div>
  );
};

export default Vigenere;
