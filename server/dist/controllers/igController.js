"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPost = void 0;
const axios_1 = __importDefault(require("axios"));
const getPost = async (req, res) => {
    try {
        const { limit, access_token } = req.query;
        const fields = "thumbnail_url,media_type,media_product_type,timestamp,like_count,comments_count,media_url,permalink";
        const data = await axios_1.default.get(`${process.env.INSTA_API}/${process.env.IG_BUSINESS_ID}/media`, {
            params: {
                fields,
                access_token: access_token,
                limit,
            },
        });
        res.json({ data: data.data.data });
    }
    catch (error) {
        res.json({ error: "someting went wrong" });
    }
};
exports.getPost = getPost;
//# sourceMappingURL=igController.js.map