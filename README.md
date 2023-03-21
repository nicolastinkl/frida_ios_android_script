# frida_ios_android_script
frida_ios_android_script
<<<
nantian@Mac-Studio frida-script-ios % cat hooker
#!/bin/bash
echo "hooking $1" > log
date | tee -ai log
#frida $HOOKER_DRIVER -l $1 com.blockchainvault | tee -ai log%
#frida-ps -Uai
frida-trace -U -f "$1" "$2"
<<<


![]()
