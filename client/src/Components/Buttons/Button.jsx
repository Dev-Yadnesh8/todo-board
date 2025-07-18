function Button({ children, type = "button", onClick, disabled = false }) {
  return (
    <button
      id="btn"
      disabled={disabled}
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
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        transition: "opacity 0.2s ease",
      }}
    >
      {children}
    </button>
  );
}

export default Button;
