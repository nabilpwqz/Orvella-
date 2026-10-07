import React from "react";
import { BottleIcon, ShieldIcon, SparkleIcon, ClockIcon } from "../../common/Icons";

export interface Feature {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
}

export const featuresData: Feature[] = [
  {
    id: 1,
    number: "01",
    title: "Olfactive Precision",
    subtitle: "Grasse Extraction",
    description: "Macerated in small artisanal vessels using sustainably harvested botanical absolutes and aged raw resins.",
    icon: SparkleIcon,
  },
  {
    id: 2,
    number: "02",
    title: "Architectural Flacons",
    subtitle: "Weighted Crystal & Brass",
    description: "Heavy crystal flacons finished with hand-brushed champagne metal collars, created as enduring tactile objects.",
    icon: BottleIcon,
  },
  {
    id: 3,
    number: "03",
    title: "Identity Driven",
    subtitle: "Beyond Gender",
    description: "Formulations constructed around emotional resonance and personal aura rather than arbitrary categorization.",
    icon: ShieldIcon,
  },
  {
    id: 4,
    number: "04",
    title: "Cellar Maturation",
    subtitle: "16-Week Maceration",
    description: "Each numbered batch rests in temperature-monitored dark chambers to achieve seamless note equilibrium.",
    icon: ClockIcon,
  },
];
