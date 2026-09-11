/**
 * Atkinson Dithering Utility - 16-Bit High Color (RGB565) & Retro Palettes
 * 
 * Implements Bill Atkinson's classic 1984 error diffusion algorithm with:
 * - 16-bit High Color (RGB565: 65,536 colors with 32 levels R, 64 levels G, 32 levels B)
 * - Optional 8-color retro RGB quantization (mode: 'rgb8')
 * - Configurable chunky pixel scaling (pixelSize: 1, 2, 3, etc.)
 * - In-memory caching for zero recalculation on re-renders
 */
(function (global) {
  'use strict';

  const ditherCache = new Map();

  /**
   * Generates a cache key based on source URL and options
   */
  function getCacheKey(url, options) {
    const pixelSize = options.pixelSize || 2;
    const mode = options.mode || 'rgb565';
    return `${url}__m${mode}_px${pixelSize}`;
  }

  // 16-bit RGB565 quantizers
  // Red: 5 bits (32 levels, 0..31)
  function quantizeR_RGB565(val) {
    const clamped = Math.max(0, Math.min(255, val));
    return Math.round(Math.round(clamped * 31 / 255) * 255 / 31);
  }

  // Green: 6 bits (64 levels, 0..63)
  function quantizeG_RGB565(val) {
    const clamped = Math.max(0, Math.min(255, val));
    return Math.round(Math.round(clamped * 63 / 255) * 255 / 63);
  }

  // Blue: 5 bits (32 levels, 0..31)
  function quantizeB_RGB565(val) {
    const clamped = Math.max(0, Math.min(255, val));
    return Math.round(Math.round(clamped * 31 / 255) * 255 / 31);
  }

  // 8-color 3-bit quantizer
  function quantize_RGB8(val) {
    return val < 128 ? 0 : 255;
  }

  /**
   * Core Atkinson Dithering processor on an HTMLImageElement
   * @param {HTMLImageElement} img - Preloaded image
   * @param {Object} options - Configuration options
   * @returns {string} - Data URL of the dithered image
   */
  function processAtkinson(img, options) {
    const pixelSize = Math.max(1, Math.floor(options.pixelSize || 2));
    const mode = options.mode || 'rgb565';
    const origWidth = img.naturalWidth || img.width;
    const origHeight = img.naturalHeight || img.height;

    if (!origWidth || !origHeight) {
      return img.src;
    }

    // 1. Calculate downscaled dimensions for chunky pixel look
    const downWidth = Math.max(1, Math.floor(origWidth / pixelSize));
    const downHeight = Math.max(1, Math.floor(origHeight / pixelSize));

    // 2. Render image onto downscaled canvas
    const downCanvas = document.createElement('canvas');
    downCanvas.width = downWidth;
    downCanvas.height = downHeight;
    const downCtx = downCanvas.getContext('2d', { willReadFrequently: true });

    if (!downCtx) return img.src;

    downCtx.drawImage(img, 0, 0, downWidth, downHeight);
    const imgData = downCtx.getImageData(0, 0, downWidth, downHeight);
    const data = imgData.data;

    // 3. Allocate working buffers for R, G, B channels
    const numPixels = downWidth * downHeight;
    const rBuf = new Float32Array(numPixels);
    const gBuf = new Float32Array(numPixels);
    const bBuf = new Float32Array(numPixels);

    for (let i = 0; i < numPixels; i++) {
      const idx = i * 4;
      rBuf[i] = data[idx];
      gBuf[i] = data[idx + 1];
      bBuf[i] = data[idx + 2];
    }

    // 4. Atkinson Error Diffusion offsets
    // Neighbors:
    // (x+1, y)   -> 1/8
    // (x+2, y)   -> 1/8
    // (x-1, y+1) -> 1/8
    // (x,   y+1) -> 1/8
    // (x+1, y+1) -> 1/8
    // (x,   y+2) -> 1/8
    // Total distributed = 6/8 (3/4). Discarded = 2/8 (1/4) for crisp Atkinson contrast.
    const offsets = [
      { dx: 1, dy: 0 },
      { dx: 2, dy: 0 },
      { dx: -1, dy: 1 },
      { dx: 0, dy: 1 },
      { dx: 1, dy: 1 },
      { dx: 0, dy: 2 }
    ];

    const is8Bit = mode === 'rgb8';

    for (let y = 0; y < downHeight; y++) {
      for (let x = 0; x < downWidth; x++) {
        const i = y * downWidth + x;

        // Process Red Channel
        const oldR = rBuf[i];
        const newR = is8Bit ? quantize_RGB8(oldR) : quantizeR_RGB565(oldR);
        rBuf[i] = newR;
        const errR = (oldR - newR) / 8;

        // Process Green Channel
        const oldG = gBuf[i];
        const newG = is8Bit ? quantize_RGB8(oldG) : quantizeG_RGB565(oldG);
        gBuf[i] = newG;
        const errG = (oldG - newG) / 8;

        // Process Blue Channel
        const oldB = bBuf[i];
        const newB = is8Bit ? quantize_RGB8(oldB) : quantizeB_RGB565(oldB);
        bBuf[i] = newB;
        const errB = (oldB - newB) / 8;

        // Distribute error to the 6 Atkinson neighbors
        for (let k = 0; k < 6; k++) {
          const nx = x + offsets[k].dx;
          const ny = y + offsets[k].dy;

          if (nx >= 0 && nx < downWidth && ny >= 0 && ny < downHeight) {
            const ni = ny * downWidth + nx;
            rBuf[ni] += errR;
            gBuf[ni] += errG;
            bBuf[ni] += errB;
          }
        }
      }
    }

    // 5. Copy quantized pixels back to ImageData
    for (let i = 0; i < numPixels; i++) {
      const idx = i * 4;
      data[idx] = Math.max(0, Math.min(255, Math.round(rBuf[i])));
      data[idx + 1] = Math.max(0, Math.min(255, Math.round(gBuf[i])));
      data[idx + 2] = Math.max(0, Math.min(255, Math.round(bBuf[i])));
      // Preserve alpha or keep fully opaque
      if (data[idx + 3] === 0) {
        data[idx + 3] = 0;
      } else {
        data[idx + 3] = 255;
      }
    }

    downCtx.putImageData(imgData, 0, 0);

    // 6. If pixelSize > 1, upscale with nearest-neighbor interpolation to original size
    if (pixelSize > 1) {
      const upCanvas = document.createElement('canvas');
      upCanvas.width = origWidth;
      upCanvas.height = origHeight;
      const upCtx = upCanvas.getContext('2d');
      if (upCtx) {
        upCtx.imageSmoothingEnabled = false;
        upCtx.drawImage(downCanvas, 0, 0, origWidth, origHeight);
        return upCanvas.toDataURL('image/png');
      }
    }

    return downCanvas.toDataURL('image/png');
  }

  /**
   * Loads an image from a URL or gets the underlying image
   * @param {string|HTMLImageElement} source 
   * @returns {Promise<HTMLImageElement>}
   */
  function loadImage(source) {
    return new Promise((resolve, reject) => {
      if (source instanceof HTMLImageElement) {
        if (source.complete && source.naturalWidth > 0) {
          resolve(source);
        } else {
          source.addEventListener('load', () => resolve(source), { once: true });
          source.addEventListener('error', (err) => reject(err), { once: true });
        }
      } else if (typeof source === 'string') {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
        img.src = source;
      } else {
        reject(new Error('Invalid image source provided to Dither.'));
      }
    });
  }

  /**
   * Main API: ditherImage
   * 
   * @param {string|HTMLImageElement} source - URL string or <img> element
   * @param {Object} [options]
   * @param {number} [options.pixelSize=2] - Chunky pixel size (default: 2)
   * @param {'rgb565'|'rgb8'} [options.mode='rgb565'] - 16-bit High Color (rgb565) or 8-color RGB (rgb8)
   * @returns {Promise<{dataUrl: string, width: number, height: number, element?: HTMLImageElement}>}
   */
  function ditherImage(source, options = {}) {
    const opts = Object.assign({ pixelSize: 2, mode: 'rgb565' }, options);
    const sourceUrl = typeof source === 'string' ? source : (source.currentSrc || source.src);
    const cacheKey = getCacheKey(sourceUrl, opts);

    // 1. Check memory cache
    if (ditherCache.has(cacheKey)) {
      const cachedDataUrl = ditherCache.get(cacheKey);
      if (source instanceof HTMLImageElement) {
        if (!source.dataset.originalSrc) {
          source.dataset.originalSrc = sourceUrl;
        }
        source.src = cachedDataUrl;
      }
      return Promise.resolve({
        dataUrl: cachedDataUrl,
        element: source instanceof HTMLImageElement ? source : undefined
      });
    }

    // 2. Load and process
    return loadImage(source)
      .then((img) => {
        try {
          const dataUrl = processAtkinson(img, opts);
          ditherCache.set(cacheKey, dataUrl);

          if (source instanceof HTMLImageElement) {
            if (!source.dataset.originalSrc) {
              source.dataset.originalSrc = sourceUrl;
            }
            source.src = dataUrl;
          }

          return {
            dataUrl,
            width: img.naturalWidth || img.width,
            height: img.naturalHeight || img.height,
            element: source instanceof HTMLImageElement ? source : undefined
          };
        } catch (err) {
          console.warn('[Dither] Processing failed, falling back to original image:', err);
          return {
            dataUrl: sourceUrl,
            element: source instanceof HTMLImageElement ? source : undefined
          };
        }
      })
      .catch((err) => {
        console.warn('[Dither] Could not load image:', sourceUrl, err);
        return {
          dataUrl: sourceUrl,
          element: source instanceof HTMLImageElement ? source : undefined
        };
      });
  }

  /**
   * Public Dither API
   */
  global.Dither = {
    ditherImage: ditherImage,
    getCached: function (url, options = {}) {
      const opts = Object.assign({ pixelSize: 2, mode: 'rgb565' }, options);
      return ditherCache.get(getCacheKey(url, opts)) || null;
    },
    clearCache: function () {
      ditherCache.clear();
    }
  };

})(typeof window !== 'undefined' ? window : this);
