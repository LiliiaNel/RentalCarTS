import Select, {
  SingleValue,
  ActionMeta,
  components,
  DropdownIndicatorProps,
  ClearIndicatorProps,
} from "react-select";
import { FC } from "react";
import Icon from "../Icon/Icon";
import css from "./BrandsDropdown.module.css";

type BrandOption = { value: string; label: string };

interface BrandDropdownProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  onClear?: () => void;
  isLoading: boolean;
}

const BrandDropdown: FC<BrandDropdownProps> = ({ value, options, onChange, onClear }) => {
  
  const brandOptions: BrandOption[] = options.map((brand) => ({ value: brand, label: brand, }));

  const currentBrandOption = brandOptions.find((option) => option.value === value) || null;

  const handleChange = (option: SingleValue<BrandOption>, actionMeta?: ActionMeta<BrandOption>) => {
    onChange(option ? option.value : "");
  };

  const DropdownIndicator = (props: DropdownIndicatorProps<BrandOption, false>) => (
    <components.DropdownIndicator {...props} className={css.chevronButtonWrap}>
       <span className={`${css.arrowWrap} ${props.selectProps.menuIsOpen ? css.rotated : ""}`}>
        <Icon name="icon-chevron-down" width={16} height={16} className={css.arrowIcon} />
      </span>
    </components.DropdownIndicator>
  );

  const ClearIndicator = (props: ClearIndicatorProps<BrandOption, false>) => (
    <components.ClearIndicator {...props} className={css.clearIndicator}>
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
      <label className={css.label}>Car brand</label>
       <Select<BrandOption, false>
        className={css.select}
        classNames={{
          container: () => css.container,
          valueContainer: () => css.menuField,
          singleValue: () => css.selectedText,
          placeholder: () => css.selectedText,
          dropdownIndicator: () => css.chevronButton,
          clearIndicator: () => css.clearIndicator,
          indicatorsContainer: () => css.indicatorsContainer,
          menuList: () => css.itemsList,
          noOptionsMessage: () => css.noOptionsMessage,
        }}
        styles={{
        control: (base) => ({
          ...base,
          background: "#f7f7f7",
          border: "none",
          boxShadow: "none",
          boxSizing: "border-box",
          width: "100%",
          minHeight: 44,
          padding: 0,
          borderRadius: 12,
          cursor: "pointer",
          outline: "none",
        }),
          menu: (base) => ({
            ...base,
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            width: 204,
            maxHeight: 272,
            background: "#fff",
            border: "1px solid #f7f7f7",
            borderRadius: 12,
            boxShadow: "0 4px 36px rgba(0, 0, 0, 0.02)",
            zIndex: 9999,
            // zIndex: 40,
            overflow: 'auto',
            boxSizing: "border-box",
          }),

          option: (base, state) => ({
            ...base,
            width: "100%",
            textAlign: "left",
            background: state.isFocused ? "#f7f7f7" : "transparent",
            border: "none",
            padding: "14px 16px 14px 18px",
            borderRadius: 8,
            fontWeight: state.isSelected ? 500 : 400,
            fontSize: 16,
            lineHeight: 1.25,
            color: state.isSelected ? "#101828" : "#8d929a",
            outline: "none",
            cursor: "pointer",
            transition: "background 0.2s ease",
          }),
        indicatorSeparator: (base) => ({
          ...base,
          display: "none",
        }),
      }}
        components={{ DropdownIndicator, ClearIndicator }}
        value={currentBrandOption}
        onChange={handleChange}
        options={brandOptions}
        placeholder="Choose a brand"
        isClearable
        isSearchable={false}
        menuPlacement="auto"
        
      />
    </div>
  );
};

export default BrandDropdown;
