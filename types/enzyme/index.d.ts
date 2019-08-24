/**
 * MIT License
 *
 * Copyright (c) Robert Knight
 *
 * This module declares the types needed to implement adapters for Enzyme.
 *
 * Types for the consumer-facing API of Enzyme are available from DefinitelyTyped.
 */

declare module 'enzyme' {
  /**
   * The component class/function or host node type (eg. "div" for DOM `<div>`)
   * of an element.
   */
  export type ElementType = string | Function;

  export type NodeType = 'function' | 'class' | 'host';

  /**
   * A "React Standard Tree" node.
   *
   * This is a standardized representation of the output of a tree rendered
   * by a React-like library.
   */
  export interface RSTNode {
    /** The kind of component that was rendered. */
    nodeType: NodeType;

    /** The host type (HTML element tag) or component constructor function. */
    type: ElementType;

    props: { [prop: string]: any };
    key: any;
    ref: any;
    instance: any;

    /** The result of the `render` function from this component. */
    rendered: Array<RSTNode | string | null>;
  }

  /**
   * A UI renderer created by an `EnzymeAdapter`
   */
  export interface Renderer {
    /** Remove the rendered output from the DOM. */
    unmount(): void;

    /**
     * Return a React Standard Tree (RST) representation of the output.
     */
    getNode(): RSTNode | null;

    simulateError(
      nodeHierarchy: RSTNode[],
      rootNode: RSTNode,
      error: any
    ): void;

    /** Simulate an event on a node in the output. */
    simulateEvent(node: RSTNode, event: string, args: Object): void;

    batchedUpdates(fn: () => {}): void;
  }

  /**
   * HTML renderer created by an adapter when `createRenderer` is called with
   * `{ mode: "string" }`
   */
  export interface StringRenderer extends Renderer {
    render(el: JSXElement, context?: any): void;
  }

  /**
   * Full DOM renderer created by an adapter when `createRenderer` is called
   * with `{ mode: "mount" }`
   */
  export interface MountRenderer extends Renderer {
    render(el: JSXElement, context?: any, callback?: () => any): void;
  }

  /**
   * Options passed to the `render` function of a shallow renderer.
   */
  export interface ShallowRenderOptions {
    /**
     * A map of context provider type, from the provider/consumer pair created
     * by React's `createContext` API, to current value.
     */
    providerValues: Map<Object, any>;
  }

  /**
   * Shallow renderer created by an adapter when `createRenderer` is called
   * with `{ mode: "shallow" }`
   */
  export interface ShallowRenderer extends Renderer {
    render(el: JSXElement, context?: any, options?: ShallowRenderOptions): void;
  }

  export interface AdapterOptions {
    mode: 'mount' | 'shallow' | 'string';

    /** DOM container to render into. */
    attachTo?: HTMLElement;
  }

  /**
   * An element created by the `createElement` function of the React-like library.
   *
   * The internals of this will vary depending on the library.
   */
  export type JSXElement = Object;

  /**
   * An adapter that enables Enzyme to work with a specific React-like library.
   */
  export abstract class EnzymeAdapter {
    options: Object;

    // Required methods.
    abstract createElement(
      type: ElementType,
      props: Object,
      ...children: JSXElement[]
    ): JSXElement;
    abstract createRenderer(options: AdapterOptions): Renderer;
    abstract elementToNode(element: JSXElement): RSTNode;
    abstract isValidElement(el: JSXElement): boolean;
    abstract nodeToElement(node: RSTNode): JSXElement;
    abstract nodeToHostNode(node: RSTNode): Node | null;

    // Optional methods.
    displayNameOfNode?(node: RSTNode): string;
    invokeSetStateCallback?(instance: any, callback: () => {}): void;
    isCustomComponentElement?(instance: RSTNode): boolean;
    isFragment?(node: RSTNode): boolean;
    isValidElementType?(obj: any): boolean;
    wrap?(element: JSXElement): JSXElement;
  }

  // TODO
  export var mount: any;
  export var render: any;
  export var shallow: any;
  export var configure: any;
}
