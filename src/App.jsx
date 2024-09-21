import AffineCipher from "./AffineCipher";
import Ceaser from "./Ceaser"; // Nếu có thuật toán Ceaser
import Ssc from "./Ssc"; // Nếu có thuật toán Substitution Cipher
import { useState } from "react";
import Vigenere from "./Vigenere";
function App() {
  const [selectedCipher, setSelectedCipher] = useState("");

  const handleCipherChange = (event) => {
    setSelectedCipher(event.target.value);
  };

  return (
    <div className="text-center bg-blue-100 pt-10 h-screen">
      <h1 className="text-4xl text-center mb-6">Chọn thuật toán mã hóa:</h1>

      <select
        onChange={handleCipherChange}
        value={selectedCipher}
        className="p-2 rounded-xl mb-10"
      >
        <option value="">Chọn loại mã hóa</option>
        <option value="affine">Mã hóa Affine</option>
        <option value="ceaser">Mã hóa Ceaser</option>
        <option value="vigenere">Mã hóa Vigenere</option>
        <option value="ssc">Mã thay thế đơn giản (Substitution Cipher)</option>
      </select>

      {selectedCipher === "affine" && <AffineCipher />}
      {selectedCipher === "ceaser" && <Ceaser />}
      {selectedCipher === "ssc" && <Ssc />}
      {selectedCipher === "vigenere" && <Vigenere />}
    </div>
  );
}

export default App;
