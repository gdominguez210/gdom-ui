import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname, basename } from 'path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

function getOutputPath(inputPath: string) {
  const audioFileName = basename(inputPath).replace(/\.(wav|mp3|ogg|m4a)$/i, '');
  return `data/audio/${audioFileName}.json`;
}

export function interpolateCubic(
  y0: number,
  y1: number,
  y2: number,
  y3: number,
  mu: number,
): number {
  const mu2 = mu * mu;
  const a0 = y3 - y2 - y0 + y1;
  const a1 = y0 - y1 - a0;
  const a2 = y2 - y0;
  const a3 = y1;

  return a0 * mu * mu2 + a1 * mu2 + a2 * mu + a3;
}

export function getInterpolatedValueCubic(data: number[], exactIndex: number): number {
  const y0 = data[Math.max(0, Math.floor(exactIndex) - 1)] ?? 0;
  const y1 = data[Math.floor(exactIndex)] ?? 0;
  const y2 = data[Math.min(data.length - 1, Math.floor(exactIndex) + 1)] ?? 0;
  const y3 = data[Math.min(data.length - 1, Math.floor(exactIndex) + 2)] ?? 0;

  const fraction = exactIndex - Math.floor(exactIndex);

  return interpolateCubic(y0, y1, y2, y3, fraction);
}

export function getInterpolatedPeakCubic(
  data: number[],
  exactIndex: number,
  options: { numSamples?: number; oversampleRate?: number } = {},
) {
  const { numSamples = 4, oversampleRate = 4 } = options || {};

  const startSample = Math.floor(exactIndex - numSamples / 2);
  const endSample = Math.ceil(exactIndex + numSamples / 2);

  let min = Infinity;
  let max = -Infinity;

  const numSteps = (endSample - startSample) * oversampleRate;

  for (let i = 0; i < numSteps; i++) {
    const t = i / numSteps;
    const pos = startSample + t * (endSample - startSample);

    const value = getInterpolatedValueCubic(data, pos);

    min = Math.min(min, value);
    max = Math.max(max, value);
  }

  return { min, max };
}

const BASELINE_ZOOM_LEVELS = [16, 128, 4096];
const CUBIC_INTERPOLATION_THRESHOLD = 16;

/**
 * Generate peaks for a given zoom level using appropriate method based on SPP
 */
function generatePeaksForZoomLevel(
  rawAudioData: Float32Array,
  samplesPerPixel: number,
  normalize: boolean = true,
) {
  const numSegments = Math.floor(rawAudioData.length / samplesPerPixel);
  const peaks = [];
  const useCubicInterpolation = samplesPerPixel <= CUBIC_INTERPOLATION_THRESHOLD;

  let maxAbsValue = 0;

  console.log(
    `Generating ${samplesPerPixel} SPP level (${useCubicInterpolation ? 'cubic' : 'envelope'})...`,
  );

  for (let i = 0; i < numSegments; i++) {
    const startIndex = i * samplesPerPixel;
    const endIndex = Math.min(startIndex + samplesPerPixel, rawAudioData.length);

    if (useCubicInterpolation) {
      const padding = 2;
      const expandedStart = Math.max(0, startIndex - padding);
      const expandedEnd = Math.min(rawAudioData.length, endIndex + padding);
      const expandedBlock = Array.from(rawAudioData.subarray(expandedStart, expandedEnd));

      const exactIndex = startIndex + samplesPerPixel / 2;
      const localExactIndex = exactIndex - expandedStart;

      const interpolatedValue = getInterpolatedValueCubic(expandedBlock, localExactIndex);

      maxAbsValue = Math.max(maxAbsValue, Math.abs(interpolatedValue));

      peaks.push({ min: interpolatedValue, max: interpolatedValue });
    } else {
      const blockData = Array.from(rawAudioData.subarray(startIndex, endIndex));
      let blockMax = -Infinity;
      let blockMin = Infinity;

      for (let j = 0; j < blockData.length - 3; j++) {
        const peak = getInterpolatedPeakCubic(blockData, j);
        blockMax = Math.max(blockMax, peak.max);
        blockMin = Math.min(blockMin, peak.min);
      }

      maxAbsValue = Math.max(maxAbsValue, Math.abs(blockMin), Math.abs(blockMax));

      peaks.push({ min: blockMin, max: blockMax });
    }

    if (i % Math.floor(numSegments / 10) === 0) {
      console.log(`  Processing ${samplesPerPixel} SPP... ${Math.floor((i / numSegments) * 100)}%`);
    }
  }

  if (normalize && maxAbsValue > 0) {
    return peaks.map((peak) => ({
      min: peak.min / maxAbsValue,
      max: peak.max / maxAbsValue,
    }));
  }

  return peaks;
}

const argv = yargs(hideBin(process.argv))
  .option('input', {
    alias: 'i',
    description: 'Input audio file path',
    type: 'string',
    demandOption: true,
  })
  .option('normalize', {
    alias: 'n',
    description: 'Normalize values between -1 and 1',
    type: 'boolean',
    default: true,
  })
  .option('output', {
    alias: 'o',
    description: 'Output JSON file path',
    type: 'string',
  })
  .middleware((argv) => {
    if (!argv.output) argv.output = getOutputPath(argv.input);
  })
  .help()
  .example('$0 --input audio/example.wav', 'Generate waveform with default settings')
  .example(
    '$0 -i audio/example.wav --normalize false',
    'Generate waveform without normalization',
  ).argv;

async function generateWaveformData() {
  try {
    const { normalize, input, output } = argv as {
      normalize: boolean;
      input: string;
      output: string;
    };

    console.log(`Generating waveform data with:
  - Baseline zoom levels: ${BASELINE_ZOOM_LEVELS.join(', ')} SPP
  - Cubic interpolation threshold: ≤${CUBIC_INTERPOLATION_THRESHOLD} SPP
  - Normalize: ${normalize}
  - Input file: ${input}
  - Output JSON: ${output}
  `);

    const audioData = await import('audio-decode').then(({ default: decode }) =>
      decode(readFileSync(input)),
    );

    const rawData = audioData.getChannelData(0);

    console.log('Processing waveform data...');
    console.log(`Raw audio length: ${rawData.length} samples`);

    const baselineZoomLevels = BASELINE_ZOOM_LEVELS.map((samplesPerPixel) => {
      const peaks = generatePeaksForZoomLevel(rawData, samplesPerPixel, normalize);

      console.log(`Generated ${peaks.length} segments for ${samplesPerPixel} SPP`);

      return {
        samplesPerPixel,
        peaks,
      };
    });

    const audioDataObject = {
      data: baselineZoomLevels,
      metadata: {
        sourceFile: input,
        sampleRate: audioData.sampleRate,
        duration: rawData.length / audioData.sampleRate,
        channels: audioData.numberOfChannels,
        normalized: normalize,
        generatedAt: new Date().toISOString(),
        originalLength: rawData.length,
        zoomLevels: BASELINE_ZOOM_LEVELS,
        cubicInterpolationThreshold: CUBIC_INTERPOLATION_THRESHOLD,
      },
    };

    const jsonContent = JSON.stringify(audioDataObject, null, 2);

    const outputPath = join(process.cwd(), output);
    console.log('Output path:', outputPath);
    mkdirSync(dirname(outputPath), { recursive: true });

    writeFileSync(outputPath, jsonContent);

    const fileSize = (Buffer.from(jsonContent).length / 1024).toFixed(2);
    const totalSegments = baselineZoomLevels.reduce((sum, level) => sum + level.peaks.length, 0);

    console.log(`
Generation complete:
- Waveform data saved to ${output} (${fileSize}KB)
- Generated ${totalSegments} total segments across ${BASELINE_ZOOM_LEVELS.length} zoom levels
- Sample rate: ${audioData.sampleRate}Hz
- Duration: ${(rawData.length / audioData.sampleRate).toFixed(2)}s
- Zoom levels: ${BASELINE_ZOOM_LEVELS.map((spp) => `${spp} SPP`).join(', ')}
    `);
  } catch (error) {
    console.error('Error generating waveform data:', error);
    process.exit(1);
  }
}

generateWaveformData();
