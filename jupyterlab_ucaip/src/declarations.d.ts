declare namespace JSX {
  import HTMLAttributes = JSXInternal.HTMLAttributes;

  interface IntrinsicElements {
    'confusion-matrix-element': HTMLAttributes<AngularElement>;
  }
}

declare interface AngularElement extends HTMLElement {
  labelsAnalysis: any;
}
