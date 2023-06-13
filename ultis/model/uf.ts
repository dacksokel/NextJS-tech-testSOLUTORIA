
import mongoose, { Model } from "mongoose"

const TestSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    nombreIndicador: {
        type: String,
        required: true
    },
    codigoIndicador: {
        type: String,
        required: true
    },
    unidadMedidaIndicador: {
        type: String,
        required: true
    },
    valorIndicador: {
        type: Number,
        required: true
    },
    fechaIndicador: {
        type: String,
        required: true
    },
    tiempoIndicador: {
        type: String,
        required: false

    },
    origenIndicador: {
        type: String,
        required: false

    }
}, { timestamps: true });

export default mongoose.models.Test || mongoose.model('Test', TestSchema);

// export default Test;


