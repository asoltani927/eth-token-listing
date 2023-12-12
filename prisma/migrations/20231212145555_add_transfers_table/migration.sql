-- CreateTable
CREATE TABLE "transfers" (
    "id" SERIAL NOT NULL,
    "cuid" TEXT NOT NULL,
    "token_address" TEXT NOT NULL,
    "from_address" TEXT NOT NULL,
    "to_address" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "transaction_hash" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "transfers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "transfers_cuid_key" ON "transfers"("cuid");

-- CreateIndex
CREATE INDEX "transfers_deleted_idx" ON "transfers"("deleted");

-- CreateIndex
CREATE INDEX "transfers_token_address_idx" ON "transfers"("token_address");

-- CreateIndex
CREATE INDEX "transfers_from_address_idx" ON "transfers"("from_address");

-- CreateIndex
CREATE INDEX "transfers_to_address_idx" ON "transfers"("to_address");

-- CreateIndex
CREATE INDEX "transfers_transaction_hash_idx" ON "transfers"("transaction_hash");
