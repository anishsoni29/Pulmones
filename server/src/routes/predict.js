"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const openai_1 = require("openai");
const router = express_1.default.Router();
const openai = new openai_1.OpenAIApi(new openai_1.Configuration({ apiKey: process.env.OPENAI_API_KEY }));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { symptoms } = req.body;
    if (!symptoms)
        return res.status(400).json({ error: 'Symptoms are required' });
    try {
        const response = yield openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `Given the following symptoms, identify the lung disease: ${symptoms}`,
            max_tokens: 150,
        });
        const prediction = (_b = (_a = response.data.choices[0]) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.trim();
        res.json({ prediction });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch prediction' });
    }
}));
exports.default = router;
