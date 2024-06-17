import { useEffect, useState } from "react";
import styled from "./App.module.css";
import img from "./assets/user-profile-100.svg";
import Card from "./components/Card/Card";

interface User {
  id: string;
  name: string;
  email: string;
}

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [users, setUsers] = useState<User[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = {
      name,
      email,
    };

    try {
      const response = await fetch("https://user-register-api.vercel.app/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      setUsers((prevUsers) => [...prevUsers, data]);
      setName("");
      setEmail("");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://user-register-api.vercel.app/all"
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  return (
    <>
      <div className={styled.container}>
        <div className={styled.divTop}>
          <img src={img} alt="Imagem Cadastro" className={styled.img} />
          <h1>UserRegister</h1>
        </div>
        <div className={styled.divForm}>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">
              <span>Nome</span>
              <input
                type="text"
                placeholder="Nome"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </label>
            <label htmlFor="email">
              <span>Email</span>
              <input
                type="email"
                id="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </label>
            <button type="submit">Cadastrar</button>
          </form>
        </div>

        <div className={styled.divUsers}>
          {users.map((user) => (
            <Card
              key={user.id}
              name={user.name}
              email={user.email}
              id={user.id}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
