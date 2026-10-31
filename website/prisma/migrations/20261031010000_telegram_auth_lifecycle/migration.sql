-- Telegram authentication is feature-gated and remains disabled until deployment validation.
-- Replay keys and session keys are one-way SHA-256 digests; never store raw initData or bearer tokens.
CREATE TABLE "TelegramLaunchReplay" (
  "key" TEXT NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "TelegramLaunchReplay_pkey" PRIMARY KEY ("key")
);
CREATE INDEX "TelegramLaunchReplay_expiresAt_idx" ON "TelegramLaunchReplay"("expiresAt");

CREATE TABLE "TelegramAuthSession" (
  "key" TEXT NOT NULL,
  "telegramUserId" TEXT NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "revokedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "TelegramAuthSession_pkey" PRIMARY KEY ("key")
);
CREATE INDEX "TelegramAuthSession_telegramUserId_expiresAt_idx" ON "TelegramAuthSession"("telegramUserId", "expiresAt");
CREATE INDEX "TelegramAuthSession_expiresAt_idx" ON "TelegramAuthSession"("expiresAt");
