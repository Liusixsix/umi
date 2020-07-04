import React, { FC } from 'react';
import { Link, connect, useLocation, Loading } from 'umi';
import { Menu } from 'antd';
import { GlobalModelState } from '@/models/connect';
import { queryKeysByPath } from '@/utils/utils';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { MenuTheme } from '../../../models/settings';
const { SubMenu, Item } = Menu;

export interface BasicLayoutProps {
  global: GlobalModelState;
  loading: boolean;
  theme: MenuTheme
}

const MenuContent: FC<BasicLayoutProps> = ({ global, theme }) => {
  const { menusData } = global;
  const location = useLocation();

  function renderMenu(data: any = []) {
    const rows = Array.isArray(data) ? data : [];
    return rows.map(row => {
      if (row === undefined) return false;
      const { title, link = '', key, children, icon, ...restState } = row;
      if (children && children.length > 0) {
        const subMenu = renderMenu(children);
        return (
          <SubMenu key={key} icon={<PieChartOutlined />} title={<span>{title}</span>}>
            {subMenu}
          </SubMenu>
        );
      }
      return (
        <Item key={key} title={title} icon={<PieChartOutlined />}>
          <Link to={{ pathname: link, state: { ...restState, key } }}>
            <span>{title}</span>
          </Link>
        </Item>
      );
    });
  }

  const { openKey, selectKey } = queryKeysByPath(location.pathname);

  return (
    <Menu
      selectedKeys={[selectKey || '']}
      defaultOpenKeys={[openKey]}
      mode="inline"
      theme={theme}
      style={{height:'calc(100% - 74px)'}}
    >
      {renderMenu(menusData)}
    </Menu>
  );
};

const mapStateToProps = ({ global, loading }: { global: GlobalModelState; loading: Loading }) => ({
  global,
  loading: loading.models.index,
})

export default connect(mapStateToProps)(MenuContent);
