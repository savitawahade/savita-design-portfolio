"use strict";
(async () => {
  const response = await fetch('content.json', {cache:'no-store'});
  if (!response.ok) return;
  const data = await response.json();
  const project = data.projects.find(project => project.id === 'diddit');
  if (!project?.screens?.length) return;
  const image = document.getElementById('diddit-screen');
  const previous = document.getElementById('diddit-previous');
  const next = document.getElementById('diddit-next');
  const tour = document.querySelector('.diddit-tour');
  let index = 0;
  const render = () => {
    const screen = project.screens[index];
    image.src = screen.src; image.alt = screen.alt;
    document.getElementById('diddit-counter').textContent = `${index+1} / ${project.screens.length} · ${screen.label}`;
    document.getElementById('diddit-explanation').textContent = screen.explanation;
    previous.disabled = index === 0; next.disabled = index === project.screens.length-1;
  };
  const move = direction => { const target=index+direction; if(target>=0 && target<project.screens.length) {index=target;render();} };
  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  tour.addEventListener('keydown', event => {if(event.key === 'ArrowLeft') {event.preventDefault();move(-1);} if(event.key === 'ArrowRight') {event.preventDefault();move(1);}});
  render();
})().catch(() => { document.getElementById('diddit-counter').textContent = 'Welcome · More screens in the Figma file'; });
