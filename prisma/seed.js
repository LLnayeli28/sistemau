/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function ensureCarrera(nombre) {
  let carrera = await prisma.carrera.findFirst({ where: { nombre } });
  if (!carrera) carrera = await prisma.carrera.create({ data: { nombre } });
  return carrera;
}

async function ensureMateria(nombre) {
  let materia = await prisma.materia.findFirst({ where: { nombre } });
  if (!materia) materia = await prisma.materia.create({ data: { nombre } });
  return materia;
}

async function ensureProfesor(nombre, titulo = 'Docente') {
  let profesor = await prisma.profesor.findFirst({ where: { nombre } });
  if (!profesor) profesor = await prisma.profesor.create({ data: { nombre, titulo } });
  return profesor;
}

async function ensureCMateria(carreraId, materiaId) {
  const exists = await prisma.cMateria.findFirst({ where: { carreraId, materiaId } });
  if (!exists) await prisma.cMateria.create({ data: { carreraId, materiaId } });
}

async function ensurePMateria(profesorId, materiaId) {
  const exists = await prisma.pMateria.findFirst({ where: { profesorId, materiaId } });
  if (!exists) await prisma.pMateria.create({ data: { profesorId, materiaId } });
}

async function ensureCProfesor(carreraId, profesorId) {
  const exists = await prisma.cProfesor.findFirst({ where: { carreraId, profesorId } });
  if (!exists) await prisma.cProfesor.create({ data: { carreraId, profesorId } });
}

async function main() {
  // 1) Carrera principal
  const carrera = await ensureCarrera('Desarrollo de Software');

  // 2) Materias (de tu captura)
  const materiasInput = [
    'HERRAMIENTAS INFORMÁTICAS PARA EL DESPLIEGUE DE DIAGRAMAS',
    'PROBABILIDADES Y PROCESOS ESTOCÁSTICOS',
    'PROGRAMACIÓN DE APLICACIONES PARA DISPOSITIVOS MÓVILES',
    'PROYECTO INTEGRADOR DE SABERES (APLICACIONES CON BASE A LA ARQUITECTURA CLIENTE SERVIDOR)',
    'SOFTWARE APLICATIVO',
    'APLICACIONES TECNOLOGICAS AUTONOMAS',
  ];

  // 3) Profesores (de tu captura)
  const profesoresInput = [
    { nombre: 'VACACELA SACA JHOSTIN OMAR', titulo: 'Ing.' },
    { nombre: 'GUILLERMO LEON WILSON ADRIAN', titulo: 'Ing.' },
    { nombre: 'ALIDAS PEREZ STEPHANY CAROLINA', titulo: 'Ing.' },
    { nombre: 'GUAMAN BUESTAN MARCO AURELIO', titulo: 'Ing.' },
    { nombre: 'GUILLERMO LEON WILSON ADRIAN', titulo: 'Ing.' },
    { nombre: 'TIGRE AVILA HENRY PAUL', titulo: 'Ing.' },
  ];

  // 4) Crear materias y vincularlas a la carrera (CMateria)
  const materias = [];
  for (let i = 0; i < materiasInput.length; i++) {
    const m = await ensureMateria(materiasInput[i]);
    materias.push(m);
    await ensureCMateria(carrera.id, m.id);
  }

  // 5) Vincular profesor ↔ materia (PMateria) y profesor ↔ carrera (CProfesor)
  for (let i = 0; i < profesoresInput.length; i++) {
    const { nombre, titulo } = profesoresInput[i];
    const prof = await ensureProfesor(nombre, titulo);
    const mat = materias[i];
    await ensurePMateria(prof.id, mat.id);
    await ensureCProfesor(carrera.id, prof.id);
  }

  console.log('Seed completado');
}

main()
  .catch((e) => {
    console.error(' Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
