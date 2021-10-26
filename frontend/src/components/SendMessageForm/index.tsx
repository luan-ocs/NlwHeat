import { VscSignOut, VscGithubInverted} from "react-icons/vsc";
import styles from "./styles.module.scss";
import { AuthContext } from "../../contexts/auth";
import { useContext, useState, FormEvent } from "react";
import { api } from "../../services/api";
export function SendMessageForm() {
  const { user, signOut } = useContext(AuthContext);
  const [message, setMessage] = useState("");

  async function handleSendMessage(e: FormEvent) {
    e.preventDefault();
    if(!message.trim()) {
        return;
    }

    api.post("messages", { message });

    setMessage("")
  }
  return (
    <div className={styles.sendMessageWrapper}>
      <button onClick={signOut} className={styles.signOutButton}>
        <VscSignOut size="32" />
      </button>

      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>
        <strong className={styles.userName}>{user?.name}</strong>
        <span className={styles.userGithub}>
          <VscGithubInverted />
          {user?.login}
        </span>
      </header>

      <form onSubmit={handleSendMessage} className={styles.sendMessageForm}>
        <label htmlFor="message">Mensagem</label>
        <textarea
          name="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          id="message"
          placeholder="qual sua espectativa para o evento ?"
        />
        <button type="submit">Enviar Mensagem</button>
      </form>
    </div>
  );
}
