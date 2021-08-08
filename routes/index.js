const express = require('express');
const ytdl = require('ytdl-core');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/download', async (req, res) => {
  let videoUrl = req.body.videoUrl;
  let format = req.body.format;

  const info = await ytdl.getInfo(videoUrl);
  let fileName = info.videoDetails.title.replace('|', '').toString('ascii');

  res.header(
    'Content-Disposition',
    `attachment; filename="${fileName}.${format}"`
  );
  ytdl(videoUrl, {
    quality: 'highest',
    filter: format === 'mp3' ? 'audioonly' : 'videoandaudio'
  }).pipe(res);
});

module.exports = router;
