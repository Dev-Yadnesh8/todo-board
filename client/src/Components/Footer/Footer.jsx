function Footer() {
  return (
    <footer
      style={{
        width: "100%",
        padding: "1rem 2rem",
        backgroundColor: "#f5f5f5",
        textAlign: "center",
        fontSize: "0.875rem",
        color: "#666",
        borderTop: "1px solid #ddd",
        marginTop: "auto",
      }}
    >
      © {new Date().getFullYear()} ToDo Board. All rights reserved.
    </footer>
  );
}

export default Footer;
