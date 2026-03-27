-- CreateTable
CREATE TABLE "tournaments" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',

    CONSTRAINT "tournaments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "players" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "handicap" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "players_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teams" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tournament_teams" (
    "id" SERIAL NOT NULL,
    "tournament_id" INTEGER NOT NULL,
    "team_id" INTEGER,
    "name" TEXT NOT NULL,

    CONSTRAINT "tournament_teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tournament_team_members" (
    "id" SERIAL NOT NULL,
    "tournament_team_id" INTEGER NOT NULL,
    "player_id" INTEGER NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'player',

    CONSTRAINT "tournament_team_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fixture_rounds" (
    "id" SERIAL NOT NULL,
    "tournament_id" INTEGER NOT NULL,
    "round_number" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,
    "cup" TEXT NOT NULL,
    "phase" TEXT NOT NULL,

    CONSTRAINT "fixture_rounds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fixture_slots" (
    "id" SERIAL NOT NULL,
    "fixture_round_id" INTEGER NOT NULL,
    "slot_number" INTEGER NOT NULL,
    "team_a_source_type" TEXT NOT NULL,
    "team_a_source_slot_id" INTEGER,
    "team_a_assigned_id" INTEGER,
    "team_b_source_type" TEXT NOT NULL,
    "team_b_source_slot_id" INTEGER,
    "team_b_assigned_id" INTEGER,

    CONSTRAINT "fixture_slots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "matches" (
    "id" SERIAL NOT NULL,
    "tournament_id" INTEGER NOT NULL,
    "fixture_slot_id" INTEGER NOT NULL,
    "team_a_score" INTEGER,
    "team_b_score" INTEGER,
    "winner_team_id" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'scheduled',
    "played_at" TIMESTAMP(3),

    CONSTRAINT "matches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team_tournament_status" (
    "id" SERIAL NOT NULL,
    "tournament_id" INTEGER NOT NULL,
    "tournament_team_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active_gold',

    CONSTRAINT "team_tournament_status_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "players_email_key" ON "players"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tournament_team_members_tournament_team_id_player_id_key" ON "tournament_team_members"("tournament_team_id", "player_id");

-- CreateIndex
CREATE UNIQUE INDEX "matches_fixture_slot_id_key" ON "matches"("fixture_slot_id");

-- CreateIndex
CREATE UNIQUE INDEX "team_tournament_status_tournament_team_id_key" ON "team_tournament_status"("tournament_team_id");

-- CreateIndex
CREATE UNIQUE INDEX "team_tournament_status_tournament_id_tournament_team_id_key" ON "team_tournament_status"("tournament_id", "tournament_team_id");

-- AddForeignKey
ALTER TABLE "tournament_teams" ADD CONSTRAINT "tournament_teams_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "tournaments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournament_teams" ADD CONSTRAINT "tournament_teams_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournament_team_members" ADD CONSTRAINT "tournament_team_members_tournament_team_id_fkey" FOREIGN KEY ("tournament_team_id") REFERENCES "tournament_teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournament_team_members" ADD CONSTRAINT "tournament_team_members_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fixture_rounds" ADD CONSTRAINT "fixture_rounds_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "tournaments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fixture_slots" ADD CONSTRAINT "fixture_slots_fixture_round_id_fkey" FOREIGN KEY ("fixture_round_id") REFERENCES "fixture_rounds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fixture_slots" ADD CONSTRAINT "fixture_slots_team_a_assigned_id_fkey" FOREIGN KEY ("team_a_assigned_id") REFERENCES "tournament_teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fixture_slots" ADD CONSTRAINT "fixture_slots_team_b_assigned_id_fkey" FOREIGN KEY ("team_b_assigned_id") REFERENCES "tournament_teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fixture_slots" ADD CONSTRAINT "fixture_slots_team_a_source_slot_id_fkey" FOREIGN KEY ("team_a_source_slot_id") REFERENCES "fixture_slots"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fixture_slots" ADD CONSTRAINT "fixture_slots_team_b_source_slot_id_fkey" FOREIGN KEY ("team_b_source_slot_id") REFERENCES "fixture_slots"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "tournaments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_fixture_slot_id_fkey" FOREIGN KEY ("fixture_slot_id") REFERENCES "fixture_slots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_winner_team_id_fkey" FOREIGN KEY ("winner_team_id") REFERENCES "tournament_teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_tournament_status" ADD CONSTRAINT "team_tournament_status_tournament_id_fkey" FOREIGN KEY ("tournament_id") REFERENCES "tournaments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_tournament_status" ADD CONSTRAINT "team_tournament_status_tournament_team_id_fkey" FOREIGN KEY ("tournament_team_id") REFERENCES "tournament_teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
