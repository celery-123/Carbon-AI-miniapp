import { Component } from '@antv/f-engine';
import { ChartChildProps } from '../../chart';
export interface PieLabelProps {
    anchorOffset?: string | number;
    inflectionOffset?: string | number;
    label1?: any;
    label2?: any;
    sidePadding?: string | number;
    /**
     * 指定要显示的数据记录
     */
    records?: any[];
    /**
     * 触发的事件类型
     */
    triggerOn?: 'click' | 'press';
    onClick?: (ev: any) => void;
    /**
     * 调整高度的阈值比例，用于判断是否使用两段式连线
     * @default 1
     */
    adjustRatio?: number;
    /**
     * 布局类型
     *
     */
    type?: 'default' | 'spider';
}
declare const _default: (View: any) => {
    new <IProps extends PieLabelProps = PieLabelProps>(props: any): {
        labels: [];
        willMount(): void;
        /**
         * 绑定事件
         */
        didMount(): void;
        getLabels(props: any): any[];
        getSpiderLabels: (props: any) => any[];
        render(): import("@antv/f-engine").JSX.Element;
        props: IProps & ChartChildProps<import("../../chart/Data").DataRecord>;
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
        shouldUpdate(_nextProps: IProps & ChartChildProps<import("../../chart/Data").DataRecord>): boolean;
        willReceiveProps(_props: IProps & ChartChildProps<import("../../chart/Data").DataRecord>, _context?: import("@antv/f-engine").IContext): void;
        willUpdate(): void;
        didUpdate(): void;
        willUnmount(): void;
        didUnmount(): void;
        setState(partialState: import("@antv/f-engine").IState, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        setAnimate(animate: boolean): void;
        destroy(): void;
    };
};
export default _default;
