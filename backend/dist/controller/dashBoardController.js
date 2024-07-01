"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashBoardController = void 0;
const dashBoardController = (req, res) => {
    try {
        //@ts-ignore
        const data = req.user;
        res.status(200).json({
            username: data.username,
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal Server error",
        });
    }
};
exports.dashBoardController = dashBoardController;
