import React from 'react'

import { createFromIconfontCN } from '@ant-design/icons';


const IconFont = createFromIconfontCN({
    scriptUrl: [
        '//at.alicdn.com/t/font_796928_kbvr5337m8.js'
    ],
})

export default function Icon(params: any) {
    const { type } = params
    return <IconFont style={{ color: '#fff', fontSize: '16px' }} type={type}></IconFont>
}
