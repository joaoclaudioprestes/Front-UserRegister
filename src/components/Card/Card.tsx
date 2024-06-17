import { Trash } from "lucide-react";
import styled from "./Card.module.css";

interface CardProps {
  id: string;
  name: string;
  email: string;
  onDelete: (id: string) => void;
}

const Card = ({ id, name, email, onDelete }: CardProps) => {
  const handleDelete = async () => {
    try {
      await fetch(`https://user-register-api.vercel.app/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      onDelete(id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styled.divCard} key={id}>
      <div>
        <p>Nome: {name}</p>
        <p>E-mail: {email}</p>
      </div>
      <button className={styled.iconDelete} onClick={handleDelete}>
        <Trash />
      </button>
    </div>
  );
};

export default Card;
