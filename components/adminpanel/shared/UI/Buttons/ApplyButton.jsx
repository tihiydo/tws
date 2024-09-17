
import Button from '@mui/material/Button';
import styles from './buttons.module.scss'

export default function ApplyButton({text}) {
  return (
      <Button variant="contained" className={styles.applayButton}>{text}</Button>
  );
}