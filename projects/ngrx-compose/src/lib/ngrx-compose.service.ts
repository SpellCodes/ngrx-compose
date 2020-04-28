import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Container } from './container.model';

@Injectable({
  providedIn: 'root'
})
export class NgrxComposeService {

  constructor(
    private readonly store: Store<any>,
  ) { }

  /**
   * Create container to dispatch later on, alone or with others
   * @param action
   * @param dependencies
   */
  createContainer(action: Action, dependencies?: Container[]): Container {
    return {
      action,
      dependencies
    };
  }

  /**
   * Dispatch the wanted action and its dependencies
   */
  dispatch({ action, dependencies = [] }: Container): void {
    this.dispatchDependencies(...dependencies);
    this.store.dispatch(action);
  }

  /**
   * Recursively consume container's dependencies
   * @param containers
   */
  private dispatchDependencies(...containers: Container[]) {
    for (const container of containers) {
      if (container.dependencies) {
        for (const dep of container.dependencies) {
          this.dispatchDependencies(dep);
        }
      }

      this.dispatch({ action: container.action });
    }
  }

}
