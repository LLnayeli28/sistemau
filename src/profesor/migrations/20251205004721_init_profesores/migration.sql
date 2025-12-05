-- CreateTable
CREATE TABLE "Profesor" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Profesor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Titulo" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Titulo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfesorTitulo" (
    "profesorId" INTEGER NOT NULL,
    "tituloId" INTEGER NOT NULL,

    CONSTRAINT "ProfesorTitulo_pkey" PRIMARY KEY ("profesorId","tituloId")
);

-- AddForeignKey
ALTER TABLE "ProfesorTitulo" ADD CONSTRAINT "ProfesorTitulo_profesorId_fkey" FOREIGN KEY ("profesorId") REFERENCES "Profesor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfesorTitulo" ADD CONSTRAINT "ProfesorTitulo_tituloId_fkey" FOREIGN KEY ("tituloId") REFERENCES "Titulo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
