import { State, uiReducer } from './shared/ui.reducer';
import { ActionReducer, ActionReducerMap } from '@ngrx/store';
import { AuthState, authReducer } from './auth/auth.reducer';
import { ingresoEgresoReducer, IngresoEgresoState } from './ingresos-egreso/ingreso-egreso.reducer';


export interface AppState {
  ui: State,
  auth: AuthState,
  // ingresoEgreso: IngresoEgresoState
}


export const appReducer: ActionReducerMap<AppState> = {
  ui: uiReducer,
  auth: authReducer,
  // ingresoEgreso: ingresoEgresoReducer
}
