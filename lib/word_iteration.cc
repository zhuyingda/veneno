#include <node.h>
#include <iostream>

namespace demo {

using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;

void Method(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  args.GetReturnValue().Set(args[0]->ToString());
}

void init(Local<Object> exports) {
  NODE_SET_METHOD(exports, "next", Method);
}

NODE_MODULE(addon, init)

}