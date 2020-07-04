/*
 * @Description: 
 * @Author: liu yan
 * @Date: 2020-07-01 16:12:28
 * @LastEditTime: 2020-07-02 11:15:50
 */ 
import { Effect, Reducer } from 'umi';
import { queryTableList } from '@/services/list';

interface TableListProps {
  [key: string]: any;
}

export interface QueryTableState {
  searchContentVal: string;
  statusVal: string;
  queryTableSource: TableListProps[];
}

export interface QueryTableType {
  namespace: 'queryTable';
  state: QueryTableState;
  effects: {
    queryTableList: Effect;
  };
  reducers: {
    save: Reducer<QueryTableState>;
    // 启用 immer 之后
    // save: ImmerReducer<QueryTableState>;
  };
}

const QueryTableModel: QueryTableType = {
  namespace: 'queryTable',
  state: {
    searchContentVal: '',
    statusVal: '',
    queryTableSource: [],
  },
  effects: {
    *queryTableList(_, { call, put, select }) {
      const { searchContentVal, statusVal } = yield select(
        (state: QueryTableState) => state,
      );
      const response = yield call(queryTableList, {
        searchContentVal,
        statusVal,
      });
      if (response.status === 'ok') {
        yield put({
          type: 'save',
          payload: {
            queryTableSource: response.data,
          },
        });
      }
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    // 启用 immer 之后
    // save(state, action) {
    //   state.name = action.payload;
    // },
  },
};

export default QueryTableModel;
