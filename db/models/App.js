import mongoose from "mongoose";

const { Schema } = mongoose;

const appSchema = new Schema({
    name: { type: String, required: true },
    icon: { type: String },
    price: { type: String, required: true },
    currency: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String },
    renewPeriod: { type: String, required: true},
});

const App = mongoose.models.App || mongoose.model("App", appSchema);

export default App;