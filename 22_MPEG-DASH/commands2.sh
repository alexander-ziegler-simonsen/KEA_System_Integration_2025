ffmpeg -i input.mp4 \
-map 0:v -map 0:a -b:v:0 200k -s:v:0 426x240 -profile:v:0 baseline -b:a:0 48k \
-map 0:v -map 0:a -b:v:1 400k -s:v:1 640x360 -profile:v:1 baseline -b:a:1 64k \
-map 0:v -map 0:a -b:v:2 800k -s:v:2 854x480 -profile:v:2 main     -b:a:2 96k \
-map 0:v -map 0:a -b:v:3 1200k -s:v:3 960x540 -profile:v:3 main    -b:a:3 96k \
-map 0:v -map 0:a -b:v:4 1800k -s:v:4 1280x720 -profile:v:4 high   -b:a:4 128k \
-map 0:v -map 0:a -b:v:5 2500k -s:v:5 1920x1080 -profile:v:5 high  -b:a:5 160k \
-f dash playlist.mpd