import { State } from './ui.reducer';
import * as uiImport from './ui.accions'
import { Action } from 'rxjs/internal/scheduler/Action';


export interface State {
  isLoading: boolean
}
const initState: State = {
  isLoading: false
}

export function uiReducer(state = initState, accion: uiImport.acciones): State {

  switch (accion.type) {

    case uiImport.ACTIVAR_LOADING:
      return { isLoading: true }

    case uiImport.DESACTIVAR_LOADING:
      return { isLoading: false }

    default:
      return state;
  }

}
