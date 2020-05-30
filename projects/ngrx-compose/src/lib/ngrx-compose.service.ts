import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Container, Delivery, FetchPolicy } from './models';

@Injectable({
  providedIn: 'root',
})
export class NgrxComposeService<State> {
  constructor(private readonly store: Store<State>) {}

  /**
   * Create a container to dispatch later on using the `dispatch` method
   *
   * @param action The action you need to dispatch
   * @param dependencies Actions to dispatch before the first parameter
   */
  createContainer(action: Action, dependencies?: Container[]): Container {
    return {
      action,
      dependencies,
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
   * Return an observable after dispatching (or not) a container,
   * based off optional conditions
   */
  delivery<Result>(delivery: Delivery<State, Result>): Observable<Result> {
    const {
      selector,
      container,
      fetchPolicy,
      emptyCondition,
    } = delivery;

    switch (fetchPolicy) {
      case FetchPolicy.CacheAndNetwork:
        this.dispatch(container);
        return this.store.pipe(select(selector));

      case FetchPolicy.CacheOnly:
        return this.store.pipe(select(selector));

      case FetchPolicy.CacheFirst:
      default:
        return this.store.pipe(
          select(selector),
          tap((result) => {
            if (emptyCondition ? emptyCondition(result) : result == null) {
              this.dispatch(container);
            }
          }),
        );
    }
  }

  /**
   * Recursively consume container's dependencies
   */
  private dispatchDependencies(...containers: Container[]): void {
    containers.forEach((container) => {
      if (container.dependencies) {
        container.dependencies.forEach((dependency) => {
          this.dispatchDependencies(dependency);
        });
      }

      this.dispatch({ action: container.action });
    });
  }
}
