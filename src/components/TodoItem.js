import React from 'react';

/* 
  【TodoItemコンポーネント】
　・Todoアイテムを表示する
　・チェックボックスにチェックが入っているか管理する
　・チェックボックスにチェックが入っているかアイテムをグレーアウトする
*/
function TodoItem({item,handleChecked}) {
  // const [itemCss,setItemCss] = React.useState("");
  const handleItem = (key) => {
    handleChecked(item)
  } 
  return (
    <label className="panel-block">
      <input type="checkbox" onClick={handleItem} checked={item.done}/>
      <p className= {item.done? 'has-text-grey-light' : ''}>{item.text}</p>
    </label>
  );
}

export default TodoItem;