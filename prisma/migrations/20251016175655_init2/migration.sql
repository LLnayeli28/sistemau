-- CreateTable
CREATE TABLE "Carrera" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Carrera_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Materia" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Materia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profesor" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,

    CONSTRAINT "Profesor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estudiante" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "carreraId" INTEGER NOT NULL,

    CONSTRAINT "Estudiante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inscripcion" (
    "id" SERIAL NOT NULL,
    "estudianteId" INTEGER NOT NULL,
    "materiaId" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Inscripcion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CMateria" (
    "id" SERIAL NOT NULL,
    "carreraId" INTEGER NOT NULL,
    "materiaId" INTEGER NOT NULL,

    CONSTRAINT "CMateria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PMateria" (
    "id" SERIAL NOT NULL,
    "profesorId" INTEGER NOT NULL,
    "materiaId" INTEGER NOT NULL,

    CONSTRAINT "PMateria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CProfesor" (
    "id" SERIAL NOT NULL,
    "carreraId" INTEGER NOT NULL,
    "profesorId" INTEGER NOT NULL,

    CONSTRAINT "CProfesor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CMateria_carreraId_materiaId_key" ON "CMateria"("carreraId", "materiaId");

-- CreateIndex
CREATE UNIQUE INDEX "PMateria_profesorId_materiaId_key" ON "PMateria"("profesorId", "materiaId");

-- CreateIndex
CREATE UNIQUE INDEX "CProfesor_carreraId_profesorId_key" ON "CProfesor"("carreraId", "profesorId");

-- AddForeignKey
ALTER TABLE "Estudiante" ADD CONSTRAINT "Estudiante_carreraId_fkey" FOREIGN KEY ("carreraId") REFERENCES "Carrera"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscripcion" ADD CONSTRAINT "Inscripcion_estudianteId_fkey" FOREIGN KEY ("estudianteId") REFERENCES "Estudiante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscripcion" ADD CONSTRAINT "Inscripcion_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CMateria" ADD CONSTRAINT "CMateria_carreraId_fkey" FOREIGN KEY ("carreraId") REFERENCES "Carrera"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CMateria" ADD CONSTRAINT "CMateria_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PMateria" ADD CONSTRAINT "PMateria_profesorId_fkey" FOREIGN KEY ("profesorId") REFERENCES "Profesor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PMateria" ADD CONSTRAINT "PMateria_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CProfesor" ADD CONSTRAINT "CProfesor_carreraId_fkey" FOREIGN KEY ("carreraId") REFERENCES "Carrera"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CProfesor" ADD CONSTRAINT "CProfesor_profesorId_fkey" FOREIGN KEY ("profesorId") REFERENCES "Profesor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
