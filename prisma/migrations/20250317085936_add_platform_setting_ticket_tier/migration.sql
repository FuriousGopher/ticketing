-- CreateTable
CREATE TABLE "PlatformSettings" (
    "id" SERIAL NOT NULL,
    "serviceFeeRate" DOUBLE PRECISION NOT NULL,
    "minimumFee" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PlatformSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TicketTier" (
    "id" SERIAL NOT NULL,
    "buyerPrice" DOUBLE PRECISION NOT NULL,
    "promoterReceivesPrice" DOUBLE PRECISION NOT NULL,
    "serviceFee" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "TicketTier_pkey" PRIMARY KEY ("id")
);
