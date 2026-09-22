const express = require('express');
const router = express.Router();
const multer = require('multer');
const axios = require('axios');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/analyze', upload.single('image'), async (req, res) => {
    const base64Image = req.file.buffer.toString('base64');

    try {
        const response = await axios.post('https://api.plant.id/v2/identify', {
            images: [base64Image],
            organs: ["leaf"]
        }, {
            headers: { 'Api-Key': 'YOUR_PLANT_ID_API_KEY' }
        });

        const health = response.data.health_assessment;
        
        res.json({
            diagnosis: health.diseases[0].name,
            remedy: "apply organic neem oil and trim the affected leaves",
            fertilizerUrl: "https://paryavaran.vercel.app/shop/fertilizers"
        });
    } catch (err) {
        res.status(500).json({ error: "Analysis failed" });
    }
});

module.exports = router;