export declare const SDK_VERSION = "0.1.0-dev.2";
export declare const PROTOCOL = "seleris.scan.v1";
export declare const PROFILE_SCHEMA = "seleris.web.vitals.input.v1";
export type Language = 'id' | 'en' | 'ms';
export interface SelerisLifestyle {
    smoking: boolean;
    alcohol: boolean;
    motorcycle: boolean;
}
export interface SelerisProfile {
    age: number;
    sex: 'Male' | 'Female';
    heightCm: number;
    weightKg: number;
    lifestyle: SelerisLifestyle;
}
export interface ProfileIssue {
    field: string;
    message: string;
}
export interface VitalMetric {
    value: number | null;
    unit: string;
    source: string;
    availability: string;
    confidence?: number;
    unavailableReason?: unknown;
    method?: 'sdnn';
}
export interface ScanResult {
    schemaVersion: 'seleris.web.vitals.v1';
    sdkVersion: string;
    referenceMobileVersion: '1.9.2';
    parityCertified: boolean;
    requestId: string;
    status: 'success';
    metrics: Record<'heartRate' | 'breathingRate' | 'hrv' | 'systolic' | 'diastolic', VitalMetric>;
    quality: {
        score: number;
        reliable: true;
        acceptedSampleCount: number;
        flags: unknown[];
    };
}
export interface ScannerCapabilities {
    sdkVersion: string;
    referenceMobileVersion: '1.9.2';
    parityCertified: boolean;
    camera: boolean;
    wasm: boolean;
    heatmap: boolean;
    stillFrame: boolean;
    networkInference: false;
}
export interface ScannerState {
    stage: string;
    phase: string;
    faceStatus: string;
    guidanceCode: string;
    guidance: string;
    lighting: {
        status: string;
        message: string;
    } | null;
    accessory: string | null;
    cameraFacing: 'front' | 'rear';
    previewMirrored: boolean;
    stillFrameStatus: string;
}
export interface PreflightQuality {
    score: number | null;
    status: string;
    evaluated: boolean;
    passed: boolean;
    threshold: number;
    spectralPeakRatio: number | null;
    acceptedSamples: number;
    durationSeconds: number;
    effectiveSampleRateHz: number | null;
    progress: number;
    reasonCode: string | null;
    attempt: number;
    resetCount: number;
    maximumAttempts: number;
}
export interface ScannerErrorEvent {
    code: string;
    message?: string;
    stage?: string;
    terminal?: boolean;
    retryable?: boolean;
    details?: unknown;
}
export interface ScannerEventMap {
    ready: ScannerCapabilities;
    state: ScannerState;
    progress: {
        value: number;
        remainingSeconds: number;
        acceptedSamples: number;
    };
    quality: {
        score: number | null;
        final: boolean;
        reliable: boolean;
        preflight: PreflightQuality;
        acceptedRateHz: number | null;
        analyzerRateHz: number | null;
    };
    liveVitals: {
        heartRate: number | null;
        provisional: boolean;
    };
    result: ScanResult;
    error: ScannerErrorEvent;
    heatmapStatus: {
        enabled: boolean;
        visible: boolean;
        suspendedForPreflight: boolean;
        warmupProgress: number;
        confidence: number | null;
        sequence: number;
    };
    stillFrameReady: {
        blob: Blob;
        width: number;
        height: number;
    };
    stillFrameFailed: {
        code: string;
        attemptCount?: number;
    };
}
export declare function validateProfile(value: unknown): ProfileIssue[];
export declare class SelerisError extends Error {
    code: string;
    details?: unknown | undefined;
    constructor(code: string, message: string, details?: unknown | undefined);
}
export declare function toCareInput(profile: SelerisProfile, requestId: string, language?: Language): {
    request_id: string;
    input_schema: string;
    language: Language;
    age: number;
    sex: "Male" | "Female";
    height_cm: number;
    weight_kg: number;
    lifestyle: {
        smoking: number;
        alcohol: number;
        motorcycle: number;
    };
};
export declare const VITAL_MAP: {
    readonly heartRate: readonly ["domain_a_vital_signs", "heart_rate", "bpm"];
    readonly breathingRate: readonly ["domain_c_physio_hrv", "laju_napas", "napas/menit"];
    readonly hrv: readonly ["domain_c_physio_hrv", "hrv_sdnn", "ms"];
    readonly systolic: readonly ["domain_a_vital_signs", "tekanan_sistolik", "mmHg"];
    readonly diastolic: readonly ["domain_a_vital_signs", "tekanan_diastolik", "mmHg"];
};
export declare function projectResult(care: any): ScanResult;
