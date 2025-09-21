const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const outFile = path.resolve(__dirname, 'events.ndjson');

const app = express();
app.use(bodyParser.json({limit: '1mb'}));

app.post('/ingest', (req, res) => {
  const r = req.body;
  if (!r || !r.request_id) return res.status(400).json({ error: 'bad payload' });
  fs.appendFileSync(outFile, JSON.stringify(r) + '\n');
  return res.status(202).json({ accepted: true });
});

app.get('/last/:n', (req, res) => {
  const n = Math.min(1000, parseInt(req.params.n, 10) || 50);
  if (!fs.existsSync(outFile)) return res.json([]);
  const lines = fs.readFileSync(outFile, 'utf8').trim().split('\n');
  const slice = lines.slice(-n).map(l => JSON.parse(l));
  res.json(slice.reverse());
});

const port = process.env.PORT || 4001;
app.listen(port, () => console.log(`Collector running on http://localhost:${port}`));
