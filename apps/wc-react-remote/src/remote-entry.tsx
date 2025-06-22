import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app/app";

interface AppProps {
  plan?: any;
}

class ReactMFE extends HTMLElement {
  private root: ReturnType<typeof createRoot>;
  private _props: AppProps = {};

  constructor() {
    super();
    const mountPoint = document.createElement("span");
    this.attachShadow({ mode: "open" }).appendChild(mountPoint);
    this.root = createRoot(mountPoint);
  }

  connectedEventListeners = () => {
    this.addEventListener("update-plan", (event: any) => {
      this._props.plan = event.detail;
      this.render();
    });
  };

  connectedCallback() {
    this.connectedEventListeners();
    this.render();
  }

  set plan(value: any) {
    this._props.plan = value;
    this.render();
  }

  get plan() {
    return this._props.plan;
  }

  render() {
    this.root.render(<App {...this._props} />);
  }
}

customElements.define("react-mfe", ReactMFE);
