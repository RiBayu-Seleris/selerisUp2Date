import { type PropType } from 'vue';
import type { Language, SelerisProfile } from './contract';
export * from './client';
export * from './contract';
export declare const SelerisScanner: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    assetBaseUrl: {
        type: StringConstructor;
        required: true;
    };
    profile: {
        type: PropType<SelerisProfile>;
        required: true;
    };
    requestId: StringConstructor;
    language: {
        type: PropType<Language>;
        default: string;
    };
    cameraFacing: {
        type: PropType<"front" | "rear">;
        default: string;
    };
    heatmapEnabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    captureStillFrame: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, (keyof import("./contract").ScannerEventMap)[], keyof import("./contract").ScannerEventMap, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    assetBaseUrl: {
        type: StringConstructor;
        required: true;
    };
    profile: {
        type: PropType<SelerisProfile>;
        required: true;
    };
    requestId: StringConstructor;
    language: {
        type: PropType<Language>;
        default: string;
    };
    cameraFacing: {
        type: PropType<"front" | "rear">;
        default: string;
    };
    heatmapEnabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    captureStillFrame: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    onQuality?: ((...args: any[]) => any) | undefined;
    onReady?: ((...args: any[]) => any) | undefined;
    onState?: ((...args: any[]) => any) | undefined;
    onProgress?: ((...args: any[]) => any) | undefined;
    onLiveVitals?: ((...args: any[]) => any) | undefined;
    onResult?: ((...args: any[]) => any) | undefined;
    onError?: ((...args: any[]) => any) | undefined;
    onHeatmapStatus?: ((...args: any[]) => any) | undefined;
    onStillFrameReady?: ((...args: any[]) => any) | undefined;
    onStillFrameFailed?: ((...args: any[]) => any) | undefined;
}>, {
    language: Language;
    cameraFacing: "front" | "rear";
    heatmapEnabled: boolean;
    captureStillFrame: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
