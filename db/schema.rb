# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_06_15_203948) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "game_logs", force: :cascade do |t|
    t.string "status"
    t.integer "rating"
    t.date "date_started"
    t.date "date_stopped"
    t.date "date_completed"
    t.integer "play_time"
    t.bigint "game_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["game_id"], name: "index_game_logs_on_game_id"
    t.index ["user_id"], name: "index_game_logs_on_user_id"
  end

  create_table "games", force: :cascade do |t|
    t.string "cover"
    t.string "name"
    t.string "platforms"
    t.integer "release_date"
    t.string "involved_company"
    t.string "player_perspective"
    t.integer "aggregated_rating"
    t.integer "aggregated_rating_count"
    t.string "summary"
    t.bigint "genre_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "artworks"
    t.string "screenshots"
    t.string "keywords"
    t.string "websites"
    t.index ["genre_id"], name: "index_games_on_genre_id"
  end

  create_table "genres", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "profiles", force: :cascade do |t|
    t.string "name"
    t.integer "age"
    t.string "avatar"
    t.string "bio"
    t.integer "total_games_played"
    t.string "favorite_genre"
    t.integer "hours_played"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_profiles_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "game_logs", "games"
  add_foreign_key "game_logs", "users"
  add_foreign_key "games", "genres"
  add_foreign_key "profiles", "users"
end
