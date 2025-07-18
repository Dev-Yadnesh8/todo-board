function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  endIcon,
  ...rest
}) {
  return (
    <div
      style={{
        marginBottom: "1rem",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <label
        htmlFor={name}
        style={{ marginBottom: "0.5rem", fontWeight: "500" }}
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        style={{
          padding: "0.75rem 1rem",
          border: "1px solid #ccc",
          borderRadius: "10px",
          fontSize: "1rem",
          outline: "none",
          paddingRight: endIcon ? "2.5rem" : "1rem",
        }}
        {...rest}
      />
      {endIcon && (
        <span
          style={{
            position: "absolute",
            right: "12px",
            top: "43px",
            cursor: "pointer",
          }}
        >
          {endIcon}
        </span>
      )}
    </div>
  );
}

export default InputField;
