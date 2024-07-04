#!/bin/bash


# Stop the script if any command fails
set -e


cd frontend
pnpm run dev 


cd ../backend
pnpm run dev

docker start url-short-DB


