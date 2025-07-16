function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  ...rest
}) {
  return (
    <div
      style={{ marginBottom: "1rem", display: "flex", flexDirection: "column" }}
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
        }}
        {...rest}
      />
    </div>
  );
}

export default InputField;
