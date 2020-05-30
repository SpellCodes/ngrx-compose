import { MemoizedSelector } from '@ngrx/store';
import { Container } from 'dist/ngrx-compose/public-api';
import { Predicate } from '@angular/core';
import { FetchPolicy } from './fetch-policy.enum';

export interface Delivery<State, Result> {
  selector: MemoizedSelector<State, Result>;
  container: Container;
  fetchPolicy?: FetchPolicy;
  emptyCondition?: Predicate<Result>;
}
