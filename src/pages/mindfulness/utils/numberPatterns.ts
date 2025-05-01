
export type SequenceType = 
  | 'add' 
  | 'subtract' 
  | 'multiply' 
  | 'even' 
  | 'odd' 
  | 'fibonacci' 
  | 'square' 
  | 'alternatingAddSubtract';

interface NumberSequence {
  numbers: number[];
  type: SequenceType;
  nextNumber: number;
  description: string;
}

// Generate a sequence based on the pattern type and difficulty
export function generateNumberSequence(difficulty: number = 1): NumberSequence {
  // Determine available pattern types based on difficulty
  let availableTypes: SequenceType[] = ['add', 'subtract'];
  
  if (difficulty >= 2) {
    availableTypes.push('even', 'odd');
  }
  
  if (difficulty >= 3) {
    availableTypes.push('multiply', 'fibonacci');
  }
  
  if (difficulty >= 4) {
    availableTypes.push('square', 'alternatingAddSubtract');
  }
  
  // Randomly select a pattern type
  const type = availableTypes[Math.floor(Math.random() * availableTypes.length)];
  
  // Generate the sequence based on the selected type
  return createSequence(type, difficulty);
}

function createSequence(type: SequenceType, difficulty: number): NumberSequence {
  let numbers: number[] = [];
  let nextNumber: number = 0;
  let description: string = '';
  
  switch (type) {
    case 'add': {
      const increment = Math.floor(Math.random() * 5) + 1;
      const start = Math.floor(Math.random() * 10);
      numbers = Array.from({ length: 4 }, (_, i) => start + i * increment);
      nextNumber = numbers[numbers.length - 1] + increment;
      description = `Add ${increment}`;
      break;
    }
    
    case 'subtract': {
      const decrement = Math.floor(Math.random() * 5) + 1;
      const start = Math.floor(Math.random() * 30) + 10; // Start higher to avoid negatives
      numbers = Array.from({ length: 4 }, (_, i) => start - i * decrement);
      nextNumber = numbers[numbers.length - 1] - decrement;
      description = `Subtract ${decrement}`;
      break;
    }
    
    case 'multiply': {
      const factor = Math.floor(Math.random() * 3) + 2;
      const start = Math.floor(Math.random() * 5) + 1;
      numbers = Array.from({ length: 4 }, (_, i) => start * Math.pow(factor, i));
      nextNumber = numbers[numbers.length - 1] * factor;
      description = `Multiply by ${factor}`;
      break;
    }
    
    case 'even': {
      const start = Math.floor(Math.random() * 10) * 2;
      numbers = Array.from({ length: 4 }, (_, i) => start + i * 2);
      nextNumber = numbers[numbers.length - 1] + 2;
      description = 'Even numbers';
      break;
    }
    
    case 'odd': {
      const start = Math.floor(Math.random() * 10) * 2 + 1;
      numbers = Array.from({ length: 4 }, (_, i) => start + i * 2);
      nextNumber = numbers[numbers.length - 1] + 2;
      description = 'Odd numbers';
      break;
    }
    
    case 'fibonacci': {
      // Start with small numbers for the Fibonacci sequence
      let a = 0;
      let b = 1;
      numbers = [a, b];
      for (let i = 2; i < 4; i++) {
        const next = a + b;
        numbers.push(next);
        a = b;
        b = next;
      }
      nextNumber = numbers[numbers.length - 1] + numbers[numbers.length - 2];
      description = 'Fibonacci sequence';
      break;
    }
    
    case 'square': {
      const offset = Math.floor(Math.random() * 5);
      numbers = Array.from({ length: 4 }, (_, i) => Math.pow(i + 1 + offset, 2));
      nextNumber = Math.pow(5 + offset, 2);
      description = 'Square numbers';
      break;
    }
    
    case 'alternatingAddSubtract': {
      const value = Math.floor(Math.random() * 5) + 2;
      let start = Math.floor(Math.random() * 20) + 10;
      numbers = [start];
      for (let i = 0; i < 3; i++) {
        if (i % 2 === 0) {
          start += value;
        } else {
          start -= value;
        }
        numbers.push(start);
      }
      nextNumber = numbers.length % 2 === 0 ? numbers[numbers.length - 1] + value : numbers[numbers.length - 1] - value;
      description = `Alternating +${value}/-${value}`;
      break;
    }
  }
  
  return { numbers, type, nextNumber, description };
}

// Check if the user's answer is correct
export function checkAnswer(answer: number, correctAnswer: number): boolean {
  return answer === correctAnswer;
}
