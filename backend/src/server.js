const { BodyValidator } = require("./validators/BodyValidator");
const cors = require('cors');
const express = require("express");
const app = express();

app.use(cors())
app.use(express.json());

app.post("/", async (req, res) => {
    try {
        const sanitizedBody = await BodyValidator.validateAsync(req.body);
        console.log(sanitizedBody)
        return res.json({
            success: true,
            message: "You are good to go.",
            data: {
                createdAt: new Date(),
                body: sanitizedBody,
            }
        })
    } catch (error) {
        return res.json({
            message: error?.message,
            data: error,
            success: false
        });
    }
})
app.listen(3000, () => {
    console.log(`Server is running on port 3000`)
})