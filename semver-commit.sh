#!/bin/sh
echo "Committing changes to git..."
git config user.email "1310.runnymede.robotics@gmail.com"
git config user.name "Runnymede Robotics CI"
git add package.json package-lock.json
git commit -m "chore(release): update package.json and package-lock.json"
git push
npm run build