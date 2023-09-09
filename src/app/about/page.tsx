'use client';

import { useState } from 'react';
import PersonCard from './components/personCard';
import PersonDetailes from './components/personDetailes';
import BigPopup from '../account/components/passwordChange/popup/passwordChangePopup';
import Border from '../account/components/border/border';

export type PersonInfo = {
  name: string;
  role: string;
  photoUrl: string;
  githubUrl: string;
  description: string;
  contributions: string;
};

export default function Page() {
  const persons: PersonInfo[] = [
    {
      name: 'Roman Shevyakov',
      role: 'Team Lead',
      photoUrl: '/Shevyakov.jpg',
      githubUrl: 'https://github.com/ramzes-84',
      description:
        'At this moment I am trying to achieve new knowledge and get a profession of JavaScript Front-End Developer.',
      contributions: 'contributions: Something',
    },
    {
      name: 'Lyubov Agulova',
      role: 'Developer',
      photoUrl: '/Agulova.jpg',
      githubUrl: 'https://github.com/lu7623',
      description:
        "Hello! My name is Lyubov Agulova and I'm a student in the Rolling Scopes School frontend developer course. I’m studying here from December 2022.I’m 31 years old, I was born in Voronezh, Russia, and now I live in Saint Petersburg . I graduated as a Bachelor of radiophysics from Voronezh State University in 2013. I’m currently working as a stained glass crafter in my small home workshop. I’m a self-taught glass artist and I think self education is a strong point of my personality. Also running business gave me skills such as flexibility, resourcefulness, and persistence in achieving goals.",
      contributions: 'contributions: Something',
    },
    {
      name: 'Kseniya Merkulova',
      role: 'Developer',
      photoUrl: '/Merkulova.jpg',
      githubUrl: 'https://github.com/mksenni',
      description:
        'At this moment I am trying to achieve new knowledge and get a profession of JavaScript Front-End Developer.',
      contributions: 'contributions: Something',
    },
  ];
  const [isOpen, setIsOpen] = useState<number | null>(null);
  const handleOpenPersonCard = (index: number | null) => {
    index === isOpen ? setIsOpen(null) : setIsOpen(index);
  };
  return (
    <>
      <h1 className="text-center uppercase text-2xl font-serif my-5 font-bold text-emerald-900">About US</h1>
      <div className="flex flex-col items-center gap-y-6">
        {persons.map((person, index) => (
          <PersonCard
            key={index}
            name={person.name}
            role={person.role}
            photoUrl={person.photoUrl}
            githubUrl={person.githubUrl}
            onClick={() => {
              handleOpenPersonCard(index);
            }}
          />
        ))}
        <Border title="Our collaboration">
          <span>
            Describe how the team effectively collaborated to carry out the project and achieve a successful outcome
          </span>
        </Border>
      </div>
      {isOpen !== null && (
        <BigPopup
          onClose={(event) => {
            event.preventDefault();
            setIsOpen(null);
          }}
        >
          <PersonDetailes
            name={persons[isOpen].name}
            role={persons[isOpen].role}
            photoUrl={persons[isOpen].photoUrl}
            githubUrl={persons[isOpen].githubUrl}
            description={persons[isOpen].description}
            contributions={persons[isOpen].contributions}
          />
        </BigPopup>
      )}
    </>
  );
}
