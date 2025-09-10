const readline = require('readline');

const letterToNumber = {
  'A': 0,
  'B': 1, 'C': 1, 'D': 1,
  'E': 2,
  'F': 3, 'G': 3, 'H': 3,
  'I': 4,
  'J': 5, 'K': 5, 'L': 5, 'M': 5, 'N': 5,
  'O': 6,
  'P': 7, 'Q': 7, 'R': 7, 'S': 7, 'T': 7,
  'U': 8,
  'V': 9, 'W': 9, 'X': 9, 'Y': 9, 'Z': 9,

  'a': 9,
  'b': 8, 'c': 8, 'd': 8,
  'e': 7,
  'f': 6, 'g': 6, 'h': 6,
  'i': 5,
  'j': 4, 'k': 4, 'l': 4, 'm': 4, 'n': 4,
  'o': 3,
  'p': 2, 'q': 2, 'r': 2, 's': 2, 't': 2,
  'u': 1,
  'v': 0, 'w': 0, 'x': 0, 'y': 0, 'z': 0,

  ' ': 0
};

const numberToLetter = {
  0: 'A',
  1: 'B',
  2: 'E',
  3: 'F',
  4: 'I',
  5: 'J',
  6: 'O',
  7: 'P',
  8: 'U',
  9: 'V'
};


function textToNumbers(text) {
  return text.split('').map(ch => letterToNumber[ch] ?? 0);
}

function alternateSumWithSteps(numbers) {
  if (numbers.length === 0) return { expression: '', result: 0 };
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

function buildSequenceForSum(target) {
  target = Math.abs(Math.trunc(target));
  if (target === 0) return [0];

  const seq = [];
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

function numberToLetters(num) {
  const seqNumbers = buildSequenceForSum(num);
  return seqNumbers.map(n => numberToLetter[n]); 
}

function refineSequence(seqLetters) {
  const nums = seqLetters.map(ch => letterToNumber[ch] ?? 0);
  const { result } = alternateSumWithSteps(nums);
  const newSeq = numberToLetters(result);

  const replacement = newSeq.slice(1, 3); 

  const refined = [...seqLetters];
  refined.splice(-2, 2, ...replacement);
  return refined;
}

function lettersToFinalNumbers(seqLetters) {
  return seqLetters
    .map(ch => {
      const n = letterToNumber[ch] ?? 0;
      return n % 2 === 0 ? n + 1 : n;
    })
    .join(' ');
}

function processText(input) {
  console.log("\nInput:", input);

  let nums = textToNumbers(input);
  console.log("No  1:", nums.join(" "));

  let { expression, result } = alternateSumWithSteps(nums);
  console.log("No  2:", expression, "=", result);

  let letters = numberToLetters(result);
  console.log("No  3:", letters.join(" "));

  let refined = refineSequence(letters);
  console.log("No  4:", refined.join(" "));

  let finalNums = lettersToFinalNumbers(refined);
  console.log("No  5:", finalNums);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Masukkan kalimat: ", function(answer) {
  processText(answer);
  rl.close();
});
