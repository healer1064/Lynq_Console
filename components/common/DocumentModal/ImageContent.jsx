const ImageContent = (source) => {
  return (
    <img
      src={source.source}
      alt="document"
      style={{
        width: "80%",
        height: "80%",
        objectFit: "contain",
        objectPosition: "center",
      }}
    />
  );
};

export default ImageContent;
