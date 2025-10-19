import { Component } from '@antv/f-engine';
import AttrController from '../../controller/attr';
export interface MagnifierProps {
    focusRange: [number, number];
    radius?: number | string;
    position?: [number, number] | [string, string];
    chart?: any;
    coord?: any;
    offsetX?: number | string;
    offsetY?: number | string;
    lineStyle?: {
        [key: string]: any;
    };
    frameStyle?: {
        [key: string]: any;
    };
    referenceLines?: Array<{
        records: any;
        style?: {
            stroke?: string;
            lineWidth?: number;
            lineDash?: number[];
        };
    }>;
}
declare const _default: (View: any) => {
    new (props: MagnifierProps, context?: import("@antv/f-engine").IContext, updater?: import("@antv/f-engine/es/component/updater").Updater<import("@antv/f-engine").IState>): {
        getPositionAndRadius(): {
            position: any;
            radius: any;
        };
        createFocusAttrController(): {
            attrController: AttrController;
            focusDataArray: any;
        };
        mapping(): {
            pointsData: any;
            linesData: {
                points: any;
                style: {
                    stroke?: string;
                    lineWidth?: number;
                    lineDash?: number[];
                };
                records: any;
            }[];
            center: any;
        };
        render(): import("@antv/f-engine").JSX.Element;
        props: MagnifierProps;
        state: import("@antv/f-engine").IState;
        context: import("@antv/f-engine").IContext;
        refs: {
            [key: string]: Component<import("@antv/f-engine").IProps, import("@antv/f-engine").IState>;
        };
        updater: import("@antv/f-engine/es/component/updater").Updater<import("@antv/f-engine").IState>;
        container: import("@antv/g-lite").Group;
        layout: import("@antv/f-engine").LayoutProps;
        children: import("@antv/f-engine/es/canvas/vnode").VNode | import("@antv/f-engine/es/canvas/vnode").VNode[];
        isMounted: boolean;
        animate: boolean;
        animator: import("@antv/f-engine/es/canvas/render/animator").default;
        destroyed: boolean;
        _vNode: import("@antv/f-engine/es/canvas/vnode").VNode;
        willMount(): void;
        didMount(): void;
        shouldUpdate(_nextProps: MagnifierProps): boolean;
        willReceiveProps(_props: MagnifierProps, _context?: import("@antv/f-engine").IContext): void;
        willUpdate(): void;
        didUpdate(): void;
        willUnmount(): void;
        didUnmount(): void;
        setState(partialState: import("@antv/f-engine").IState, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        setAnimate(animate: boolean): void;
        destroy(): void;
    };
    defaultProps: {
        radius: string;
        offsetX: number;
        offsetY: number;
    };
};
export default _default;
