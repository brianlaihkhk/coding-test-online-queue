#!/bin/sh
rm -rf build/
mkdir build/
chmod 777 build/

cp -rf serverless/ build/

mkdir build/Order/
cp -rf ../Order/ build/Order/

pip3 install -I -t build/ -r serverless/package.txt

cd build/
npm install serverless@1.73.1
npm install serverless-python-requirements
npm install serverless-prune-plugin
npm install serverless-scriptable-plugin
brew install mysql
brew install openssl
LDFLAGS=-L/usr/local/opt/openssl/lib pip install mysqlclient

case "$2" in
    -g|--group)
        if [[ $3 -eq "all" ]]
        then
            serverless deploy --function purchase
            serverless deploy --function queue
            serverless deploy --function session
        elif [[ $3 -eq "purchase" ]]
        then
            serverless deploy --function purchase
        elif [[ $3 -eq "queue" ]]
        then
            serverless deploy --function queue
        elif [[ $3 -eq "session" ]]
        then
            serverless deploy --function session
        else
            serverless $1 $2 $3 $4 $5 
        fi
        ;;
    *)
        serverless $1 $2 $3 $4 $5

        ;;
  esac

rm -rf build/
