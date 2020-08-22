import React, { FC, useEffect, useState } from 'react';
import { Checkbox } from 'antd';
import './index.less';

interface ItemProps {
    name: string;
    price: number;
    check: boolean;
    count: number;
    onChange?: (index: number) => void;
    index?: number
}

type Iprop = ItemProps[];

type allChe = false | true;
const initData = [
    { name: '商品1', price: 100, check: false, count: 1 },
    { name: '商品2', price: 200, check: true, count: 1 },
    { name: '商品3', price: 300, check: false, count: 1 },
    { name: '商品4', price: 400, check: false, count: 1 },
    { name: '商品5', price: 500, check: false, count: 1 },
];

const Car: FC<Iprop> = props => {
    const [list, setList] = useState<Iprop>(initData);
    const [total, setTotal] = useState<Number>(0);
    const [allCheck, setAllCheck] = useState<allChe>(true);
    useEffect(() => {
        const total = list.reduce((acc, cur, index) => {
            return cur.check ? acc + cur.price * cur.count : acc;
        }, 0);
        setTotal(total);
        const allCheck = list.every(item => {
        return item.check;
        });
        setAllCheck(allCheck);
    }, [list]);

    const itemChange = (index: number) => {
        let newList = [...list];
        newList[index].check = !newList[index].check;
        setList(newList);
    };

    const changeAllCheck = (e: any) => {
        const newList = list.map(item => {
            item.check = !allCheck;
            return item;
        });
        setList(newList);
    };

    const add = (index: number, type: string) => {
        const newList = [...list];
        type === 'add' && newList[index].count++;
        type === 'subtract' &&
            newList[index].count > 1 &&
            newList[index].count--;
        setList(newList);
    };

    return (
        <div className="car">
            {list.map((item, index: number) => {
                return (
                    <Item
                        {...item}
                        index={index}
                        onChange={itemChange}
                        add={add}
                        key={index}
                    ></Item>
                );
            })}
            <div className="item-car">
                <Checkbox checked={allCheck} onChange={e => changeAllCheck(e)}>
                    <span className="count">总价：{total}</span>
                    <span className="price"></span>
                </Checkbox>
            </div>
        </div>
    );
};

interface ItemProp {
    name: string;
    price: number;
    check: boolean;
    count?: number;
    onChange: (index: number) => void;
    index: number;
    add: (index: number, type: string) => void;
}

const Item: FC<ItemProp> = ({
    name,
    price,
    check,
    count,
    onChange,
    index,
    add,
}) => {
    return (
        <div className="item-car">
            <Checkbox onChange={() => onChange(index)} checked={check}>
                <span className="name">{name}</span>
                <a href="#" onClick={() => add(index, 'add')}>
                    加
                </a>
                <span>{count}</span>
                <a href="#" onClick={() => add(index, 'subtract')}>
                    减
                </a>
                <span className="price">${price}</span>
            </Checkbox>
        </div>
    );
};

export default Car;
