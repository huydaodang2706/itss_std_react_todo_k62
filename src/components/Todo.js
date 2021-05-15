import React from 'react';

/* 
  【Todoのデータ構成】
　・key：Todoを特定するID（String）
　・text：Todoの内容（String）
　・done：完了状態（Boolean true:完了済み,, false:未完了）
*/

/* コンポーネント */
import TodoItem from './TodoItem';
import Input from './Input';
import Filter from './Filter';

/* カスタムフック */
import useStorage from '../hooks/storage';

/* ライブラリ */
import {getKey} from "../lib/util";

function Todo() {
  // const [items, putItems] = React.useState([
  //     /* テストコード 開始 */
  //   { key: getKey(), text: '日本語の宿題', done: false },
  //   { key: getKey(), text: 'reactを勉強する', done: false },
  //   { key: getKey(), text: '明日の準備をする', done: false },
  //   /* テストコード 終了 */
  // ]);
  const [items, putItems, clearItems] = useStorage();
  const [filter, setFilter] = React.useState('ALL');

  const displayItems = items.filter(item => {
    if (filter === 'ALL') return true;
    if (filter === 'TODO') return !item.done;
    if (filter === 'DONE') return item.done;
    return null;
  });

  const handleEnter=(e) => {
    putItems(items => [
      ...items,
      {key:getKey(), text:e.target.value, done:false}
    ])
  }

  const handleChecked = (checked) => {
    const newItems = items.map(item => {
      if (item.key === checked.key) {
        item.done = !item.done;
      }
      return item;
    });
    putItems(newItems);
  };

  const handleFilterChange = (value) =>{
    setFilter(value)
  }

  return (
    <div className="panel">
      <div className="panel-heading">
        ITSS ToDoアプリ
      </div>
      <Input onSubmit={handleEnter} ></Input>

      <Filter
        onChange={handleFilterChange}
        value={filter}
      />

      {displayItems.map(item => (
        <TodoItem 
          key={item.key}
          item={item}
          handleChecked={handleChecked}

        />
      ))}
      <div className="panel-block">
        {items.length} items
      </div>
      <div className="panel-block">
        <button className="button is-light is-fullwidth" onClick={clearItems}>
          全てのToDoを削除
        </button>
      </div>
    </div>
  );
}

export default Todo;