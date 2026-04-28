import styles from "./ErrorMessage.module.scss";

interface Props {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorMessage({
  title = "Error",
  message = "Something went wrong...",
  onRetry,
}: Props) {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.text}>{message}</p>
      {onRetry && (
        <button onClick={onRetry} className={styles.button}>
          Try again
        </button>
      )}
    </div>
  );
}
