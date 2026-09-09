import { type Language, type SelerisProfile, type ScannerEventMap } from './contract';
export interface ScannerOptions {
    assetBaseUrl: string;
    profile: SelerisProfile;
    requestId?: string;
    language?: Language;
    cameraFacing?: 'front' | 'rear';
    heatmapEnabled?: boolean;
    captureStillFrame?: boolean;
    initializationTimeoutMs?: number;
}
export type ScannerEvent = keyof ScannerEventMap;
export declare class SelerisScannerClient {
    private host;
    readonly version = "0.1.0-dev.2";
    private frame;
    private port;
    private embedId;
    private sessionId;
    private sequence;
    private disposed;
    private initialized;
    private initializing;
    private starting;
    private scanning;
    private abortMount;
    private handlers;
    private pending;
    private options;
    constructor(host: HTMLElement, options: ScannerOptions);
    on<T extends ScannerEvent>(type: T, callback: (payload: ScannerEventMap[T]) => void): () => void;
    initialize(): Promise<unknown>;
    private mount;
    private command;
    private begin;
    start(): Promise<void>;
    retry(): Promise<void>;
    cancel(): Promise<void>;
    setCameraFacing(facing: 'front' | 'rear'): Promise<any>;
    setHeatmapEnabled(enabled: boolean): Promise<any>;
    setStillFrameEnabled(enabled: boolean): Promise<any>;
    exportHeatmap(options?: {
        composite?: boolean;
    }): Promise<Blob>;
    dispose(): Promise<void>;
    private cleanup;
}
export declare function createScanner(host: HTMLElement, options: ScannerOptions): SelerisScannerClient;
