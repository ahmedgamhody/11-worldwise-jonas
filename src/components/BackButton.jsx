import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function BackButton() {
  const nav = useNavigate();
  return (
    <Button
      type="back"
      onClick={(e) => {
        e.preventDefault();
        nav(-1);
      }}
    >
      &larr; Back
    </Button>
  );
}
