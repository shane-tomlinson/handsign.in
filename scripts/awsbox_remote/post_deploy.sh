#!/bin/bash

if [ ! -d ../idp-cert ]; then
  mkdir ../idp-cert
fi

echo `pwd`
cp -R ../idp-cert .

