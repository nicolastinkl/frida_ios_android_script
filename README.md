# frida_ios_android_script

# 1. How to use it ?
``
nantian@Mac-Studio frida-script-ios % cat hooker
#!/bin/bash
echo "hooking $1" > log
date | tee -ai log
#frida $HOOKER_DRIVER -l $1 com.blockchainvault | tee -ai log%
#frida-ps -Uai
frida-trace -U -f "$1" "$2"
``

# 2. How to get all apps?

![](https://github.com/nicolastinkl/frida_ios_android_script/blob/main/preview/Snipaste_2023-03-21_12-15-40.png?raw=true)
