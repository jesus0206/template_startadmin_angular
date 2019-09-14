import { User } from './user.model';
import { acciones, SET_USER, UNSET_USER } from './auth.actions';

export interface AuthState {
  user: User
}

const estadoInicial: AuthState = {
  user: null
}

export function authReducer(state = estadoInicial, accion: acciones): AuthState {

  switch (accion.type) {
    case SET_USER:
      return { user: { ...accion.user } }
    case UNSET_USER:
      return {
        user: null
      }

    default: return state
  }
}
