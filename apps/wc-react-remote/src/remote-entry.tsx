import React from "react";
import { createRoot } from "react-dom/client";
import { WidgetName, WidgetProps } from "@ai-travel/models";
import { WIDGETS } from "./widgets/widget-mapping";

class ReactMFE extends HTMLElement {
  private root: ReturnType<typeof createRoot>;
  private widget!: WidgetName;
  private props: WidgetProps[WidgetName] = {} as any;

  constructor() {
    super();
    const mountPoint = document.createElement("span");
    //this.attachShadow({ mode: "open" }).appendChild(mountPoint);
    this.appendChild(mountPoint);
    this.root = createRoot(mountPoint);
  }

  connectedCallback() {
    const attr = this.getAttribute('widget') as WidgetName | null;
    if (attr) this.widget = attr;
    this.render();
    this.addEventListener("updateProps", this.handleUpdateProps as EventListener);
  }

  disconnectedCallback() {
    this.removeEventListener("updateProps", this.handleUpdateProps as EventListener);
  }

  private handleUpdateProps = (e: CustomEvent<{ props: any }>) => {
    this.props = e.detail.props;
    this.render();
  };

  render() {
    const Component = WIDGETS[this.widget] || (() => null);
    this.root.render(<Component {...this.props} />);
  }
}

customElements.define("react-mfe", ReactMFE);
