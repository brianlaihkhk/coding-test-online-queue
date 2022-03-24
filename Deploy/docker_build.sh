#!/bin/sh
rm -rf build/
mkdir build/
chmod 777 build/
mkdir build/resources

cp -rf ../Order/ build/
cp -rf resources/ build/resources/

cd build/
docker build ./ -t online-queue/order:0.2

cd ..
rm -rf build/
