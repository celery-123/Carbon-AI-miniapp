import { JSX } from '../../jsx/jsx-namespace';
import Component from '../../component';
import { VNode } from '../vnode';
import computeCSSLayout from './css-layout';
export interface INode {
    className?: string;
    children?: INode[];
    layout: any;
}
declare class NodeTree {
    className?: string;
    children?: NodeTree[];
    layout: any;
    constructor(node: INode);
    getElementsByClassName(targetClassName: string): INode[];
}
declare function renderJSXElement(element: JSX.Element, context: any, updater: any): any;
declare function computeLayout(component: Component, newChildren: JSX.Element): NodeTree;
declare function createNodeTree(vNode: VNode): {
    tag: import("../workTags").WorkTag;
    type: import("../../types").ElementType;
    style: any;
    children: any;
    vNode: VNode;
};
declare function fillElementLayout(node: any): void;
declare function fillComponentLayout(vNode: VNode): void;
declare function computeComponentBBox(component: Component | VNode, newChildren?: JSX.Element): DOMRect;
export { computeComponentBBox, computeLayout, renderJSXElement, createNodeTree, computeCSSLayout, fillElementLayout, fillComponentLayout, };
