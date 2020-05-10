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
   * Create a container to dispatch later on using the `dispatch` method
   *
   * @param action The action you need to dispatch
   * @param dependencies Actions to dispatch before the first parameter
   */
  createContainer(action: Action, dependencies?: Container[]): Container {
    return {
      action,
      dependencies
    };
  }

  /**
   * Dispatch the wanted action and its dependencies
   *
   * @param container Put here the container created earlier
   */
  dispatch({ action, dependencies = [] }: Container): void {
    this.dispatchDependencies(...dependencies);
    this.store.dispatch(action);
  }

  /**
   * Recursively consume container's dependencies
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
