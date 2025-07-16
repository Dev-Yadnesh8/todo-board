function Button({ children, type = "button", onClick }) {
  return (
    <button
      type={type}
      onClick={onClick && onClick}
      style={{
        width: "100%",
        padding: "0.75rem",
        backgroundColor: "#646cff",
        color: "white",
        fontWeight: "600",
        fontSize: "1rem",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

export default Button;
