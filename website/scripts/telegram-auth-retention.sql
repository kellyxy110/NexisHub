-- Run through an approved scheduled database job, not a public HTTP endpoint.
-- All keys are irreversible digests; do not log identifiers or row contents.
-- Replay expiry and session expiry are authoritative even before cleanup.
DELETE FROM "TelegramLaunchReplay" WHERE "expiresAt" < NOW() - INTERVAL '1 hour';
DELETE FROM "TelegramAuthSession" WHERE "expiresAt" < NOW() - INTERVAL '1 day';
DELETE FROM "TelegramAuthRateLimit" WHERE "expiresAt" < NOW() - INTERVAL '1 hour';
