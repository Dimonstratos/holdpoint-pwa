export function Splash() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#111",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#fff",
          marginBottom: 24,
          opacity: 0.8,
        }}
      />

      <p style={{ fontSize: 16, opacity: 0.7 }}>
        Ты не обязан справляться один
      </p>
    </div>
  );
}