import { useState } from "react";

function Ceaser() {
  const [mode, setMode] = useState("encode");
  const [result, setResult] = useState("");
  const [fileName, setFileName] = useState("");
  const customAlphabet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@._";
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        document.getElementById("inputText").value = e.target.result;
        setFileName(file.name);
      };
      reader.readAsText(file);
    }
  };

  const handleInputChange = (e) => {
    setMode(e.target.value);
  };
  const encodeText = (inputText, shift) => {
    if (!inputText && !shift) {
      inputText = document.getElementById("inputText").value;
      shift = parseInt(document.getElementById("shift").value);
    }
    let encodedText = "";
    const alphabetLength = customAlphabet.length;

    for (let i = 0; i < inputText.length; i++) {
      const char = inputText[i];
      const index = customAlphabet.indexOf(char);

      if (index !== -1) {
        // Character is in our custom alphabet, shift it
        const newIndex = (index + shift) % alphabetLength;
        encodedText += customAlphabet[newIndex];
      } else {
        // Character is not in the custom alphabet, keep it unchanged
        encodedText += char;
      }
    }
    return encodedText;
  };
  const decodeText = (inputText, shift) => {
    if (!inputText && !shift) {
      inputText = document.getElementById("inputText").value;
      shift = parseInt(document.getElementById("shift").value);
    }
    let decodedText = "";
    const alphabetLength = customAlphabet.length;

    for (let i = 0; i < inputText.length; i++) {
      const char = inputText[i];
      const index = customAlphabet.indexOf(char);

      if (index !== -1) {
        // Character is in our custom alphabet, reverse the shift
        const newIndex = (index - shift + alphabetLength) % alphabetLength;
        decodedText += customAlphabet[newIndex];
      } else {
        // Character is not in the custom alphabet, keep it unchanged
        decodedText += char;
      }
    }

    return decodedText;
  };
  const handleProcess = () => {
    const inputText = document.getElementById("inputText").value;
    const shift = parseInt(document.getElementById("shift").value);
    if (!isNaN(shift)) {
      const processedText =
        mode === "encode"
          ? encodeText(inputText, shift)
          : decodeText(inputText, shift);
      setResult(processedText);
    } else {
      alert("Nhập bước nhảy là số");
    }
  };
  const downloadResult = () => {
    const element = document.createElement("a");
    const file = new Blob([result], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `result_${fileName || "output"}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  const TestResult = () => {
    const inputText = document.getElementById("inputText").value;
    const shift = parseInt(document.getElementById("shift").value);
    let testText = "";
    if (mode === "encode") {
      testText = decodeText(result, shift);
    } else {
      testText = encodeText(result, shift);
    }
    if (testText === inputText) {
      alert("Result after test: " + testText + "\nTest passed");
    } else {
      alert("Result after test: " + testText + "Test failed");
    }
  };
  return (
    <>
      <div className=" flex flex-col justify-center items-center bg-grey-200">
        <h1 className="text-3xl text-center mb-3">Caesar</h1>
        <div className="w-1/2 bg-white p-5 rounded-xl">
          <div className="flex gap-4  mb-4">
            <div className="flex items-center  flex-shrink-0">
              <input
                type="radio"
                name="mode"
                id="encode"
                value="encode"
                className="size-6 mr-4 cursor-pointer"
                onChange={handleInputChange}
                defaultChecked
              />
              <label htmlFor="encode" className="text-2xl">
                Mã Hóa
              </label>
            </div>
            <div className="flex items-center flex-shrink-0">
              <input
                type="radio"
                name="mode"
                id="decode"
                value="decode"
                className="size-6 mr-4 cursor-pointer"
                onChange={handleInputChange}
              />
              <label htmlFor="decode" className="text-2xl">
                Giải Mã
              </label>
            </div>
          </div>
          <input
            type="file"
            accept=".txt"
            className="mb-4"
            onChange={handleFileChange}
          />
          <input
            type="text"
            className=" w-full mb-4 bg-blue-200 rounded-lg outline-none p-3"
            placeholder="Nhập chuỗi cần mã hóa"
            id="inputText"
          />
          <div className="flex justify-center w-full">
            <input
              type="text"
              className=" w-full mb-4   bg-blue-200 rounded-lg outline-none p-3"
              placeholder="Nhập bước nhảy"
              id="shift"
            />
          </div>

          <button
            className="px-4 py-2 mb-4 rounded-2xl bg-blue-400 border-2  border-blue-400 text-white hover:bg-white hover:text-blue-400 hover:border-2 hover:border-blue-400"
            onClick={handleProcess}
          >
            {mode === "encode" ? "Mã Hóa" : "Giải Mã"}
          </button>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <p className="text-2xl underline">Kết quả:</p>
              <p
                className="text-center text-2xl  rounded-lg outline-none p-4 mr-4"
                id="result"
              >
                {result}
              </p>
            </div>
            <div className="flex items-center">
              {result !== "" ? (
                <button
                  id="download-result"
                  className="px-4 py-2 rounded-2xl hover:bg-green-100 hover:text-green-500 hover:border-2 hover:border-green-500 bg-green-500 text-white border-2 border-green-500 mr-4"
                  onClick={downloadResult}
                >
                  Download result
                </button>
              ) : (
                ""
              )}
              {result !== "" ? (
                <button
                  className="px-4 py-2 rounded-2xl hover:bg-yellow-100 hover:text-yellow-500 hover:border-2 hover:border-yellow-500 bg-yellow-500 text-white border-2 border-yellow-500"
                  onClick={TestResult}
                >
                  Test button
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Ceaser;
