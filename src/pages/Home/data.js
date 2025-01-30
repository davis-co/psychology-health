import SCL90Image from "@/assets/images/scl90.svg";
import NEO from "@/assets/images/neo.svg";
import MCMI3 from "@/assets/images/mcmi3.svg";
import EQ from "@/assets/images/eq.svg";
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
    image: NEO,
  },
  {
    title: i18n.scl90,
    link: "scl90",
    image: SCL90Image,
  },
  {
    title: "MCMI3",
    link: "/mcmi3",
    image: MCMI3,
  },
  {
    title: "EQ",
    link: "/eq",
    image: EQ,
  },
];
