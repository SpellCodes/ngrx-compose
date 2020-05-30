import { Action } from '@ngrx/store';

export type ContainerShip<T> = (params: T) => Container;

export interface Container {
  action: Action;
  dependencies?: Container[];
}
