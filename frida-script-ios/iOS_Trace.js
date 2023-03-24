
// 检查任意指针是否是有效的Objective-C对象
// 参考https://codeshare.frida.re/@mrmacete/objc-method-observer/



var NSData = ObjC.classes.NSData;
var NSString = ObjC.classes.NSString;

function unicode2str(str) {
    var ret = "";
    var ustr = "";
 
    for (var i = 0; i < str.length; i++) {
        var code = str.charCodeAt(i);
        var code16 = code.toString(16);
        if (code < 0xf) {
            ustr = "\\u" + "000" + code16;
        } else if(code < 0xff){
            ustr = "\\u" + "00" + code16;
        } else if(code < 0xfff){
            ustr = "\\u" + "0" + code16;
        } else {
            ustr = "\\u" + code16;
        }  
        ret += ustr;
    }
    return ret;
}

/* JavaScript String -> NSString */
function str(s) {
    return Memory.allocUtf8String(s);
}

function nsstr(str) {
    return ObjC.classes.NSString.stringWithUTF8String_(Memory.allocUtf8String(str));
}

/* NSString -> NSData */
function nsstr2nsdata(nsstr) {
    return nsstr.dataUsingEncoding_(4);
}

/* NSData -> NSString */
function nsdata2nsstr(nsdata) {
    return ObjC.classes.NSString.alloc().initWithData_encoding_(nsdata, 4);
}

/* Print Native Callstack */
function callstack() {
    console.log(Thread.backtrace(this.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join("\n") + "\n");
}

function callstack_() {
	console.log(ObjC.classes.NSThread.callStackSymbols().toString());
}

/* c function wrapper */
function getExportFunction(type, name, ret, args) {
    var nptr;
    nptr = Module.findExportByName(null, name);
    if (nptr === null) {
        console.log("cannot find " + name);
        return null;
    } else {
        if (type === "f") {
            var funclet = new NativeFunction(nptr, ret, args);
            if (typeof funclet === "undefined") {
                console.log("parse error " + name);
                return null;
            }
            return funclet;
        } else if (type === "d") {
            var datalet = Memory.readPointer(nptr);
            if (typeof datalet === "undefined") {
                console.log("parse error " + name);
                return null;
            }
            return datalet;
        }
    }
}

function modload(modpath) {
    var dlopen = getExportFunction("f", "dlopen", "pointer", ["pointer", "int"]);
    dlopen(str(modpath), 1);
}

function getscreensize() {
    var UIScreen = ObjC.classes.UIScreen;
    return UIScreen.mainScreen().bounds()[1];
}

function click(x, y) {
    // https://github.com/zjjno/PTFakeTouchDemo.git 编译为dylib
    modload("/Library/MobileSubstrate/DynamicLibraries/PTFakeTouch.dylib")
    var touchxy = getExportFunction("f", "touchxy", "void", ["int", "int"]);
    touchxy(x, y);
}

function _utf8_encode(string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);
        if (c < 128) {
            utftext += String.fromCharCode(c);
        } else if ((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
        } else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
        }
    }
    return utftext;
}

// 获取keychain数据
function getkeychain() {
    var NSMutableDictionary=ObjC.classes.NSMutableDictionary;
    var kCFBooleanTrue = ObjC.Object(getExportFunction("d", "kCFBooleanTrue"));
    var kSecReturnAttributes = ObjC.Object(getExportFunction("d", "kSecReturnAttributes"));
    var kSecMatchLimitAll = ObjC.Object(getExportFunction("d", "kSecMatchLimitAll"));
    var kSecMatchLimit = ObjC.Object(getExportFunction("d", "kSecMatchLimit"));
    var kSecClassGenericPassword = ObjC.Object(getExportFunction("d", "kSecClassGenericPassword"));
    var kSecClassInternetPassword = ObjC.Object(getExportFunction("d", "kSecClassInternetPassword"));
    var kSecClassCertificate = ObjC.Object(getExportFunction("d", "kSecClassCertificate"));
    var kSecClassKey = ObjC.Object(getExportFunction("d", "kSecClassKey"));
    var kSecClassIdentity = ObjC.Object(getExportFunction("d", "kSecClassIdentity"));
    var kSecClass = ObjC.Object(getExportFunction("d","kSecClass"));

    var query = NSMutableDictionary.alloc().init();
    var SecItemCopyMatching = getExportFunction("f", "SecItemCopyMatching", "int", ["pointer", "pointer"]);
    [kSecClassGenericPassword, kSecClassInternetPassword, kSecClassCertificate, kSecClassKey, 
        kSecClassIdentity].forEach(function(secItemClass) {
            query.setObject_forKey_(kCFBooleanTrue, kSecReturnAttributes);
            query.setObject_forKey_(kSecMatchLimitAll, kSecMatchLimit);
            query.setObject_forKey_(secItemClass, kSecClass);
            var result = Memory.alloc(8);
            Memory.writePointer(result, ptr("0"));
            SecItemCopyMatching(query.handle, result);
            var pt = Memory.readPointer(result);
            if (!pt.isNull()) {
                console.log(ObjC.Object(pt).toString());
            }
        }
    )
}

/* Base64 Encode */
function base64(input) {
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    input = _utf8_encode(input);
    while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
    }
    return output;
}

function CheckObjc(p) {
    var klass = getObjCClassPtr(p);
    return ! klass.isNull();
}

function getObjCClassPtr(p) {
    /*
     * Loosely based on:
     * https://blog.timac.org/2016/1124-testing-if-an-arbitrary-pointer-is-a-valid-objective-c-object/
     */
    var ISA_MASK = ptr('0x0000000ffffffff8');
    var ISA_MAGIC_MASK = ptr('0x000003f000000001');
    var ISA_MAGIC_VALUE = ptr('0x000001a000000001');

    if (!isReadable(p))
        return NULL;
    var isa = p.readPointer();
    var classP = isa;
    if (classP.and(ISA_MAGIC_MASK).equals(ISA_MAGIC_VALUE))
        classP = isa.and(ISA_MASK);
    if (isReadable(classP)) 
        return classP;
    return NULL;
}

function isReadable(p) {
    try {
        p.readU8();
        return true;
    } catch(e) {
        return false;
    }
}


// color着色
var Color = {
    RESET: "\x1b[39;49;00m", Black: "0;01", Blue: "4;01", Cyan: "6;01", Gray: "7;01", Green: "2;01", Purple: "5;01", Red: "1;01", Yellow: "3;01",
    Light: {
        Black: "0;11", Blue: "4;11", Cyan: "6;11", Gray: "7;01", Green: "2;11", Purple: "5;11", Red: "1;11", Yellow: "3;11"
    }
};

var LOG = function (input, kwargs) {
    kwargs = kwargs || {};
    var logLevel = kwargs['l'] || 'log', colorPrefix = '\x1b[3', colorSuffix = 'm';
    if (typeof input === 'object')
        input = JSON.stringify(input, null, kwargs['i'] ? 2 : null);
    if (kwargs['c'])
        input = colorPrefix + kwargs['c'] + colorSuffix + input + Color.RESET;
    console[logLevel](input);
};


// https://codeshare.frida.re/@lichao890427/ios-utils/
// var NSData = ObjC.classes.NSData;
// var NSString = ObjC.classes.NSString;

// /* NSData -> NSString */
// function NSData2NSString(NSData) {
//     return ObjC.classes.NSString.alloc().initWithData_encoding_(NSData, 4);
// }


// generic trace
function trace(pattern) {
    var type = (pattern.indexOf(" ") !== -1) ? "objc":"module";
    var res = new ApiResolver(type);
    var matches = res.enumerateMatchesSync(pattern);
    var targets = uniqBy(matches, JSON.stringify);

    targets.forEach(function(target) {
        if (type === "objc") {
            var filter = [  // 自定义过滤条件，方法名称中不含以下关键词
                "SDK",
                "Monitor",
                "_"
            ];
            for (var i = 0, Traceflag = 0; i < filter.length; i++) {
                if (target.name.indexOf(filter[i]) != -1) {
                   Traceflag = 1;
                }
            }
            if (Traceflag === 0) {
                LOG("Tracing - Name: "+ target.name +" address: "+ target.address, { c: Color.Gray });
                // console.log("Tracing " + target.name +" "+ target.address);
                traceObjC(target.address, target.name);
            }
        }
        else if (type === "module") {
            traceModule(target.address, target.name);
        }
    });
}

// remove duplicates from array
function uniqBy(array, key) {
    var seen = {};
    return array.filter(function(item) {
        var k = key(item);
        return seen.hasOwnProperty(k) ? false: (seen[k] = true);
    });
}

// trace ObjC methods
function traceObjC(impl, name) {
    Interceptor.attach(impl, {
        onEnter: function(args) {
            // debug only the intended calls
             console.log("Tracing " + name);
            console.log("[+] ---------------------------------------------------------------");
            LOG("*** entering " + name, { c: Color.Green });
            // console.log("*** entered " + name);

            // print full backtrace
            // console.log('\tACCURATE Backtrace:\n\t' + Thread.backtrace(this.context,Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join('\n\t'));
            // console.log('\tFUZZY Backtrace:\n\t' + Thread.backtrace(this.context,Backtracer.FUZZY).map(DebugSymbol.fromAddress).join('\n\t'));

            // print caller
            // console.log("[+] Caller: " + DebugSymbol.fromAddress(this.returnAddress));

            // print args
            if (name.indexOf(":") !== -1) {  // 有参数的逻辑处理
                var param = name.split(":");
                param[0] = param[0].split(" ")[1];
                for (var i = 0; i < param.length - 1; i++) {
                    // console.log("[+] args"+"["+ (i+2) +"] objc: " + CheckObjc(args[i + 2]));
                    if (CheckObjc(args[i + 2])) {
                        printArg("arg"+(i+2)+" "+ param[i] + ": ", args[i + 2]);
                    }
                }
                // 防止遗漏Receiver对象
                if (CheckObjc(args[0])) {
                    // 无参数的Objective-C方法，打印args[0]
                    var param1 = new ObjC.Object(args[0]);
                    LOG("[+] 类 args[0]: " + param1, { c: Color.Gray });
                    // console.log("[+] args[0]: " + param1);
                    console.log("[+] type: " + param1.$className);
                }

            } else {  // 无参数的逻辑处理,如-[NSString md5]
                if (CheckObjc(args[0])) {
                    // 无参数的Objective-C方法，打印args[0]
                    var param1 = new ObjC.Object(args[0]);
                    LOG("[+] 类 args[0]: " + param1, { c: Color.Gray });
                    // console.log("[+] args[0]: " + param1);
                    console.log("[+] type: " + param1.$className);
                }
            }
        },

        onLeave: function(retval) {
            // console.log("[+] retval objc: " + CheckObjc(retval));
            if (CheckObjc(retval)) {
                printArg("retval: ", retval);
            }

            LOG("*** exited " + name, { c: Color.Green });
            // console.log("*** exiting " + name);
            console.log("[-] ---------------------------------------------------------------\n");
        }
    });
}

// print helper
function printArg(desc, arg) {
    try {
        var objcParam = ObjC.Object(arg);
        var objcType = objcParam.$className;

        // [+] arg3: {length = 36, bytes = 0x37374131 30324232 2d323736 462d3435 ... 34333430 43313143 }
        // [+] type: NSConcreteMutableData
        // ==>
        // [+] arg3: 77A102B2-276F-4542-8F33-0DF84340C11C
        // [+] type: __NSCFString
        

        
        if (desc.indexOf("arg") != -1 ) {   // 区分参数与返回值着色
            LOG("[+] " + desc + objcParam, { c: Color.Gray }); 
        } else {
            //LOG("[+] " + desc + objcParam, { c: Color.Cyan });

            if (objcType == "NSConcreteMutableData" || objcType == "_NSInlineData" || objcType == "NSConcreteData") {    // 将NSConcreteMutableData等类型转化为NSString打印
                try {
                    // objcParam = NSData2NSString(objcParam);  // 非可见字符不会报异常
                    objcParam = objcParam.bytes().readUtf8String(objcParam.length());
                    LOG*("返回值解密:"+objcParam);
                } catch(e){
                    objcParam = objcParam.CKHexString();     // 非可见字符, 打印hex
                }
                console.log("[返回值]" + objcType + " NSData 类型数据，不显示");                
                // var objcParam22 = NSData2NSString(objcParam);  // 非可见字符不会报异常
                // console.log(">>>>> "+nsdata2nsstr(objcParam));

            }else{
                LOG("[返回值] "+ objcType + desc + objcParam, { c: Color.Cyan }); 
            }
        }
        // console.log("[+] " + desc + objcParam);

        console.log("[+] type: " + objcType);
    } catch(err) {
        console.log("error: "+desc + arg);
    }
}



// trace ObjC methods
function traceAESUtils(impl, name) {
    Interceptor.attach(impl, {
        onEnter: function(args) {
            // debug only the intended calls
             console.log("Tracing " + name);
            console.log("[+] ---------------------------------------------------------------");
            LOG("*** entering " + name, { c: Color.Green });
            // console.log("*** entered " + name);

            // print full backtrace
            // console.log('\tACCURATE Backtrace:\n\t' + Thread.backtrace(this.context,Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join('\n\t'));
            // console.log('\tFUZZY Backtrace:\n\t' + Thread.backtrace(this.context,Backtracer.FUZZY).map(DebugSymbol.fromAddress).join('\n\t'));

            // print caller
            // console.log("[+] Caller: " + DebugSymbol.fromAddress(this.returnAddress));

            // print args
            if (name.indexOf(":") !== -1) {  // 有参数的逻辑处理
                var param = name.split(":");
                param[0] = param[0].split(" ")[1];
                for (var i = 0; i < param.length - 1; i++) {
                    // console.log("[+] args"+"["+ (i+2) +"] objc: " + CheckObjc(args[i + 2]));
                    if (CheckObjc(args[i + 2])) {
                        printArg("arg"+(i+2)+" "+ param[i] + ": ", args[i + 2]);
                    }
                }
                // 防止遗漏Receiver对象
                if (CheckObjc(args[0])) {
                    // 无参数的Objective-C方法，打印args[0]
                    var param1 = new ObjC.Object(args[0]);
                    LOG("[+] args[0]: " + param1, { c: Color.Gray });
                    // console.log("[+] args[0]: " + param1);
                    console.log("[+] type: " + param1.$className);
                }

            } else {  // 无参数的逻辑处理,如-[NSString md5]
                if (CheckObjc(args[0])) {
                    // 无参数的Objective-C方法，打印args[0]
                    var param1 = new ObjC.Object(args[0]);
                    LOG("[+] args[0]: " + param1, { c: Color.Gray });
                    // console.log("[+] args[0]: " + param1);
                    console.log("[+] type: " + param1.$className);
                }
            }
        },

        onLeave: function(retval) {
            // console.log("[+] retval objc: " + CheckObjc(retval));
            if (CheckObjc(retval)) {
               // printArg("retval: ", retval);
            }

            LOG("*** exiting " + name, { c: Color.Green });
            // console.log("*** exiting " + name);
            console.log("[-] ---------------------------------------------------------------\n");
        }
    });
}

// ----------------------usage examples---------------------------
if (ObjC.available) {

    // trace("*[* *md5*]"); //trace("*[* *MD5*]");
    // trace("*[* *Encode*]");
    // trace("*[* setObject:forKey:]");
    // trace("+[* *write*:]");
    // trace("*[MD5 *]");
    // trace("*[* *Sign*:*]");
    // trace("*[* *base64*:*]");
    // trace("*[* *Encrypt*:*]");
    
    
    // trace("-[NSMutableURLRequest setValue:forHTTPHeaderField:]");

    // trace("*[AESUtils *]");  //文件协议解密类
    
    // trace("*[ServerConnectUtils *]");
    
    // trace("*[AESUtils decryptFile*]");
    
    // trace("*[IJKFFMoviePlayerController setHudUrl*]"); //播放类，设置URL

    trace("*[M3U8Parser setM3u8NetAddress*]");
    trace("*[M3U8Parser setKey*]");
    // trace("*[RNAESUtils *]");
    // trace("*[M3U8DownloaderModel *]");  //离线下载
    trace("*[DADownloadUrlResolver *]");
    trace("-[RNServiceConnect rnSendGetReques*:*]");
    trace("*[InitServerConnect *]");
    trace("*[IJKFFMoviePlayerController initWithContentURL*]");
    
    trace("*[ServerConnectUtils sendHttpPost*]");
    trace("*[ServerInfo getVideoAESKey]");
    trace("*[AESUtils encrypt*]");
    trace("*[AESUtils decrypt*]");
    

    //文件解密类：jpg/webp/ts/m3u8
    //LOG("Tracing "+ target.name +" "+ target.address, { c: Color.Gray });
    // Tracing +[AESUtils decryptFile:sourceFile:destFile:] -[IJKFFMoviePlayerController setHudUrl:] address: 0x102b73954
    // traceAESUtils("","+[AESUtils baseEncrypt:sourceFile:destFile:]");


} else {
    send("error: Objective-C Runtime is not available!");
}
// ---------------------------------------------------------------

