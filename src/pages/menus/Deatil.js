import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Detail() {
  const [data, setData] = useState(null);
  // 使用URLSearchParams来解析查询参数
  const queryParams = new URLSearchParams(useLocation().search);
  const index = queryParams.get("index");
//   const index = window.location.pathname.split("/")[2];

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${index}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setData(json);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setData(null);
      });
  }, [index]);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h2>Detail of {index}</h2>
      {/* 渲染data中的信息 */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default Detail;
