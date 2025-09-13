export default function Footer() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        gap: "0.5rem",
      }}
    >
      <div>Built With ❤️ by Dhanjit Nath </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <i
          className=" pi pi-github"
          style={{
            fontSize: "1.3rem",
            cursor: "pointer",
            textDecoration: "none",
          }}
        ></i>
        <a
          href="https://github.com/developerDhanjit/DataTableSSR"
          target="_blank"
        >
          <p>Github Url</p>
        </a>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <i
          className=" pi pi-envelope"
          style={{
            fontSize: "1.3rem",
            cursor: "pointer",
            textDecoration: "none",
          }}
        ></i>
        <a href="mailto:dhanjitznath@gmail.com">
          <p>Mail </p>
        </a>
      </div>
    </div>
  );
}
