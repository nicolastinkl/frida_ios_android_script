Module.ensureInitialized('Foundation');

{
   onEnter(log, args, state) {
     var arg2ObjC = ObjC.Object(args[2]);
     var arg2 = Memory.readUtf8String(arg2ObjC.bytes(), arg2ObjC.length());
     log(`-[AFSDKEvent encryptWithData:${arg2}]`);
   },
 
   onLeave(log, retval, state) {
     log(`-[AFSDKEvent encryptWithData:->result->${ObjC.Object(retval)}]`);
  }
}

