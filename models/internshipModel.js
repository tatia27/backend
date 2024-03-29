import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  focusOfInternship: {
    type: String,
    required: true,
    enum: [
      "Frontend-разработчик",
      "Backend-разработчик",
      "Мобильный разработчик",
      "Системный администратор",
      "Разработчик игр",
      "Тестировщик",
      "Аналитик",
      "Дизайнер",
      "Менеджер",
      "Рекрутер",
      "Другое",
    ],
  },
  typeOfInternship: {
    type: String,
    unique: true,
    enum: ["Оплачиваемая", "Неоплачиваемая"],
  },
  schedule: {
    type: String,
    required: true,
    enum: ["В офисе", "Удалённо"],
  },
  typeOfEmployment: {
    type: String,
    required: true,
    enum: ["Полная", "Частичная"],
  },
  time: {
    type: String,
    required: true,
  },
  salory: {
    type: Number,
    required: true,
  },
  skills: {
    type: String,
    required: true,
  },
  conditions: {
    type: String,
    required: true,
  },
});

export default mongoose.model("internship", internshipSchema);
