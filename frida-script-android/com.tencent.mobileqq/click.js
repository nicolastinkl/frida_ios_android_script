function methodInBeat(invokeId, timestamp, methodName, executor) {
	var startTime = timestamp;
    var androidLogClz = Java.use("android.util.Log");
    var exceptionClz = Java.use("java.lang.Exception");
    var threadClz = Java.use("java.lang.Thread");
    var currentThread = threadClz.currentThread();
    var stackInfo = androidLogClz.getStackTraceString(exceptionClz.$new());
    var str = ("------------startFlag:" + invokeId + ",objectHash:"+executor+",thread(id:" + currentThread.getId() +",name:" + currentThread.getName() + "),timestamp:" + startTime+"---------------\n");
    str += methodName + "\n";
    str += stackInfo.substring(20);
    str += ("------------endFlag:" + invokeId + ",usedtime:" + (new Date().getTime() - startTime) +"---------------\n");
	console.log(str);
};

function sleep(time) {
    var startTime = new Date().getTime() + parseInt(time, 10);
    while (new Date().getTime() < startTime) {}
};

function makeClass(className) {
    var classClz = Java.use("java.lang.Class");
    var forNameFunc = classClz.forName.overload("java.lang.String");
    return forNameFunc.call(classClz, className);
};

function isClass(obj, superClzName) {
    var objClz = obj.getClass();
    var superClz = makeClass(superClzName);
    return superClz.isAssignableFrom(objClz);
};

Java.perform(function() {
    var textViewClz = Java.use("android.widget.TextView");
    var android_view_View_clz = Java.use('android.view.View');
    var android_view_View_clz_method_performClick_u6ef = android_view_View_clz.performClick.overload();
    android_view_View_clz_method_performClick_u6ef.implementation = function() {
        var invokeId = Math.random().toString(36).slice( - 8);
        var startTime = new Date().getTime();
        var executor = 'obj:' + this.hashCode();
        var ret = android_view_View_clz_method_performClick_u6ef.call(this);
        var clz = this.getClass().getName();
        var viewId = this.getId();
        //console.log("ViewText: " + Java.cast(this, textViewClz).getText());
        console.log("ViewClz: " + clz);
        console.log("ViewId: " + viewId);
        methodInBeat(invokeId, startTime, 'public boolean android.view.View.performClick()', executor);
        return ret;
    };
});

function loadDexfile(dexfile) {
    Java.perform(function() {
        Java.openClassFile(dexfile).load();
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
loadDexfile('/data/user/0/com.tencent.mobileqq/radar.dex');
function findViewById(viewId) {
    var report = "";
    Java.perform(function() {
        var radarAndroidClz = Java.use("gz.radar.Android");
        var viewInfo = radarAndroidClz.getViewInfo(viewId + "");
        if (!viewInfo) {
            report += "Not Found View."
            return;
        }
        report += ("------------------View--------------------") + "\n";
        report += ("View Id: " + viewInfo.getViewId()) + "\n";
        report += ("View IdName: " + viewInfo.getViewIdName()) + "\n";
        report += ("View Class: " + viewInfo.getName()) + "\n";
        report += ("View SuperClass: " + viewInfo.getSuperClazz()) + "\n";
        report += ("View ImplementInterfaces: " + viewInfo.getImplementInterfaces()) + "\n";
        var androidApkFields = viewInfo.getAndroidApkFields();
        report += ("View Fields: " + androidApkFields.length) + "\n";
        for (var j = 0; j < androidApkFields.length; j++) {
            report += ("\t" + androidApkFields[j].toLine()) + "\n";
        }
        var methods = viewInfo.methods();
        report += ("View Methods: " + methods.length) + "\n";
        for (var j = 0; j < methods.length; j++) {
            report += ("\t" + methods[j]) + "\n";
        }
    });
    log(report);
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

function log(str) {
    console.log(str);
};