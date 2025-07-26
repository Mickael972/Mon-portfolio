import {
    mobile,
    backend,
    creator,
    web,
    javascript,
    typescript,
    html,
    css,
    reactjs,
    php,
    tailwind,
    symfony,
    mysql,
    git,
    figma,
    docker,
    previsionmeteo,
    jobit,
    tripguide,
    threejs,
  } from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "A propos",
    },
    {
      id: "work",
      title: "Projets",
    },
    {
      id: "documents",
      title: "Documents",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];
  
  const services = [
    {
      title: "Développeur Web",
      icon: web,
    },
    {
      title: "Développeur Mobile",
      icon: mobile,
    },
    {
      title: "Développeur Backend",
      icon: backend,
    },

  ];
  
  const technologies = [
    {
      name: "HTML 5",
      icon: html,
    },
    {
      name: "CSS 3",
      icon: css,
    },
    {
      name: "JavaScript",
      icon: javascript,
    },
    {
      name: "TypeScript",
      icon: typescript,
    },
    {
      name: "React JS",
      icon: reactjs,
    },
    {
      name: "Tailwind CSS",
      icon: tailwind,
    },
    {
      name: "PHP",
      icon: php,
    },
    {
      name: "Three JS",
      icon: threejs,
    },
    {
      name: "git",
      icon: git,
    },
    {
      name: "figma",
      icon: figma,
    },
    {
      name: "docker",
      icon: docker,
    },
    {
      name: "MySQL",
      icon: mysql,
    },
    {
      name: "Symfony",
      icon: symfony,
    },
  ];
  

  
  const projects = [
    {
      name: "Prévision Météo",
      description:
        "Application mobile développée avec Expo et React Native pour consulter la météo d'une ville en fonction de son nom.",
      tags: [
        {
          name: "react-native",
          color: "blue-text-gradient",
        },
        {
          name: "expo",
          color: "green-text-gradient",
        },
        {
          name: "typescript",
          color: "pink-text-gradient",
        },
      ],
      image: previsionmeteo,
      source_code_link: "https://github.com/Mickael972/pr-vision-m-t-o",
    },
    {
      name: "Projet Web3",
      description:
        "Application Krypt - plateforme de transfert de crypto-monnaies utilisant Web 3.0, Solidity et MetaMask pour des transactions sécurisées sur la blockchain Ethereum.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "solidity",
          color: "green-text-gradient",
        },
        {
          name: "metamask",
          color: "pink-text-gradient",
        },
      ],
      image: jobit,
      source_code_link: "https://github.com/",
    },
    {
      name: "Projet IoT",
      description:
        "Système de tracking de l'ISS et des satellites en temps réel avec géolocalisation, interface vocale et notifications Discord 2 minutes avant le passage.",
      tags: [
        {
          name: "raspberry-pi",
          color: "blue-text-gradient",
        },
        {
          name: "nasa-api",
          color: "green-text-gradient",
        },
        {
          name: "python",
          color: "pink-text-gradient",
        },
      ],
      image: tripguide, // Placeholder - à remplacer par votre image IoT
      source_code_link: "https://github.com/",
    },
  ];
  
  export { services, technologies, projects };