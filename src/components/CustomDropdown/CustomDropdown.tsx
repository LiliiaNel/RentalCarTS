import Select, {
  SingleValue,
  ActionMeta,
  components,
  DropdownIndicatorProps,
  ClearIndicatorProps,
} from "react-select";
import { FC } from "react";
import Icon from "../Icon/Icon";
import css from "./CustomDropdown.module.css";
import customStyles from "./CustomDropdown.styles"; 

type DropdownOption = { value: string; label: string };

interface CustomDropdownProps {
  label: string;
  placeholder: string;
  value: string;
  options: string[];
  formatOptionLabel?: (option: string) => string; // Formatter for displaying option labels (show "To $50" instead of "50")
  onChange: (value: string) => void; 
  onClear?: () => void;           
}

const CustomDropdown: FC<CustomDropdownProps> = ({
  label,
  placeholder,
  value,
  options,
  onChange,
  onClear,
  formatOptionLabel,
}) => {
  // Converting string array into objects for react-select
  const dropdownOptions: DropdownOption[] = options.map((option) => ({
    value: option,
    label: option,
  }));

  const currentOption =
    dropdownOptions.find((option) => option.value === value) || null;
    
    const selectedOption = currentOption
    ? {
        ...currentOption,
        label: formatOptionLabel
            ? formatOptionLabel(currentOption.value)
            : currentOption.label,
        }
    : null;

  const handleChange = (
    option: SingleValue<DropdownOption>,
    _actionMeta?: ActionMeta<DropdownOption>
  ) => {
    onChange(option ? option.value : "");
  };

  const DropdownIndicator = (props: DropdownIndicatorProps<DropdownOption, false>) => (
    <components.DropdownIndicator {...props}>
      <span className={`${css.arrowWrap} ${props.selectProps.menuIsOpen ? css.rotated : ""}`}>
        <Icon name="icon-chevron-down" width={16} height={16} className={css.arrowIcon} />
      </span>
    </components.DropdownIndicator>
  );

  const ClearIndicator = (props: ClearIndicatorProps<DropdownOption, false>) => (
    <components.ClearIndicator {...props}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onChange("");
          onClear?.();
        }}
        className={css.clearButton}
      >
        ×
      </button>
    </components.ClearIndicator>
  );

  return (
    <div className={css.wrapper}>
      <label className={css.label}>{label}</label>

      <Select<DropdownOption, false>
       className={css.select}
        classNamePrefix="custom"
        styles={customStyles}
        components={{ DropdownIndicator, ClearIndicator }}
        value={selectedOption}
        onChange={handleChange}
        options={dropdownOptions}
        placeholder={placeholder}
        isClearable
        isSearchable={false}
        menuPlacement="auto"
      />
    </div>
  );
};

export default CustomDropdown;
