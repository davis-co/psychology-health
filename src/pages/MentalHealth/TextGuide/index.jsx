import styles from "./styles.module.css";

export default function TextGuide({ text }) {
  return (
    <div className={styles.container}>
      <p className={styles.text}>{text}</p>
    </div>
  );
}
