import AboutClient from "./AboutClient"; 
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Our Mission & Team',
  description: 'Meet the founding team behind the INANST ecosystem and learn how we are solving the long technology problem in Africa.',
  openGraph: {
    title: 'Our Mission & Team | INANST Ecosystem',
    description: 'Meet the founding team behind the INANST ecosystem and learn how we are solving the long technology problem in Africa.',
  }
};

export default function AboutPage() {
  return <AboutClient />;
}