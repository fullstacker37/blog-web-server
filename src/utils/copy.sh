#!/bin/sh
cd /Users/volibear/Desktop/study/blog-web-server/logs
cp access.log $(date +%Y-%m-%d).access.log
echo '' > access.log