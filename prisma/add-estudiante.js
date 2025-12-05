const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const NOMBRE = 'ZUÑA COVEÑA NAYELI ALEXANDRA';
const CARRERA = 'Desarrollo de Software';
const MATERIAS = [
  'HERRAMIENTAS INFORMÁTICAS PARA EL DESPLIEGUE DE DIAGRAMAS',
  'PROBABILIDADES Y PROCESOS ESTOCÁSTICOS',
  'PROGRAMACIÓN DE APLICACIONES PARA DISPOSITIVOS MÓVILES',
  'PROYECTO INTEGRADOR DE SABERES (APLICACIONES CON BASE A LA ARQUITECTURA CLIENTE SERVIDOR)',
  'SOFTWARE APLICATIVO',
  'APLICACIONES TECNOLOGICAS AUTONOMAS',
];

async function main() {
  const carrera = await prisma.carrera.findFirst({ where: { nombre: CARRERA } });
  if (!carrera) throw new Error(`Carrera no encontrada: ${CARRERA}`);

  // crear/asegurar estudiante
  let estudiante = await prisma.estudiante.findFirst({ where: { nombre: NOMBRE } });
  if (!estudiante) {
    estudiante = await prisma.estudiante.create({
      data: { nombre: NOMBRE, carreraId: carrera.id },
    });
    console.log('✔ Estudiante creado:', estudiante.id, NOMBRE);
  } else if (estudiante.carreraId !== carrera.id) {
    estudiante = await prisma.estudiante.update({
      where: { id: estudiante.id },
      data: { carreraId: carrera.id },
    });
    console.log('↺ Estudiante ya existía; carrera actualizada');
  } else {
    console.log('↺ Estudiante ya existía');
  }

  // crear inscripciones a partir de los nombres de materias
  for (const nombreMateria of MATERIAS) {
    const materia = await prisma.materia.findFirst({ where: { nombre: nombreMateria } });
    if (!materia) {
      console.warn('⚠ Materia no encontrada, sáltese:', nombreMateria);
      continue;
    }
    const ya = await prisma.inscripcion.findFirst({
      where: { estudianteId: estudiante.id, materiaId: materia.id },
    });
    if (!ya) {
      await prisma.inscripcion.create({
        data: { estudianteId: estudiante.id, materiaId: materia.id },
      });
      console.log('✔ Inscrita en:', nombreMateria);
    } else {
      console.log('↺ Ya estaba inscrita en:', nombreMateria);
    }
  }
  console.log('Listo');
}

main()
  .catch((e) => { console.error('❌', e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
