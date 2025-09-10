import React, { useState } from "react";

// Kamus mapping sesuai aturan final
const letterToNumber: Record<string, number> = {
  A: 0,
  B: 1, C: 1, D: 1,
  E: 2,
  F: 3, G: 3, H: 3,
  I: 4,
  J: 5, K: 5, L: 5, M: 5, N: 5,
  O: 6,
  P: 7, Q: 7, R: 7, S: 7, T: 7,
  U: 8,
  V: 9, W: 9, X: 9, Y: 9, Z: 9,

  a: 9,
  b: 8, c: 8, d: 8,
  e: 7,
  f: 6, g: 6, h: 6,
  i: 5,
  j: 4, k: 4, l: 4, m: 4, n: 4,
  o: 3,
  p: 2, q: 2, r: 2, s: 2, t: 2,
  u: 1,
  v: 0, w: 0, x: 0, y: 0, z: 0,

  " ": 0,
};

const numberToLetter: Record<number, string> = {
  0: "A",
  1: "B",
  2: "E",
  3: "F",
  4: "I",
  5: "J",
  6: "O",
  7: "P",
  8: "U",
  9: "V",
};

// No 1: huruf → angka
function textToNumbers(text: string): number[] {
  return text.split("").map((ch) => letterToNumber[ch] ?? 0);
}

// No 2: tambah-kurang bergantian
function alternateSumWithSteps(numbers: number[]) {
  if (numbers.length === 0) return { expression: "", result: 0 };
  let expression = numbers[0].toString();
  let result = numbers[0];

  for (let i = 1; i < numbers.length; i++) {
    if (i % 2 === 1) {
      expression += " + " + numbers[i];
      result += numbers[i];
    } else {
      expression += " - " + numbers[i];
      result -= numbers[i];
    }
  }
  return { expression, result };
}

// No 3: bangun deret digit untuk mencapai nilai target
function buildSequenceForSum(target: number): number[] {
  target = Math.abs(Math.trunc(target));
  if (target === 0) return [0];

  const seq: number[] = [];
  let sum = 0;
  let digit = 0;

  while (sum < target) {
    if (sum + digit <= target) {
      seq.push(digit);
      sum += digit;
      digit = (digit + 1) % 10;
    } else {
      digit = (digit + 1) % 10;
    }
  }
  return seq;
}
function numberToLetters(num: number): string[] {
  const seqNumbers = buildSequenceForSum(num);
  return seqNumbers.map((n) => numberToLetter[n]);
}

// No 4: refine sequence
function refineSequence(seqLetters: string[]): string[] {
  const nums = seqLetters.map((ch) => letterToNumber[ch] ?? 0);
  const { result } = alternateSumWithSteps(nums);
  const newSeq = numberToLetters(result);
  const replacement = newSeq.slice(1, 3);
  const refined = [...seqLetters];
  refined.splice(-2, 2, ...replacement);
  return refined;
}

// No 5: final mapping ke angka ganjil
function lettersToFinalNumbers(seqLetters: string[]): number[] {
  return seqLetters.map((ch) => {
    const n = letterToNumber[ch] ?? 0;
    return n % 2 === 0 ? n + 1 : n;
  });
}

const App: React.FC = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<any>(null);

  const process = () => {
    const nums = textToNumbers(input);
    const { expression, result } = alternateSumWithSteps(nums);
    const letters = numberToLetters(result);
    const refined = refineSequence(letters);
    const finalNums = lettersToFinalNumbers(refined);

    setResults({
      no1: nums,
      no2: `${expression} = ${result}`,
      no3: letters,
      no4: refined,
      no5: finalNums,
    });
  };

  return (
    <div style={{ fontFamily: "monospace", padding: "20px" }}>
      <h1>Coding Test Solver</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Masukkan kalimat"
        style={{ padding: "8px", width: "300px" }}
      />
      <button onClick={process} style={{ marginLeft: "10px", padding: "8px" }}>
        Proses
      </button>

      {results && (
        <div style={{ marginTop: "20px" }}>
          <p><b>No 1:</b> {results.no1.join(" ")}</p>
          <p><b>No 2:</b> {results.no2}</p>
          <p><b>No 3:</b> {results.no3.join(" ")}</p>
          <p><b>No 4:</b> {results.no4.join(" ")}</p>
          <p><b>No 5:</b> {results.no5.join(" ")}</p>
        </div>
      )}
    </div>
  );
};

export default App;
