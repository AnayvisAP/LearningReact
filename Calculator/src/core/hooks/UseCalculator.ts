import { useState, useCallback } from 'react';

interface CalculatorState {
  currentValue: string;
  previousValue: string;
  operation: string | null;
  overwrite: boolean;
}

export const useCalculator = () => {
  const [state, setState] = useState<CalculatorState>({
    currentValue: '0',
    previousValue: '',
    operation: null,
    overwrite: false,
  });

  const handleNumber = useCallback((num: string) => {
    setState(prev => {
      if (prev.overwrite) {
        return {
          ...prev,
          currentValue: num,
          overwrite: false,
        };
      }
      
      if (prev.currentValue === '0') {
        return {
          ...prev,
          currentValue: num,
        };
      }
      
      return {
        ...prev,
        currentValue: prev.currentValue + num,
      };
    });
  }, []);

  const handleOperator = useCallback((operator: string) => {
    setState(prev => {
      if (prev.operation && prev.previousValue) {
        const result = calculate(prev.previousValue, prev.currentValue, prev.operation);
        return {
          currentValue: '', 
          previousValue: result.toString(),
          operation: operator,
          overwrite: true,  
        };
      }
      
      return {
        currentValue: '',   
        previousValue: prev.currentValue,  
        operation: operator,
        overwrite: true,    
      };
    });
  }, []);

  const handleEqual = useCallback(() => {
    setState(prev => {
      if (prev.operation && prev.previousValue) {
        const result = calculate(prev.previousValue, prev.currentValue, prev.operation);
        return {
          currentValue: result.toString(),
          previousValue: '',
          operation: null,
          overwrite: true,
        };
      }
      return prev;
    });
  }, []);

  const handleClear = useCallback(() => {
    setState({
      currentValue: '0',
      previousValue: '',
      operation: null,
      overwrite: false,
    });
  }, []);

  const handleDelete = useCallback(() => {
    setState(prev => {
      if (prev.currentValue.length === 1 || prev.currentValue === '0' || prev.currentValue === '') {
        return {
          ...prev,
          currentValue: '0',
          overwrite: false,
        };
      }
      
      return {
        ...prev,
        currentValue: prev.currentValue.slice(0, -1),
      };
    });
  }, []);

  const handlePercentage = useCallback(() => {
    setState(prev => {
      const current = parseFloat(prev.currentValue || '0');
      const percentage = current / 100;
      return {
        ...prev,
        currentValue: percentage.toString(),
        overwrite: true,
      };
    });
  }, []);

  const handleDecimal = useCallback(() => {
    setState(prev => {
      if (prev.overwrite || prev.currentValue === '') {
        return {
          ...prev,
          currentValue: '0.',
          overwrite: false,
        };
      }
      
      if (prev.currentValue.includes('.')) {
        return prev;
      }
      
      return {
        ...prev,
        currentValue: prev.currentValue + '.',
      };
    });
  }, []);

  const calculate = (first: string, second: string, operation: string): number => {
    const a = parseFloat(first);
    const b = parseFloat(second || '0');
    
    switch (operation) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '/':
        return b !== 0 ? a / b : 0;
      default:
        return b;
    }
  };

  const handleButtonClick = useCallback((value: string) => {
    if (!isNaN(Number(value)) || value === '0') {
      handleNumber(value);
    } else {
      switch (value) {
        case 'AC':
          handleClear();
          break;
        case '⌫':
          handleDelete();
          break;
        case '%':
          handlePercentage();
          break;
        case '/':
        case '*':
        case '-':
        case '+':
          handleOperator(value);
          break;
        case '=':
          handleEqual();
          break;
        case '.':
          handleDecimal();
          break;
        default:
          break;
      }
    }
  }, [handleNumber, handleOperator, handleEqual, handleClear, handleDelete, handlePercentage, handleDecimal]);

  return {
    currentValue: state.currentValue,
    previousValue: state.previousValue,
    operation: state.operation,
    handleButtonClick,
  };
};