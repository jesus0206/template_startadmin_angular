import { State, uiReducer } from './shared/ui.reducer';
import { ActionReducer, ActionReducerMap } from '@ngrx/store';
import { AuthState, authReducer } from './auth/auth.reducer';


export interface AppState {
  ui: State,
  auth: AuthState
}


export const appReducer: ActionReducerMap<AppState> = {
  ui: uiReducer,
  auth: authReducer
}
