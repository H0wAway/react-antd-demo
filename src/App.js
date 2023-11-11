import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  /**
   * 数据管理的状态钩子
   * useState()是一个Hook,返回当前状态 (如datas) 和一个*更新*这个状态的函数 (如setDatas)。
   * useState([])中的[]代表数组类型，初始值为空
   */
  const [datas, setDatas] = useState([]);
  // 过滤后的数据，用于显示
  const [filteredData, setFilteredData] = useState([]);
  const [filterBy, setFilterBy] = useState('name'); // 新增状态，用于存储筛选依据

  /**
   * 编辑条目的处理函数。
   * @param {number} index - 要编辑的条目的索引。
   */
  const handleEdit = (index) => {
    // setEditingRow(index);
  };

  /**
   * 新增本地数据
   * @param {React.MouseEvent} e - 点击的事件对象，包括点击位置等信息。
   */
  function handlLocalAdd(e) {
    console.info("click ", e);
    setDatas([
      // ...datas 是 JavaScript 的扩展运算符（spread operator），它用于将一个数组中的所有元素展开到另一个数组中。
      ...datas,
      { name: "new", url: "new" },
    ]);
  }

  const handleDetail = (index) => {
    window.location.href = `http://localhost:3000/detail/?index=${index}/`;
  };

  const handleDelete = (index) => {
  };

  /**
   * 输入变化的处理器。
   * @param {React.ChangeEvent<HTMLInputElement>} event - 输入的更改事件
   */
  const handleInput = (event) => {
    console.info("输入事件： ", event);
    console.log(event.target.value); // 输入框的当前值
    // 使用原始数据集进行过滤，不要过滤已经过滤的数据
    const value = event.target.value.toLowerCase();
    const filtered = datas.filter((x) =>
      x[filterBy].toLowerCase().includes(value)
    );
    setFilteredData(filtered); // 更新显示的数据
  };
  /**
   * 用于组件挂载后获取数据的效果钩子，替代类组件中的 componentDidMount。
   */
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=200")
      .then((res) => res.json())
      .then((json) => {
        setDatas(json.results);
        setFilteredData(json.results); // 默认显示全部数据
        console.info(json);
      });
  }, []); // 空数组作为依赖项，确保效果只运行一次

  return (
    <div>
      <button onClick={handlLocalAdd} id='addButton'>
        新增数据
      </button>
      {/* 筛选 */}
      <select value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
        <option value="name">Name</option>
        <option value="url">URL</option>
      </select>
      <input type="search" onChange={handleInput} />

      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Name</th>
            <th>URL</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((x, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{x.name}</td>
              <td>{x.url}</td>
              <td>
                <button onClick={() => handleDetail(index + 1)} id="button1">
                  详情
                </button>
                <button onClick={() => handleEdit(index)} id="button1">
                  编辑
                </button>
                <button onClick={() => handleDelete(index + 1)} id="button1">
                  删除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
}
/**
 * 导出 App 模块，使用时通过 `import { App } from './App';` 的方式引入。
 */
export default App;


