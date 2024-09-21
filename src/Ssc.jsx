import { useState, useEffect } from "react";

// Hàm tạo hoán vị ngẫu nhiên cho một mảng
const shuffleArray = (array) => {
  let shuffled = array.slice(); // Tạo một bản sao của mảng
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Đảo vị trí ngẫu nhiên
  }
  return shuffled;
};

const generateSubstitutionTable = () => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const shuffledAlphabet = shuffleArray(alphabet);
  const substitutionTable = {};
  alphabet.forEach((letter, index) => {
    substitutionTable[letter] = shuffledAlphabet[index];
  });
  return substitutionTable;
};

// Hàm để đảo ngược bảng thay thế cho giải mã
const reverseSubstitutionTable = (table) => {
  const reversedTable = {};
  for (const key in table) {
    reversedTable[table[key]] = key;
  }
  return reversedTable;
};

const Ssc = () => {
  const [plaintext, setPlaintext] = useState("");
  const [ciphertext, setCiphertext] = useState("");
  const [substitutionTable, setSubstitutionTable] = useState({});
  const [mode, setMode] = useState("encode");

  // Tự động tạo bảng mã thay thế khi component được render
  useEffect(() => {
    const table = generateSubstitutionTable();
    setSubstitutionTable(table);
  }, []);

  const handleProcess = () => {
    let result = "";
    const tableToUse =
      mode === "encode"
        ? substitutionTable
        : reverseSubstitutionTable(substitutionTable);

    for (let char of plaintext.toUpperCase()) {
      if (tableToUse[char]) {
        result += tableToUse[char];
      } else {
        result += char; // Giữ nguyên nếu không phải chữ cái
      }
    }
    setCiphertext(result);
  };

  return (
    <div className="flex flex-col justify-center items-center bg-grey-200">
      <h2 className="text-3xl text-center mb-6">
        Simple Substitution Cipher (Random Substitution)
      </h2>

      <div className="w-1/2 bg-white flex-col items-center justify-center p-6 rounded-xl">
        <div className="flex gap-4 mb-4">
          <div className="flex items-center">
            <input
              type="radio"
              name="mode"
              value="encode"
              checked={mode === "encode"}
              onChange={() => setMode("encode")}
              className=" size-6 mr-4 cursor-pointer"
            />
            <label>Encode</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              name="mode"
              value="decode"
              checked={mode === "decode"}
              onChange={() => setMode("decode")}
              className=" size-6 mr-4 cursor-pointer"
            />
            <label>Decode</label>
          </div>
        </div>
        <div className="flex items-center  flex-shrink-0">
          <input
            placeholder="Enter plaintext"
            value={plaintext}
            className="p-2 rounded-md border-black border outline-none mb-4 w-full"
            onChange={(e) => setPlaintext(e.target.value)}
          />
        </div>

        {/* Buttons for selecting Encode or Decode */}

        <button
          onClick={handleProcess}
          className="px-4 py-2 rounded-lg bg-blue-300 w-fit mb-4"
        >
          {mode === "encode" ? "Encrypt" : "Decrypt"}
        </button>

        <div className="flex items-center">
          <h3 className="text-2xl underline">Kết quả:</h3>
          <p className="text-center text-2xl  rounded-lg outline-none p-4 mr-4">
            {ciphertext}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Ssc;
