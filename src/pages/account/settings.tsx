import React, { useState } from 'react';
import { Steps, Button, } from 'antd';
import './index.less'
const { Step } = Steps;
const steps = [
    {
        title: 'First',
        content: 'First-content',
    },
    {
        title: 'Second',
        content: 'Second-content',
    },
    {
        title: 'Last',
        content: 'Last-content',
    },
];


const Demo: React.FC = () => {
    const [current, setCurrent] = useState(0)
    const prev = () => {
        if (current < 2) {
            setCurrent(current + 1)
        } else {
            setCurrent(0)
        }
    }

    return (
        <div>
            <Steps current={current}>
                {steps.map(item => (
                    <Step key={item.title} title={item.title} />
                ))}
            </Steps>
            <div className="steps-content">{steps[current].content}</div>
            <Button type='primary' style={{ margin: '0 8px' }} onClick={() => prev()}>
                Previous
            </Button>
        </div>
    )
}

export default Demo
