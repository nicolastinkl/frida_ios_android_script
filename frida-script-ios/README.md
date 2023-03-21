# frida-ios-dump
Pull a decrypted IPA from a jailbroken device


## Usage

 1. Install [frida](http://www.frida.re/) on device
 2. `sudo pip install -r requirements.txt --upgrade`
 3. Run usbmuxd/iproxy SSH forwarding over USB (Default 2222 -> 22). e.g. `iproxy 2222 22`
 4. Run ./dump.py `Display name` or `Bundle identifier`

For SSH/SCP make sure you have your public key added to the target device's ~/.ssh/authorized_keys file.

```
./dump.py Aftenposten
Start the target app Aftenposten
Dumping Aftenposten to /var/folders/wn/9v1hs8ds6nv_xj7g95zxyl140000gn/T
start dump /var/containers/Bundle/Application/66423A80-0AFE-471C-BC9B-B571107D3C27/AftenpostenApp.app/AftenpostenApp
start dump /private/var/containers/Bundle/Application/66423A80-0AFE-471C-BC9B-B571107D3C27/AftenpostenApp.app/Frameworks/AFNetworking.framework/AFNetworking 
start dump /private/var/containers/Bundle/Application/66423A80-0AFE-471C-BC9B-B571107D3C27/AftenpostenApp.app/Frameworks/libswiftUIKit.dylib
Generating Aftenposten.ipa

Done.
```

Congratulations!!! You've got a decrypted IPA file.

Drag to [MonkeyDev](https://github.com/AloneMonkey/MonkeyDev), Happy hacking!

## Support

Python 2.x and 3.x


### issues

If the following error occurs:

* causes device to reboot
* lost connection
* unexpected error while probing dyld of target process

please open the application before dumping.


## Frida-scripts
分享个人工作中一些事半功倍的脚本
### iOS_Trace.js
#### 说明
* 根据关键词模糊Hook Objective-C方法，可以对类名和方法名模糊Hook，参考[FridaDev](https://github.com/houugen/FridaDev)，在此基础上进行了修改。
* 对Objective-C的地址进行判断（防止解析出错），默认拦截所有的@id对象类型的参数和返回值，并区分着色。
* 当拦截方法较多时，为避免Hook无关的关键词造成性能问题，可以对关键词通过filter列表设置过滤。
* 关键词大小写敏感，逆向找突破口的时候可尽情发挥想象力。
#### 举例
**trace("\*[\* \*md5\*]")--> 模糊Hook某应用签名**
![](./Images/trace_md5.png)

### CC_Hook_2Base64.js
#### 说明
* 博客中[秒破iOS APP加密数据](https://la0s.github.io/2018/12/07/iOS_Crypto/)中的脚本优化。  
* 由于原始CCCrypt函数的加解密结果存在原始的字节流，不方便查找和过滤，故增加Base64转化过程。
* 当KEY与IV不是明文时，以Hex形式打印，并对原始的CCCrypt函数参数进行翻译。
#### 举例
**拦截CCCrypt加密过程**
![](./Images/CC_Hook_2Base64.png)

### CC_MD5.js
#### 说明
* 对CC_MD5函数进行拦截。  
#### 举例
**拦截某应用MD5加密结果**
![](./Images/CC_MD5.png)

### CC_SHA1.js   CCHmac.js
#### 说明
* 对CC_SHA1  CCHmac函数进行拦截。
#### 举例
**拦截某应用Hmac加密过程及密钥**
![](./Images/CCHmac.png)