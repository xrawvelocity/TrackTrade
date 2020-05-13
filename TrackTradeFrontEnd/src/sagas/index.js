import TradesSagas from './trades';
import AuthSagas from './auth';
import {all} from 'redux-saga/effects';

export default function* rootSaga(){
    yield all([
        ...TradesSagas,
        ...AuthSagas
    ])
}