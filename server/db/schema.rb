# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20190311233103) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "complete_problems", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "problem_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["problem_id"], name: "index_complete_problems_on_problem_id"
    t.index ["user_id"], name: "index_complete_problems_on_user_id"
  end

  create_table "course_progresses", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "problem_id"
    t.bigint "course_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "solution"
    t.index ["course_id"], name: "index_course_progresses_on_course_id"
    t.index ["problem_id"], name: "index_course_progresses_on_problem_id"
    t.index ["user_id"], name: "index_course_progresses_on_user_id"
  end

  create_table "courses", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.integer "teacher_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "courses_users", id: false, force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "course_id", null: false
    t.index ["course_id", "user_id"], name: "index_courses_users_on_course_id_and_user_id"
    t.index ["user_id", "course_id"], name: "index_courses_users_on_user_id_and_course_id"
  end

  create_table "problems", force: :cascade do |t|
    t.text "statement"
    t.text "description"
    t.text "solution"
    t.bigint "course_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["course_id"], name: "index_problems_on_course_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.boolean "teacher"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "complete_problems", "problems"
  add_foreign_key "complete_problems", "users"
  add_foreign_key "course_progresses", "courses"
  add_foreign_key "course_progresses", "problems"
  add_foreign_key "course_progresses", "users"
end
