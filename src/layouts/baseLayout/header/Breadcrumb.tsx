import React, { useState, useEffect } from 'react'
import { Breadcrumb } from 'antd'
import { useHistory } from 'umi'

import Menus, { MenusDate } from '@/config/menu.config'
import './index.less'
import { List } from 'antd/lib/form/Form'

const flattenRoute = (routeList: MenusDate[], deep: boolean = true): MenusDate[] => {
    const result: MenusDate[] = []
    for (let i = 0; i < routeList.length; i++) {
        const route = routeList[i]
        result.push({ ...route })
        if (route.children && deep) {
            result.push(...flattenRoute(route.children, deep))
        }
    }
    return result
}

const getPageTitle = (pathname?: string): string[] => {
    return (pathname || window.location.pathname)
        .split('/')
        .filter(Boolean)
        .map((value, index, array) => '/'.concat(array.slice(0, index + 1).join('/')))
}

const findRoutesByPaths = (pathList: MenusDate[], pathname: string[]): MenusDate[] => {
    return pathList.filter(child => pathname.indexOf(child.link) !== -1)
}

const Breadcrumbs: React.FC = () => {

    const [breadcrumbs, setBreadcrumbs] = useState<MenusDate[]>([])

    const history = useHistory()

    useEffect(() => {
        const unListen = history.listen(() => {
            setBreadcrumbs(findRoutesByPaths(flattenRoute(Menus), getPageTitle()))
        })
        return () => {
            unListen()
        }
    }, [])


    return (
        <div className='breadcrumb-container'>
            <Breadcrumb>
                {breadcrumbs.map((route: MenusDate) => (
                    <Breadcrumb.Item key={route.link}>{route.title}</Breadcrumb.Item>
                ))}
            </Breadcrumb>
        </div>
    )
}

export default Breadcrumbs