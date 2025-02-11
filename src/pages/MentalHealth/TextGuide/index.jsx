export default function TextGuide({ text }) {
  return (
    <div className={"guide-title"}>
      <p className={"guide-description"}>{text}</p>
    </div>
  );
}
