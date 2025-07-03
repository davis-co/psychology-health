import { useNavigate } from "react-router-dom";
import { links } from "./data";
import { Page } from "davis-components";

export default function Home() {
  const navigate = useNavigate();
  return <Page router routes={links} navigate={navigate} />;
}
