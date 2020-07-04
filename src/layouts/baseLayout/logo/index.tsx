import React from 'react'
import classnames from 'classnames'
import { Link } from 'umi';

import AdminConfig from '@/config/index'
import './index.less'
interface ILogo {
    coll: boolean,
    theme: string
}
function Logo({ coll, theme }: ILogo) {
    return (
        // <div
        //     className={classnames('layout__side-bar-logo-wrap')}
        // >
            <Link to="/">
                <h1 className={classnames(
                    'layout__side-bar-title',
                    `layout__side-bar-title-${theme}`
                )}>{!coll ? AdminConfig.title : ''}</h1>
            </Link>
        // </div>
    );
}

export default Logo