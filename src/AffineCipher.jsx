import { useState } from "react";

// Kiểm tra xem 'a' có tương đối nguyên tố với 26 hay không
const gcd = (a, b) => {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
};

// Hàm mã hóa Affine
const affineEncrypt = (plaintext, a, b) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let ciphertext = "";

  for (let char of plaintext.toUpperCase()) {
    if (alphabet.includes(char)) {
      let x = alphabet.indexOf(char);
      // Áp dụng công thức Affine: (a * x + b) % 26
      let encryptedChar = (a * x + b) % 26;
      ciphertext += alphabet[encryptedChar];
    } else {
      ciphertext += char; // Giữ nguyên ký tự không thuộc bảng chữ cái
    }
  }

  return ciphertext;
};

// Hàm giải mã Affine
const affineDecrypt = (ciphertext, a, b) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let plaintext = "";

  // Tìm nghịch đảo modular của 'a' trong modulo 26
  const modInverse = (a, m) => {
    a = a % m;
    for (let x = 1; x < m; x++) {
      if ((a * x) % m === 1) return x;
    }
    return 1; // Nếu không tìm được, trả về 1 (nó không phải số nguyên tố cùng nhau)
  };

  const aInverse = modInverse(a, 26);

  for (let char of ciphertext.toUpperCase()) {
    if (alphabet.includes(char)) {
      let y = alphabet.indexOf(char);
      // Áp dụng công thức giải mã Affine: a_inv * (y - b) % 26
      let decryptedChar = (aInverse * (y - b + 26)) % 26;
      plaintext += alphabet[decryptedChar];
    } else {
      plaintext += char; // Giữ nguyên ký tự không thuộc bảng chữ cái
    }
  }

  return plaintext;
};

const AffineCipher = () => {
  const [plaintext, setPlaintext] = useState("");
  const [ciphertext, setCiphertext] = useState("");
  const [a, setA] = useState(1); // Hệ số 'a'
  const [b, setB] = useState(0); // Hệ số 'b'
  const [error, setError] = useState("");
  const [mode, setMode] = useState("encode"); // Chế độ mã hóa hoặc giải mã

  const handleEncryption = () => {
    // Kiểm tra nếu a và 26 không có ước chung lớn hơn 1
    if (gcd(a, 26) !== 1) {
      setError("Giá trị của a phải tương đối nguyên tố với 26");
      return;
    }

    setError(""); // Xóa thông báo lỗi nếu không có vấn đề

    if (mode === "encode") {
      const cipherResult = affineEncrypt(plaintext, a, b);
      setCiphertext(cipherResult);
    } else {
      const plainResult = affineDecrypt(plaintext, a, b);
      setCiphertext(plainResult);
    }
  };

  const handleModeChange = (e) => {
    setMode(e.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center bg-blue-100">
      <h2 className="text-3xl text-center mb-6">Affine Cipher</h2>
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
            Nhập giá trị a:
            <input
              type="number"
              value={a}
              onChange={(e) => setA(parseInt(e.target.value))}
              className="mb-4 bg-blue-200 rounded-lg outline-none p-3 ml-4"
            />
          </label>
        </div>
        <div>
          <label>
            Nhập giá trị b:
            <input
              type="number"
              value={b}
              onChange={(e) => setB(parseInt(e.target.value))}
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

export default AffineCipher;
