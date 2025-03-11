const express = require('express');
const cors = require('cors');
const aiRoutes = require('./routes/ai');

const app = express();

app.use(express.json());
app.use(cors()); // To handle cross-origin requests

// Add AI route
app.use('/api/ai', aiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
