//crack by com.tencent.mobileqq 8.9.33
//com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity
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



//com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity
Java.perform(function() {
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz = Java.use('com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity');
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_onRewardHbResult_0892 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.onRewardHbResult.overload('org.json.JSONObject');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_onRewardHbResult_0892.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'protected void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.onRewardHbResult(org.json.JSONObject)';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_onRewardHbResult_0892.call(this, v0);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_initReportFromOncreate_8271 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.initReportFromOncreate.overload('java.lang.String');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_initReportFromOncreate_8271.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'private void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.initReportFromOncreate(java.lang.String)';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_initReportFromOncreate_8271.call(this, v0);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_onActivityResult_7653 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.onActivityResult.overload('int', 'int', 'android.content.Intent');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_onActivityResult_7653.implementation = function(v0, v1, v2) {
        var executor = this.hashCode();
        var beatText = 'protected void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.onActivityResult(int,int,android.content.Intent)';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_onActivityResult_7653.call(this, v0, v1, v2);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_showToast_0331 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.showToast.overload('java.lang.CharSequence', 'int');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_showToast_0331.implementation = function(v0, v1) {
        var executor = this.hashCode();
        var beatText = 'public void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.showToast(java.lang.CharSequence,int)';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_showToast_0331.call(this, v0, v1);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_requestWindowFeature_5498 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.requestWindowFeature.overload('android.content.Intent');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_requestWindowFeature_5498.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'protected void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.requestWindowFeature(android.content.Intent)';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_requestWindowFeature_5498.call(this, v0);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_getHbSkinLogic_3733 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.getHbSkinLogic.overload();
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_getHbSkinLogic_3733.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'public com.tencent.mobileqq.qwallet.hb.send.busylogic.impl.e com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.getHbSkinLogic()';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_getHbSkinLogic_3733.call(this);
        printBeat(beat);
        return ret;
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_onFaceHbResult_7092 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.onFaceHbResult.overload('org.json.JSONObject');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_onFaceHbResult_7092.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'protected void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.onFaceHbResult(org.json.JSONObject)';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_onFaceHbResult_7092.call(this, v0);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_initLogicType_2816 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.initLogicType.overload('java.lang.String');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_initLogicType_2816.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'private void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.initLogicType(java.lang.String)';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_initLogicType_2816.call(this, v0);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_finishIfHiddenMakeView_3107 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.finishIfHiddenMakeView.overload();
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_finishIfHiddenMakeView_3107.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'private void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.finishIfHiddenMakeView()';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_finishIfHiddenMakeView_3107.call(this);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_access$100_1498 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.access$100.overload('com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_access$100_1498.implementation = function(v0) {
        var executor = 'Class';
        var beatText = 'static boolean com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.access$100(com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_access$100_1498.call(com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz, v0);
        printBeat(beat);
        return ret;
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_onQrcodeHbResult_7104 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.onQrcodeHbResult.overload('org.json.JSONObject');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_onQrcodeHbResult_7104.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'protected void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.onQrcodeHbResult(org.json.JSONObject)';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_onQrcodeHbResult_7104.call(this, v0);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_onGroupHbBack_8622 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.onGroupHbBack.overload('int', 'java.lang.String', 'java.lang.String');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_onGroupHbBack_8622.implementation = function(v0, v1, v2) {
        var executor = this.hashCode();
        var beatText = 'public android.content.Intent com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.onGroupHbBack(int,java.lang.String,java.lang.String)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_onGroupHbBack_8622.call(this, v0, v1, v2);
        printBeat(beat);
        return ret;
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_onKeyDown_8113 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.onKeyDown.overload('int', 'android.view.KeyEvent');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_onKeyDown_8113.implementation = function(v0, v1) {
        var executor = this.hashCode();
        var beatText = 'public boolean com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.onKeyDown(int,android.view.KeyEvent)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_onKeyDown_8113.call(this, v0, v1);
        printBeat(beat);
        return ret;
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_showCommonHbToast_1484 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.showCommonHbToast.overload('java.lang.CharSequence');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_showCommonHbToast_1484.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.showCommonHbToast(java.lang.CharSequence)';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_showCommonHbToast_1484.call(this, v0);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_showShareUI_8665 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.showShareUI.overload();
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_showShareUI_8665.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'private void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.showShareUI()';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_showShareUI_8665.call(this);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_access$200_2297 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.access$200.overload('com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_access$200_2297.implementation = function(v0) {
        var executor = 'Class';
        var beatText = 'static boolean com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.access$200(com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_access$200_2297.call(com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz, v0);
        printBeat(beat);
        return ret;
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_addCommonHbUploadData_0126 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.addCommonHbUploadData.overload('java.lang.String', 'java.lang.String', 'int');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_addCommonHbUploadData_0126.implementation = function(v0, v1, v2) {
        var executor = this.hashCode();
        var beatText = 'public void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.addCommonHbUploadData(java.lang.String,java.lang.String,int)';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_addCommonHbUploadData_0126.call(this, v0, v1, v2);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_onConfigurationChanged_6423 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.onConfigurationChanged.overload('android.content.res.Configuration');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_onConfigurationChanged_6423.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.onConfigurationChanged(android.content.res.Configuration)';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_onConfigurationChanged_6423.call(this, v0);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_access$300_7863 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.access$300.overload('com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_access$300_7863.implementation = function(v0) {
        var executor = 'Class';
        var beatText = 'static java.lang.String com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.access$300(com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_access$300_7863.call(com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz, v0);
        printBeat(beat);
        return ret;
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_getProcessType_9136 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.getProcessType.overload();
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_getProcessType_9136.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'protected int com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.getProcessType()';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_getProcessType_9136.call(this);
        printBeat(beat);
        return ret;
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_doOnPause_8356 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.doOnPause.overload();
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_doOnPause_8356.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'protected void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.doOnPause()';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_doOnPause_8356.call(this);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_switchToUsualHbFragment_3738 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.switchToUsualHbFragment.overload('android.os.Bundle');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_switchToUsualHbFragment_3738.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'protected void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.switchToUsualHbFragment(android.os.Bundle)';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_switchToUsualHbFragment_3738.call(this, v0);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_access$102_1806 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.access$102.overload('com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity', 'boolean');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_access$102_1806.implementation = function(v0, v1) {
        var executor = 'Class';
        var beatText = 'static boolean com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.access$102(com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity,boolean)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_access$102_1806.call(com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz, v0, v1);
        printBeat(beat);
        return ret;
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_access$400_5448 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.access$400.overload('com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_access$400_5448.implementation = function(v0) {
        var executor = 'Class';
        var beatText = 'static java.lang.String com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.access$400(com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_access$400_5448.call(com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz, v0);
        printBeat(beat);
        return ret;
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_getTitleBarHeight_9484 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.getTitleBarHeight.overload('android.content.Context');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_getTitleBarHeight_9484.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public int com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.getTitleBarHeight(android.content.Context)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_getTitleBarHeight_9484.call(this, v0);
        printBeat(beat);
        return ret;
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_access$500_2963 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.access$500.overload('com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_access$500_2963.implementation = function(v0) {
        var executor = 'Class';
        var beatText = 'static boolean com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.access$500(com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_access$500_2963.call(com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz, v0);
        printBeat(beat);
        return ret;
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_yuan2Fen_0567 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.yuan2Fen.overload('java.lang.String');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_yuan2Fen_0567.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'private java.lang.String com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.yuan2Fen(java.lang.String)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_yuan2Fen_0567.call(this, v0);
        printBeat(beat);
        return ret;
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_showErrorDialog_6455 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.showErrorDialog.overload('java.lang.String');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_showErrorDialog_6455.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'private void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.showErrorDialog(java.lang.String)';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_showErrorDialog_6455.call(this, v0);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_onClick_3015 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.onClick.overload('android.view.View');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_onClick_3015.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.onClick(android.view.View)';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_onClick_3015.call(this, v0);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_initFestivalFragment_6203 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.initFestivalFragment.overload();
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_initFestivalFragment_6203.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'private void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.initFestivalFragment()';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_initFestivalFragment_6203.call(this);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_switchToHbSkinListFragment_1859 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.switchToHbSkinListFragment.overload('android.os.Bundle');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_switchToHbSkinListFragment_1859.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'protected void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.switchToHbSkinListFragment(android.os.Bundle)';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_switchToHbSkinListFragment_1859.call(this, v0);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_doOnBackPressed_2646 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.doOnBackPressed.overload();
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_doOnBackPressed_2646.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'public void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.doOnBackPressed()';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_doOnBackPressed_2646.call(this);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_onOpenTenpayView_2504 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.onOpenTenpayView.overload('org.json.JSONObject', 'org.json.JSONObject', 'int');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_onOpenTenpayView_2504.implementation = function(v0, v1, v2) {
        var executor = this.hashCode();
        var beatText = 'private void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.onOpenTenpayView(org.json.JSONObject,org.json.JSONObject,int)';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_onOpenTenpayView_2504.call(this, v0, v1, v2);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_onVisitHbResult_5135 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.onVisitHbResult.overload('org.json.JSONObject');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_onVisitHbResult_5135.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'protected void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.onVisitHbResult(org.json.JSONObject)';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_onVisitHbResult_5135.call(this, v0);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_buildParamsBundle_6285 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.buildParamsBundle.overload();
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_buildParamsBundle_6285.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'private android.os.Bundle com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.buildParamsBundle()';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_buildParamsBundle_6285.call(this);
        printBeat(beat);
        return ret;
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_addFragment_5328 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.addFragment.overload();
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_addFragment_5328.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'private void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.addFragment()';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_addFragment_5328.call(this);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_addUploadData_5252 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.addUploadData.overload('java.lang.String', 'int', 'java.lang.String', 'java.lang.String', 'java.lang.String');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_addUploadData_5252.implementation = function(v0, v1, v2, v3, v4) {
        var executor = this.hashCode();
        var beatText = 'public void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.addUploadData(java.lang.String,int,java.lang.String,java.lang.String,java.lang.String)';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_addUploadData_5252.call(this, v0, v1, v2, v3, v4);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_showThemeHbToast_5011 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.showThemeHbToast.overload('java.lang.CharSequence');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_showThemeHbToast_5011.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.showThemeHbToast(java.lang.CharSequence)';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_showThemeHbToast_5011.call(this, v0);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_sendConfirmRequest_4524 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.sendConfirmRequest.overload('java.lang.String', 'java.lang.String');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_sendConfirmRequest_4524.implementation = function(v0, v1) {
        var executor = this.hashCode();
        var beatText = 'protected void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.sendConfirmRequest(java.lang.String,java.lang.String)';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_sendConfirmRequest_4524.call(this, v0, v1);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_doOnResume_5012 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.doOnResume.overload();
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_doOnResume_5012.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'protected void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.doOnResume()';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_doOnResume_5012.call(this);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_getMapPacketJson_3311 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.getMapPacketJson.overload();
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_getMapPacketJson_3311.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'public java.util.Map com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.getMapPacketJson()';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_getMapPacketJson_3311.call(this);
        printBeat(beat);
        return ret;
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_showErrorToast_5503 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.showErrorToast.overload('java.lang.String');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_showErrorToast_5503.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'private void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.showErrorToast(java.lang.String)';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_showErrorToast_5503.call(this, v0);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_showQzoneHbToast_6497 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.showQzoneHbToast.overload('java.lang.CharSequence');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_showQzoneHbToast_6497.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.showQzoneHbToast(java.lang.CharSequence)';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_showQzoneHbToast_6497.call(this, v0);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_access$202_3309 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.access$202.overload('com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity', 'boolean');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_access$202_3309.implementation = function(v0, v1) {
        var executor = 'Class';
        var beatText = 'static boolean com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.access$202(com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity,boolean)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_access$202_3309.call(com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz, v0, v1);
        printBeat(beat);
        return ret;
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_preMConnect_1109 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.preMConnect.overload();
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_preMConnect_1109.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'private void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.preMConnect()';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_preMConnect_1109.call(this);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_doOnDestroy_4699 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.doOnDestroy.overload();
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_doOnDestroy_4699.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'protected void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.doOnDestroy()';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_doOnDestroy_4699.call(this);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_getConfigLogic_4261 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.getConfigLogic.overload();
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_getConfigLogic_4261.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'public com.tencent.mobileqq.qwallet.hb.send.busylogic.impl.b com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.getConfigLogic()';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_getConfigLogic_4261.call(this);
        printBeat(beat);
        return ret;
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_showDialog_2143 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.showDialog.overload('java.lang.String', 'java.lang.String', 'java.lang.String');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_showDialog_2143.implementation = function(v0, v1, v2) {
        var executor = this.hashCode();
        var beatText = 'public void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.showDialog(java.lang.String,java.lang.String,java.lang.String)';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_showDialog_2143.call(this, v0, v1, v2);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_mul_8396 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.mul.overload('java.lang.String', 'java.lang.String');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_mul_8396.implementation = function(v0, v1) {
        var executor = this.hashCode();
        var beatText = 'private java.lang.String com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.mul(java.lang.String,java.lang.String)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_mul_8396.call(this, v0, v1);
        printBeat(beat);
        return ret;
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_switchFragment_6271 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.switchFragment.overload('com.tencent.mobileqq.qwallet.hb.send.impl.BaseHbFragment');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_switchFragment_6271.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'protected void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.switchFragment(com.tencent.mobileqq.qwallet.hb.send.impl.BaseHbFragment)';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_switchFragment_6271.call(this, v0);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_getForwardItem_1639 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.getForwardItem.overload();
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_getForwardItem_1639.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'public int com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.getForwardItem()';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_getForwardItem_1639.call(this);
        printBeat(beat);
        return ret;
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_onCommonHbResult_7338 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.onCommonHbResult.overload('org.json.JSONObject');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_onCommonHbResult_7338.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'protected void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.onCommonHbResult(org.json.JSONObject)';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_onCommonHbResult_7338.call(this, v0);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_registerHbBroadCast_5048 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.registerHbBroadCast.overload();
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_registerHbBroadCast_5048.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'private void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.registerHbBroadCast()';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_registerHbBroadCast_5048.call(this);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_doOnCreate_9554 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.doOnCreate.overload('android.os.Bundle');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_doOnCreate_9554.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'protected boolean com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.doOnCreate(android.os.Bundle)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_doOnCreate_9554.call(this, v0);
        printBeat(beat);
        return ret;
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_constructAResultRecord_8449 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.constructAResultRecord.overload('java.lang.String', 'java.lang.String', 'int', 'java.lang.String');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_constructAResultRecord_8449.implementation = function(v0, v1, v2, v3) {
        var executor = 'Class';
        var beatText = 'public static com.tencent.mobileqq.selectmember.ResultRecord com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.constructAResultRecord(java.lang.String,java.lang.String,int,java.lang.String)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_constructAResultRecord_8449.call(com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz, v0, v1, v2, v3);
        printBeat(beat);
        return ret;
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_initCustomHb_6521 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.initCustomHb.overload();
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_initCustomHb_6521.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'private void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.initCustomHb()';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_initCustomHb_6521.call(this);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_callForwardPage_4017 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.callForwardPage.overload('java.lang.String', 'java.util.ArrayList', 'int');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_callForwardPage_4017.implementation = function(v0, v1, v2) {
        var executor = this.hashCode();
        var beatText = 'public void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.callForwardPage(java.lang.String,java.util.ArrayList,int)';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_callForwardPage_4017.call(this, v0, v1, v2);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_addHbUploadData_2165 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.addHbUploadData.overload('java.lang.String');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_addHbUploadData_2165.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.addHbUploadData(java.lang.String)';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_addHbUploadData_2165.call(this, v0);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_access$000_5587 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.access$000.overload('com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity', 'java.lang.String');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_access$000_5587.implementation = function(v0, v1) {
        var executor = 'Class';
        var beatText = 'static void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.access$000(com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity,java.lang.String)';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_access$000_5587.call(com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz, v0, v1);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_sendPackedHb_3223 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.sendPackedHb.overload();
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_sendPackedHb_3223.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'public void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.sendPackedHb()';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_sendPackedHb_3223.call(this);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_checkAndShowPayChannelDialog_6003 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.checkAndShowPayChannelDialog.overload('org.json.JSONObject', 'java.lang.String');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_checkAndShowPayChannelDialog_6003.implementation = function(v0, v1) {
        var executor = this.hashCode();
        var beatText = 'private boolean com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.checkAndShowPayChannelDialog(org.json.JSONObject,java.lang.String)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_checkAndShowPayChannelDialog_6003.call(this, v0, v1);
        printBeat(beat);
        return ret;
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_initThemeFragment_6752 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.initThemeFragment.overload();
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_initThemeFragment_6752.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'private void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.initThemeFragment()';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_initThemeFragment_6752.call(this);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_initQzoneFragment_7619 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.initQzoneFragment.overload();
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_initQzoneFragment_7619.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'public void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.initQzoneFragment()';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_initQzoneFragment_7619.call(this);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_pay_5745 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.pay.overload('java.lang.String');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_pay_5745.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'private void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.pay(java.lang.String)';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_pay_5745.call(this, v0);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_onFaceHbPacket_5722 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.onFaceHbPacket.overload('java.lang.String');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_onFaceHbPacket_5722.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.onFaceHbPacket(java.lang.String)';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_onFaceHbPacket_5722.call(this, v0);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_initData_6228 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.initData.overload();
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_initData_6228.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'private void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.initData()';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_initData_6228.call(this);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_addQZoneHbUploadData_3058 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.addQZoneHbUploadData.overload('int', 'java.lang.String', 'int');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_addQZoneHbUploadData_3058.implementation = function(v0, v1, v2) {
        var executor = this.hashCode();
        var beatText = 'public void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.addQZoneHbUploadData(int,java.lang.String,int)';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_addQZoneHbUploadData_3058.call(this, v0, v1, v2);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_dispatchTouchEvent_1465 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.dispatchTouchEvent.overload('android.view.MotionEvent');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_dispatchTouchEvent_1465.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public boolean com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.dispatchTouchEvent(android.view.MotionEvent)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_dispatchTouchEvent_1465.call(this, v0);
        printBeat(beat);
        return ret;
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_onCashPay_0882 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.onCashPay.overload('org.json.JSONObject');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_onCashPay_0882.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'private void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.onCashPay(org.json.JSONObject)';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_onCashPay_0882.call(this, v0);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_onLogicError_9704 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.onLogicError.overload('java.lang.String', 'int', 'java.lang.String');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_onLogicError_9704.implementation = function(v0, v1, v2) {
        var executor = this.hashCode();
        var beatText = 'private void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.onLogicError(java.lang.String,int,java.lang.String)';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_onLogicError_9704.call(this, v0, v1, v2);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_initRequestedOrientation_5246 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.initRequestedOrientation.overload();
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_initRequestedOrientation_5246.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'protected void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.initRequestedOrientation()';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_initRequestedOrientation_5246.call(this);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_saveQrToken_5617 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.saveQrToken.overload('java.lang.String');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_saveQrToken_5617.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.saveQrToken(java.lang.String)';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_saveQrToken_5617.call(this, v0);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_Q2_3806 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.Q2.overload('android.content.DialogInterface', 'int');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_Q2_3806.implementation = function(v0, v1) {
        var executor = this.hashCode();
        var beatText = 'public void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.Q2(android.content.DialogInterface,int)';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_Q2_3806.call(this, v0, v1);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_cancelCallBack_4317 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.cancelCallBack.overload();
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_cancelCallBack_4317.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'public void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.cancelCallBack()';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_cancelCallBack_4317.call(this);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_getMapPacketExtra_4072 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.getMapPacketExtra.overload();
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_getMapPacketExtra_4072.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'public java.util.Map com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.getMapPacketExtra()';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_getMapPacketExtra_4072.call(this);
        printBeat(beat);
        return ret;
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_doOnStop_2806 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.doOnStop.overload();
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_doOnStop_2806.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'protected void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.doOnStop()';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_doOnStop_2806.call(this);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_registBroadcast_8776 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.registBroadcast.overload();
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_registBroadcast_8776.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'private void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.registBroadcast()';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_registBroadcast_8776.call(this);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_conbineExtraParams_7029 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.conbineExtraParams.overload('java.lang.String');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_conbineExtraParams_7029.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'private java.util.Map com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.conbineExtraParams(java.lang.String)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_conbineExtraParams_7029.call(this, v0);
        printBeat(beat);
        return ret;
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_parseQrcodeHb_6366 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.parseQrcodeHb.overload('org.json.JSONObject');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_parseQrcodeHb_6366.implementation = function(v0) {
        var executor = this.hashCode();
        var beatText = 'public java.lang.String com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.parseQrcodeHb(org.json.JSONObject)';
        var beat = newMethodBeat(beatText, executor);
        var ret = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_parseQrcodeHb_6366.call(this, v0);
        printBeat(beat);
        return ret;
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_P2_0873 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.P2.overload('android.content.DialogInterface', 'int');
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_P2_0873.implementation = function(v0, v1) {
        var executor = this.hashCode();
        var beatText = 'private void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.P2(android.content.DialogInterface,int)';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_P2_0873.call(this, v0, v1);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_initView_6732 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.initView.overload();
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_initView_6732.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'private void com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity.initView()';
        var beat = newMethodBeat(beatText, executor);
        com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_method_initView_6732.call(this);
        printBeat(beat);
    };
    var com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_init_4547 = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz.$init.overload();
    com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_init_4547.implementation = function() {
        var executor = this.hashCode();
        var beatText = 'public com.tencent.mobileqq.qwallet.hb.send.impl.SendHbActivity()';
        var beat = newMethodBeat(beatText, executor);
        var returnObj = com_tencent_mobileqq_qwallet_hb_send_impl_SendHbActivity_clz_init_4547.call(this);
        printBeat(beat);
        return returnObj;
    };
});