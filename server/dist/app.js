"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const timeRoute_1 = __importDefault(require("./route/timeRoute"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRoute_1 = __importDefault(require("./route/userRoute"));
const adminRoute_1 = __importDefault(require("./route/adminRoute"));
const { PORT, MONGO_URL, MONGODB_NAME } = process.env;
const cors = require('cors');
const app = (0, express_1.default)();
const port = 5000;
app.use(cors());
app.use(express_1.default.json());
app.use("/time", timeRoute_1.default);
app.use("/user", userRoute_1.default);
app.use("/admin", adminRoute_1.default);
mongoose_1.default.connect("mongodb://localhost:27017/Worktime");
const db = mongoose_1.default.connection;
db.on('error', console.error.bind(console, 'MongoDB Connection error'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});
app.get('/', (req, res) => {
    res.send('SERVER HEALTH OKAY');
});
app.listen(port, () => {
    console.log('>>>>> OPEN WK SERVER http://localhost:5000');
});
