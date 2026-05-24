import { convertToPcm } from './audioUtils';

/**
 * Manages the Edge Impulse WebAssembly model using the logic 
 * provided in the user's run-impulse.js
 */
export class EdgeImpulseManager {
  private classifierInitialized: boolean = false;
  private isLoaded: boolean = false;

  async loadModel(scriptPath: string = '/edge-impulse-standalone.js'): Promise<boolean> {
    if (this.isLoaded) return true;

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = scriptPath;
      script.onload = async () => {
        try {
          const Module = (window as any).Module;
          if (Module) {
            Module.onRuntimeInitialized = () => {
              this.classifierInitialized = true;
              let ret = Module.init();
              if (typeof ret === 'number' && ret !== 0) {
                reject(new Error('init() failed with code ' + ret));
                return;
              }
              this.isLoaded = true;
              resolve(true);
            };
          } else {
            reject(new Error('Module not found in Edge Impulse script'));
          }
        } catch (err) {
          reject(err);
        }
      };
      script.onerror = () => reject(new Error('Failed to load Edge Impulse script'));
      document.head.appendChild(script);
    });
  }

  async classify(audioBlob: Blob): Promise<any> {
    if (!this.isLoaded) throw new Error('Model not loaded');
    const Module = (window as any).Module;

    // Edge Impulse models need 16kHz Mono PCM
    const pcmData = await convertToPcm(audioBlob, 16000);
    
    // Logic from user's run-impulse.js classify()
    const rawData = Array.from(pcmData);
    let typedArray = new Float32Array(rawData);
    let numBytes = typedArray.length * typedArray.BYTES_PER_ELEMENT;
    let ptr = Module._malloc(numBytes);
    let heapBytes = new Uint8Array(Module.HEAPU8.buffer, ptr, numBytes);
    heapBytes.set(new Uint8Array(typedArray.buffer));

    let ret = Module.run_classifier(ptr, rawData.length, false);
    Module._free(ptr);

    if (ret.result !== 0) {
      throw new Error('Classification failed (err code: ' + ret.result + ')');
    }

    // Fill result struct logic
    let jsResult = {
      anomaly: ret.anomaly,
      results: [] as any[]
    };

    for (let cx = 0; cx < ret.size(); cx++) {
      let c = ret.get(cx);
      jsResult.results.push({ label: c.label, value: c.value });
      c.delete();
    }

    ret.delete();
    return jsResult;
  }
}

export const eiManager = new EdgeImpulseManager();

