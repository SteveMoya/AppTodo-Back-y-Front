const Mongoose = require("mongoose");

const TodoSchema = new Mongoose.Schema({
  id: { type: Object },
  idUser: { type: String, required: true },
  title: { type: String, required: true },
  completed: { type: Boolean, required: true },
  date: { type: Date, default: Date.now },
});
TodoSchema.methods.toJSON = function () {
  const todo = this.toObject();
  delete todo.__v;
  return todo;
}
TodoSchema.methods.exists = async function () {
  return await Todo.exists({ id: this.id });
}
TodoSchema.methods.create = async function () {
  return await this.save();
}
TodoSchema.methods.update = async function () {
  return await Todo.findOneAndUpdate({ id: this.id }, this, { new: true });
}
TodoSchema.methods.delete = async function () {
  return await Todo.findOneAndDelete({ id: this.id });
}

module.exports = Mongoose.model("Todo", TodoSchema);
