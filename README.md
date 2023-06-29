# frida_ios_android_script

# iOS 
### 1. How to use it ?
``
nantian@Mac-Studio frida-script-ios % cat hooker
#!/bin/bash
echo "hooking $1" > log
date | tee -ai log
#frida $HOOKER_DRIVER -l $1 com.blockchainvault | tee -ai log%
#frida-ps -Uai
frida-trace -U -f "$1" "$2"
``

### 2. How to get all apps?

![](https://github.com/nicolastinkl/frida_ios_android_script/blob/main/preview/Snipaste_2023-03-21_12-15-40.png?raw=true)


# android 
hooker是一个基于frida实现的逆向工具包。为逆向开发人员提供统一化的脚本包管理方式、通杀脚本、自动化生成hook脚本、内存漫游探测activity和service、frida版JustTrustMe。
