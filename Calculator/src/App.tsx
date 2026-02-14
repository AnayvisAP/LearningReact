import './App.css';
import RowButtons from './core/components/rowButtons/RowButtons';
import { useCalculator } from './core/hooks/UseCalculator';

function App() {
  const { currentValue, previousValue, operation, handleButtonClick } = useCalculator();

  const frontRow = [
    { children: 'AC', variant: 'operator', large: 'medium' },
    { children: '⌫', variant: 'operator', large: 'medium' },
    { children: '%', variant: 'operator', large: 'medium' },
    { children: '/', variant: 'operator', large: 'medium' }
  ] as const;

  const secondRow = [
    { children: '7', variant: 'number', large: 'medium' },
    { children: '8', variant: 'number', large: 'medium' },
    { children: '9', variant: 'number', large: 'medium' },
    { children: '*', variant: 'operator', large: 'medium' }
  ] as const;

  const thirdRow = [
    { children: '4', variant: 'number', large: 'medium' },
    { children: '5', variant: 'number', large: 'medium' },
    { children: '6', variant: 'number', large: 'medium' },
    { children: '-', variant: 'operator', large: 'medium' }
  ] as const;

  const fourthRow = [
    { children: '1', variant: 'number', large: 'medium' },
    { children: '2', variant: 'number', large: 'medium' },
    { children: '3', variant: 'number', large: 'medium' },
    { children: '+', variant: 'operator', large: 'medium' }
  ] as const;

  const fifthRow = [
    { children: '0', variant: 'number', large: 'large' },
    { children: '.', variant: 'character', large: 'medium' },
    { children: '=', variant: 'equal', large: 'medium' }
  ] as const;

  const formatDisplay = () => {
    if (operation && previousValue) {
      return `${previousValue} ${operation} ${currentValue}`;
    }
    return currentValue;
  };

  return (
    <article className="calculator">
      <header className='screen'>
        <h3 className='display'>{formatDisplay()}</h3>
      </header>

      <section className='sectionNumber'>
        <RowButtons
          buttons={frontRow}
          onButtonClick={handleButtonClick}
        />

        <RowButtons
          buttons={secondRow}
          onButtonClick={handleButtonClick}
        />

        <RowButtons
          buttons={thirdRow}
          onButtonClick={handleButtonClick}
        />

        <RowButtons
          buttons={fourthRow}
          onButtonClick={handleButtonClick}
        />

        <RowButtons
          buttons={fifthRow}
          onButtonClick={handleButtonClick}
        />
      </section>
    </article>
  );
}

export default App;