-- Fixed-window rate limits, keyed by hashed network identifier.
CREATE TABLE "TelegramAuthRateLimit" (
  "key" TEXT NOT NULL,
  "windowStart" TIMESTAMP(3) NOT NULL,
  "count" INTEGER NOT NULL DEFAULT 1,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "TelegramAuthRateLimit_pkey" PRIMARY KEY ("key", "windowStart")
);
CREATE INDEX "TelegramAuthRateLimit_expiresAt_idx" ON "TelegramAuthRateLimit"("expiresAt");
