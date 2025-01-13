import SCL90Image from "@/assets/images/scl90.svg";
import MentalHealthImage from "@/assets/images/mental-health.svg";
import { i18n } from "./i18n";

export const links = [
  {
    title: i18n.mentalHealth,
    link: "mental-health",
    image: MentalHealthImage,
  },
  {
    title: i18n.neo,
    link: "neo",
    image: SCL90Image,
  },
  {
    title: i18n.scl90,
    link: "scl90",
    image: SCL90Image,
  },
  {
    title: "MCMI3",
    link: "/mcmi3",
    image: "",
  },
  {
    title: "EQ",
    link: "/eq",
    image: "",
  },
];
