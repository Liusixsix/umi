import React, { useEffect,useState,useMemo,} from 'react';
import AdjoinMatrix from './utils'
import SpecAdjoinMatrix from './utils2'
import './index.less'
let specList = [
  // { title: "颜色", list: ["红色", "紫色"] },
  { title: "套餐", list: ["套餐一", "套餐二"] },
  { title: "内存", list: ["64G", "128G", "256G"] },
];

let specCombinationList= [
  { id: "1", specs: ["紫色", "套餐一", "64G"] },
  { id: "2", specs: ["紫色", "套餐一", "128G"] },
  { id: "3", specs: ["紫色", "套餐二", "128G"] },
  { id: "4", specs: ["红色", "套餐二", "256G"] }
]
const classNames = require("classnames");
const Spec: React.FC = () => {
  
  // 已选择的规格，长度为规格列表的长度
  const [specsS, setSpecsS] = useState(Array(specList.length).fill(""));
  // 创建一个规格矩阵
  const specAdjoinMatrix = useMemo(() => new SpecAdjoinMatrix(specList, specCombinationList), [specList, specCombinationList]);
  // 获得可选项表
  const optionSpecs = specAdjoinMatrix.getSpecscOptions(specsS);
 
  const handleClick = function(bool: boolean, text: string, index: number) {
    console.log(optionSpecs)

    // 排除可选规格里面没有的规格
    if (specsS[index] !== text && !bool) return;
    // 根据text判断是否已经被选中了
    specsS[index] = specsS[index] === text ? "" : text;
    setSpecsS(specsS.slice());
  };

  return (
    <div>
      {specList.map(({ title, list }, index) => (
        <div key={index}>
          <p className="title">{title}</p>
          <div className="specBox">
            {list.map((value:any, i:any) => {
              const isOption = optionSpecs.includes(value); // 当前规格是否可选
              const isActive = specsS.includes(value); // 当前规格是否被选
              return (
                <span
                  key={i}
                  className={classNames('item',{
                    specOption: isOption,
                    specAction: isActive,
                    specDisabled: !isOption,
                  })}
                  onClick={() => handleClick(isOption, value, index)}
                >
                  {value}
                </span>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Spec;

