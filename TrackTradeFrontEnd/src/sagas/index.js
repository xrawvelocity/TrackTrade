import TradesSagas from './trades';
import {all} from 'redux-saga/effects';

export default function* rootSaga(){
    yield all([
        ...TradesSagas
    ])
}