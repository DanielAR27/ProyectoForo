import mongoose from "mongoose";


// La entrada debe ser algo como {text: "Hola mundo"}
const messageSchema = new mongoose.Schema(
    // Define el campo 'text' como un string obligatorio
    {text: {type: String, required: true}},
    // Permite guardar la fecha de creación y actualización del mensaje
    {timestamps: true}
);

export default mongoose.model("Message", messageSchema);
