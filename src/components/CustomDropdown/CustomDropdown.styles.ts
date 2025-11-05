import  { StylesConfig } from "react-select";

type BrandOption = { value: string; label: string };

const isTablet = typeof window !== "undefined" && window.innerWidth >= 768 && window.innerWidth < 1440;

const customStyles: StylesConfig<BrandOption, false> = {
  container: (base) => ({
    ...base,
    width: "100%",
  }),
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
    minWidth: 204,
    maxHeight: 272,
    background: "#fff",
    border: "1px solid #f7f7f7",
    borderRadius: 12,
    boxShadow: "0 4px 36px rgba(0, 0, 0, 0.02)",
    zIndex: 9999,
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
  valueContainer: (base) => ({
    ...base,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 0 0 16px",
    width: isTablet ? 270 : 204,
    boxSizing: "border-box",
  }),
  singleValue: (base) => ({
    ...base,
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.25,
    color: "#101828",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#111827",
    fontWeight: 400,
  }),
  indicatorsContainer: (base) => ({
    ...base,
    display: "flex",
    alignItems: "center",
    background: "#f7f7f7",
    borderRadius: "12px",
    padding: "0 16px 0 0",
  }),
    menuList: (base) => ({
    ...base,
    maxHeight: 272,
    padding: "0 0 8px 0",
    overflowY: "auto",
    scrollbarWidth: "thin",
}),
  noOptionsMessage: (base) => ({
    ...base,
    padding: "14px 18px",
    color: "#8d929a",
  }),
};


export default customStyles;