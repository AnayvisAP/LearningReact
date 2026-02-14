import './Buttons.css';

export interface NumberButtonProps {
  children: string | number;
  large?: 'small' | 'medium' | 'large';
  variant: 'number' | 'operator' | 'character' | 'equal' | 'clean' ;
  onClick?: () => void;
}

const NumberButton = ({ 
  children, 
  large = 'medium',
  variant,
  onClick
}: NumberButtonProps) => {

  const largeVariant = {
    small: 'btn-small',
    medium: 'btn-medium',
    large: 'btn-large'
  };

  return (
    <button 
    className={`btn ${largeVariant[large]} btn-${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default NumberButton;