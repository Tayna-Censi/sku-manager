-- CreateTable
CREATE TABLE "Sku" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "descricaoComercial" TEXT NOT NULL,
    "codigoSku" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sku_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sku_codigoSku_key" ON "Sku"("codigoSku");
