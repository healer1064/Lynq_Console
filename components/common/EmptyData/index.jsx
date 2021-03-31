const EmptyData = ({ title }) => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "10%",
      }}
    >
      <span style={{ color: "#888" }}>{title}</span>
    </div>
  );
};

export default EmptyData;
