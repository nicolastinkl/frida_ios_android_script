//crack by com.tencent.mobileqq 8.9.33
//com.tencent.mobileqq.qwallet.hb.send.busylogic.impl.b
function loadDexfile(dexfile) {
    Java.perform(function() {
          Java.openClassFile(dexfile).load();
          //console.log("load " + dexfile);
    });
};

function checkLoadDex(className, dexfile) {
    Java.perform(function() {
        if (!classExists(className)) {
            Java.openClassFile(dexfile).load();
            //console.log("load " + dexfile);
        }
    });
};

function classExists(className) {
    var exists = false;
    try {
        var clz = Java.use(className);
        exists = true;
    } catch(err) {
        //console.log(err);
    }
    return exists;
};

function getClassName(obj) {
    if (obj.getClass) {
        return obj.getClass().getName();
    }
    var javaObject = Java.use("java.lang.Object");
    return Java.cast(obj, javaObject).getClass().getName();
}

//str1是否包含str2，str2可用正则表示
function contains(str1, str2) {
    var reg = RegExp(eval("/"+str2+"/"));
    if(str1 && str1.match && str1.match(reg)){
        return true;
    }else{
        return false;
    }
};

//创建ArrayList对象用这个方法就好了
function newArrayList() {
    var ArrayListClz = Java.use('java.util.ArrayList');
    return ArrayListClz.$new();
}

//创建HashSet对象用这个方法就好了
function newHashSet() {
    var HashSetClz = Java.use('java.util.HashSet');
    return HashSetClz.$new();
}

//创建HashMap对象用这个方法就好了
function newHashMap() {
    var HashMapClz = Java.use('java.util.HashMap');
    return HashMapClz.$new();
}

function newMethodBeat(text, executor) {
    var threadClz = Java.use("java.lang.Thread");
    var androidLogClz = Java.use("android.util.Log");
    var exceptionClz = Java.use("java.lang.Exception");
    var processClz = Java.use("android.os.Process");
    var currentThread = threadClz.currentThread();
    var beat = new Object();
    beat.invokeId = Math.random().toString(36).slice( - 8);
    beat.executor = executor;
    beat.myPid = processClz.myPid();
    beat.threadId = currentThread.getId();
    beat.threadName = currentThread.getName();
    beat.text = text;
    beat.startTime = new Date().getTime();
    beat.stackInfo = androidLogClz.getStackTraceString(exceptionClz.$new()).substring(20);
    return beat;
};

function printBeat(beat) {
    var str = ("------------pid:" + beat.myPid + ",startFlag:" + beat.invokeId + ",objectHash:"+beat.executor+",thread(id:" + beat.threadId +",name:" + beat.threadName + "),timestamp:" + beat.startTime+"---------------\n");
    str += beat.text + "\n";
    str += beat.stackInfo;
    str += ("------------endFlag:" + beat.invokeId + ",usedtime:" + (new Date().getTime() - beat.startTime) +"---------------\n");
	console.log(str);
};

var log = console.log;

var print = console.log;

function getBaseContext() {
    var currentApplication = Java.use('android.app.ActivityThread').currentApplication();
    var context = currentApplication.getApplicationContext();
    return context; //Java.scheduleOnMainThread(fn):
};

function sleep(time) {
    var startTime = new Date().getTime() + parseInt(time, 10);
    while(new Date().getTime() < startTime) {}
};

//byte数组转String，这个方法不能直接调，把方法逻辑内嵌到你的方法体。这里只是展示语法，告诉你怎么转
function byteArrayToStringStudy() {
    var bytes = null;//假如bytes是一个java的byte[]
    var JavaString = Java.use("java.lang.String");//声明java类
    var result = JavaString.$new(bytes, "utf-8");//result就是java的String
}



var loadedXRadar = false;

function loadXinitDexfile(dexfile) {
    loadDexfile('/data/user/0/com.tencent.mobileqq/xinit/'+dexfile);
};

function loadXRadarDexfile() {
    loadedXRadar = true;
    loadDexfile('/data/user/0/com.tencent.mobileqq/radar.dex');
};

function fastTojson(javaObject) {
    var JSONClz = Java.use("gz.com.alibaba.fastjson.JSON");
    return JSONClz.toJSONString(javaObject);
};

function getPrettyString(javaObject) {
    var XPretty = Java.use("gz.util.XPretty");
    return XPretty.getPrettyString(javaObject);
};

function xPretty(javaObject) {
    var str = getPrettyString(javaObject);
    console.log(str);
};

function getField(javaObject, fieldName) {
    var X = Java.use("gz.util.X");
    return X.getField(javaObject, fieldName);
};

function storeObjectAndLog(javaObject) {
    try {
        var className = getClassName(javaObject);
        var ObjectsStore = Java.use("gz.radar.objects.ObjectsStore");
        var objectId = ObjectsStore.storeObject(javaObject);
        console.log(className + " ObjectsStoreId: " +objectId);
    } catch (error) {
        console.error("你传的不是一个有效的java对象!");
    }
};



//com.tencent.mobileqq.qwallet.hb.send.busylogic.impl.b
Java.perform(function() {
    var com_tencent_mobileqq_qwallet_hb_send_busylogic_impl_b_clz = Java.use('com.tencent.mobileqq.qwallet.hb.send.busylogic.impl.b');
    var com_tencent_mobileqq_qwallet_hb_send_busylogic_impl_b_clz_method_c_9103 = com_tencent_mobileqq_qwallet_hb_send_busylogic_impl_b_clz.c.overload('int', 'int', 'java.lang.String');
    com_tencent_mobileqq_qwallet_hb_send_busylogic_impl_b_clz_method_c_9103.implementation = function(v0, v1, v2) {
        var executor = this.hashCode();
        var beatText = 'public java.lang.String com.tencent.mobileqq.qwallet.hb.send.busylogic.impl.b.c(int,int,java.lang.String)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_tencent_mobileqq_qwallet_hb_send_busylogic_impl_b_clz_method_c_9103.call(this, v0, v1, v2);
        printBeat(beat);
        return ret;
    };
    var com_tencent_mobileqq_qwallet_hb_send_busylogic_impl_b_clz_method_b_0044 = com_tencent_mobileqq_qwallet_hb_send_busylogic_impl_b_clz.b.overload('int', 'com.tencent.mobileqq.qwallet.hb.b$a');
    com_tencent_mobileqq_qwallet_hb_send_busylogic_impl_b_clz_method_b_0044.implementation = function(v0, v1) {
        var executor = this.hashCode();
        var beatText = 'public java.util.ArrayList com.tencent.mobileqq.qwallet.hb.send.busylogic.impl.b.b(int,com.tencent.mobileqq.qwallet.hb.b$a)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_tencent_mobileqq_qwallet_hb_send_busylogic_impl_b_clz_method_b_0044.call(this, v0, v1);
        printBeat(beat);
        return ret;
    };
    var com_tencent_mobileqq_qwallet_hb_send_busylogic_impl_b_clz_method_a_5405 = com_tencent_mobileqq_qwallet_hb_send_busylogic_impl_b_clz.a.overload('int', 'int');
    com_tencent_mobileqq_qwallet_hb_send_busylogic_impl_b_clz_method_a_5405.implementation = function(v0, v1) {
        var executor = this.hashCode();
        var beatText = 'public com.tencent.mobileqq.qwallet.hb.a.a com.tencent.mobileqq.qwallet.hb.send.busylogic.impl.b.a(int,int)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_tencent_mobileqq_qwallet_hb_send_busylogic_impl_b_clz_method_a_5405.call(this, v0, v1);
        printBeat(beat);
        return ret;
    };
    var com_tencent_mobileqq_qwallet_hb_send_busylogic_impl_b_clz_init_7679 = com_tencent_mobileqq_qwallet_hb_send_busylogic_impl_b_clz.$init.overload();
    com_tencent_mobileqq_qwallet_hb_send_busylogic_impl_b_clz_init_7679.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'public com.tencent.mobileqq.qwallet.hb.send.busylogic.impl.b()';
        var beat = newMethodBeat(beatText, executor);
        var returnObj = com_tencent_mobileqq_qwallet_hb_send_busylogic_impl_b_clz_init_7679.call(this);
        printBeat(beat);
        return returnObj;
    };
});