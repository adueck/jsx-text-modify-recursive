function randFromArray<M>(arr: M[]): M {
  return arr[Math.floor(Math.random() * arr.length)];
}

function upperLowerCase(s: string): string {
  return s
    .split("")
    .map((char) => {
      if (randFromArray(["upper", "lower"]) === "upper") {
        return char.toUpperCase();
      } else {
        return char.toLowerCase();
      }
    })
    .join("");
}

function sayUmAlot(s: string): string {
  return s
    .split(" ")
    .reduce((text, word) => {
      if (randFromArray([true, false, false])) {
        return [...text, " ", "um...", " ", word];
      }
      return [...text, " ", word];
    }, [] as string[])
    .join("");
}

const morseCode: Record<string, string> = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  "0": "-----"
};
function convertToMorse(s: string): string {
  return s
    .toUpperCase()
    .replace(/^A-Z/g, "")
    .split("")
    .map((el) => {
      return morseCode[el] ? morseCode[el] : el;
    })
    .join("");
}

export const modifiers: {
  name: string;
  label: string;
  f: (s: string) => string;
}[] = [
  {
    name: "changeAnimal",
    label: "Change Animal",
    f: (s) => s.replace(/dog/g, "cat")
  },
  { name: "upperLower", label: "uPpeR aNd LoWer CasE", f: upperLowerCase },
  { name: "yell", label: "YELL", f: (s) => s.toUpperCase() },
  { name: "sayUmAlot", label: `say "umm.." a lot`, f: sayUmAlot },
  { name: "morseCode", label: "Morse Code", f: convertToMorse }
];
