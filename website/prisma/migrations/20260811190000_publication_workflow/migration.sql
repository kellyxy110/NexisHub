CREATE TABLE "Publication" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "abstract" TEXT,
    "publicationType" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "publicationDate" TIMESTAMP(3),
    "canonicalPath" TEXT NOT NULL,
    "doi" TEXT,
    "reviewLevel" TEXT,
    "licence" TEXT,
    "dataAvailability" TEXT,
    "authors" JSONB NOT NULL,
    "keywords" JSONB NOT NULL,
    "content" TEXT,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Publication_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "PublicationVersion" (
    "id" TEXT NOT NULL,
    "publicationId" TEXT NOT NULL,
    "versionNumber" INTEGER NOT NULL,
    "versionLabel" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "contentSnapshot" JSONB NOT NULL,
    "metadataSnapshot" JSONB NOT NULL,
    "changeSummary" TEXT,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "submittedForReviewAt" TIMESTAMP(3),
    "approvedAt" TIMESTAMP(3),
    "publishedAt" TIMESTAMP(3),
    CONSTRAINT "PublicationVersion_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "PublicationEvent" (
    "id" TEXT NOT NULL,
    "publicationId" TEXT NOT NULL,
    "versionId" TEXT,
    "eventType" TEXT NOT NULL,
    "actorId" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PublicationEvent_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Publication_slug_key" ON "Publication"("slug");
CREATE INDEX "Publication_status_publicationDate_idx" ON "Publication"("status", "publicationDate");
CREATE INDEX "Publication_publicationType_status_idx" ON "Publication"("publicationType", "status");
CREATE UNIQUE INDEX "PublicationVersion_publicationId_versionNumber_key" ON "PublicationVersion"("publicationId", "versionNumber");
CREATE INDEX "PublicationVersion_publicationId_status_idx" ON "PublicationVersion"("publicationId", "status");
CREATE INDEX "PublicationEvent_publicationId_createdAt_idx" ON "PublicationEvent"("publicationId", "createdAt");
CREATE INDEX "PublicationEvent_eventType_createdAt_idx" ON "PublicationEvent"("eventType", "createdAt");

ALTER TABLE "PublicationVersion" ADD CONSTRAINT "PublicationVersion_publicationId_fkey" FOREIGN KEY ("publicationId") REFERENCES "Publication"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PublicationEvent" ADD CONSTRAINT "PublicationEvent_publicationId_fkey" FOREIGN KEY ("publicationId") REFERENCES "Publication"("id") ON DELETE CASCADE ON UPDATE CASCADE;
