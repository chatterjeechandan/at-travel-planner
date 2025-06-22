import { WidgetName, WidgetProps } from '@ai-travel/models';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MfeBridgeService {
  private refs = new Map<WidgetName, HTMLElement>();

  register(name: WidgetName, el: HTMLElement) {
    this.refs.set(name, el);
  }

  update<T extends WidgetName>(name: T, props: WidgetProps[T]) {
    const el = this.refs.get(name);
    el?.dispatchEvent(new CustomEvent('updateProps', { detail: { props } }));
  }
}
