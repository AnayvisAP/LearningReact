import NumberButton from "../buttons/Buttons";
import '../rowButtons/RowButtons.css'
import type { NumberButtonProps } from "../buttons/Buttons";


interface RowButtonsProps {
  buttons: readonly NumberButtonProps[];
  onButtonClick: (value: string) => void;
}

const RowButtons = ({
  buttons,
  onButtonClick
}: RowButtonsProps) => {

  const fourButtons = buttons.slice(0, 4);

  return (
    <div
      className={`row-buttons`}
    >
      {fourButtons.map((button) => (
        <NumberButton
          key={button.children}
          variant={button.variant}
          large={button.large}
          onClick={() => onButtonClick(button.children.toString())}
        >
          {button.children}
        </NumberButton>
      ))}
    </div>
  );
};

export default RowButtons;
