"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var encodings = {
  '8bitInt': 128,
  '16bitInt': 32768,
  '32bitInt': 2147483648,
  '32bitFloat': 1
};
var typedArrays = {
  '8bitInt': Int8Array,
  '16bitInt': Int16Array,
  '32bitInt': Int32Array,
  '32bitFloat': Float32Array
};
var PCMPlayer = /*#__PURE__*/function () {
  // 采样的数据

  function PCMPlayer(options) {
    _classCallCheck(this, PCMPlayer);
    this.option = Object.assign({
      encoding: '16bitInt',
      channels: 1,
      // 采样率，每一秒采样的数据
      sampleRate: 8000,
      flushingTime: 1000,
      endTimeout: 500
    }, options);
    this.samples = new Float32Array();
    this.state = 'INIT';
    if (options.autoStart) this.start();
    this.maxValue = this.getMaxValue();
    this.typedArray = this.getTypedArray();
    this.createContext();
  }
  _createClass(PCMPlayer, [{
    key: "createContext",
    value: function createContext() {
      var _this = this,
        _this$option$requestF;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      // context needs to be resumed on iOS and Safari (or it will stay in "suspended" state)
      void this.audioCtx.resume();
      // if you want to see "Running" state in console and be happy about it
      this.audioCtx.onstatechange = function () {
        var _this$audioCtx;
        return console.log((_this$audioCtx = _this.audioCtx) === null || _this$audioCtx === void 0 ? void 0 : _this$audioCtx.state);
      };
      // 增益输出节点
      this.gainNode = this.audioCtx.createGain();
      this.gainNode.gain.value = 1;
      this.gainNode.connect(this.audioCtx.destination);
      this.startTime = this.audioCtx.currentTime;
      if ((_this$option$requestF = this.option.requestFrame) !== null && _this$option$requestF !== void 0 ? _this$option$requestF : this.option.endFrame) {
        var requestFrame = function requestFrame() {
          try {
            var option = _this.option,
              audioCtx = _this.audioCtx,
              startTime = _this.startTime;
            if (audioCtx.currentTime) {
              var _option$requestFrame;
              (_option$requestFrame = option.requestFrame) === null || _option$requestFrame === void 0 || _option$requestFrame.call(option, {
                audio: audioCtx,
                totalTime: startTime
              });
              if (_this.startTime < _this.audioCtx.currentTime) {
                if (!_this.endTimer) _this.endTimer = setTimeout(function () {
                  var _option$endFrame;
                  (_option$endFrame = option.endFrame) === null || _option$endFrame === void 0 || _option$endFrame.call(option, {
                    audio: audioCtx,
                    totalTime: startTime
                  });
                }, _this.option.endTimeout);
              } else {
                var _option$startFrame;
                if (_this.endTimer) clearTimeout(_this.endTimer);
                (_option$startFrame = option.startFrame) === null || _option$startFrame === void 0 || _option$startFrame.call(option, {
                  audio: audioCtx,
                  totalTime: startTime
                });
              }
            }
            requestAnimationFrame(requestFrame);
          } catch (_) {
            throw 'requestFrame error';
          }
        };
        requestAnimationFrame(requestFrame);
      }
    }
  }, {
    key: "start",
    value: function start() {
      var _this2 = this;
      if (this.state === 'SUSPEND') void this.audioCtx.resume();
      this.state = 'RUNNING';
      this.flush();
      this.interval = setInterval(function () {
        return _this2.flush();
      }, this.option.flushingTime);
    }
  }, {
    key: "pause",
    value: function pause() {
      this.state = 'SUSPEND';
      if (this.interval) clearInterval(this.interval);
      void this.audioCtx.suspend();
    }
  }, {
    key: "feed",
    value: function feed(data) {
      if (!this.isTypedArray(data)) return;
      data = this.getFormatValue(data);
      if (this.samples !== null) {
        var tmp = new Float32Array(this.samples.length + data.length);
        tmp.set(this.samples, 0);
        tmp.set(data, this.samples.length);
        this.samples = tmp;
      }
    }
  }, {
    key: "flush",
    value: function flush() {
      var _this$samples;
      if (!(this !== null && this !== void 0 && (_this$samples = this.samples) !== null && _this$samples !== void 0 && _this$samples.length)) return;
      // 创建音频节点
      var bufferSource = this.audioCtx.createBufferSource();
      var length = this.samples.length / this.option.channels;
      // 空白AudioBuffer,用于填充数据
      var audioBuffer = this.audioCtx.createBuffer(this.option.channels, length, this.option.sampleRate);
      var audioData, offset, decrement;
      for (var channel = 0; channel < this.option.channels; channel++) {
        audioData = audioBuffer.getChannelData(channel);
        offset = channel;
        decrement = 50;
        for (var i = 0; i < length; i++) {
          audioData[i] = this.samples[offset];
          /* fadein */
          if (i < 50) {
            audioData[i] = audioData[i] * i / 50;
          }
          /* fadeout */
          if (i >= length - 51) {
            audioData[i] = audioData[i] * decrement-- / 50;
          }
          offset += this.option.channels;
        }
      }
      if (this.startTime < this.audioCtx.currentTime) {
        this.startTime = this.audioCtx.currentTime;
      }
      bufferSource.buffer = audioBuffer;
      bufferSource.connect(this.gainNode);
      bufferSource.start(this.startTime);
      this.startTime += audioBuffer.duration;
      this.samples = new Float32Array();
    }
  }, {
    key: "getFormatValue",
    value: function getFormatValue(source) {
      // eslint-disable-next-line new-cap
      var data = new this.typedArray(source.buffer);
      var float32 = new Float32Array(data.length);
      for (var i = 0; i < data.length; i++) {
        float32[i] = data[i] / this.maxValue;
      }
      return float32;
    }
  }, {
    key: "isTypedArray",
    value: function isTypedArray(data) {
      return data.byteLength && data.buffer && data.buffer.constructor === ArrayBuffer;
    }
  }, {
    key: "volume",
    value: function volume(_volume) {
      this.gainNode.gain.value = _volume;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      console.log('destroy');
      if (!this.audioCtx) return;
      if (this.interval) {
        // @ts-expect-error
        clearInterval(this.interval);
      }
      // @ts-expect-error
      this.samples = null;
      void this.audioCtx.close();
      // @ts-expect-error
      this.audioCtx = null;
    }
  }, {
    key: "getMaxValue",
    value: function getMaxValue() {
      var _encodings$this$optio;
      return (_encodings$this$optio = encodings[this.option.encoding]) !== null && _encodings$this$optio !== void 0 ? _encodings$this$optio : encodings['16bitInt'];
    }
  }, {
    key: "getTypedArray",
    value: function getTypedArray() {
      var _typedArrays$this$opt;
      return (_typedArrays$this$opt = typedArrays[this.option.encoding]) !== null && _typedArrays$this$opt !== void 0 ? _typedArrays$this$opt : typedArrays['16bitInt'];
    }
  }]);
  return PCMPlayer;
}();
var _default = exports["default"] = PCMPlayer;