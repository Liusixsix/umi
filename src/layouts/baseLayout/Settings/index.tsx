import React, { useState } from 'react';
import { Drawer, Button, Tooltip, Divider, List, Switch } from 'antd';
import { CheckOutlined, CloseOutlined, SettingOutlined } from '@ant-design/icons';
import { connect } from 'umi';

import './index.less'
import { Settings } from '../../../models/settings';



interface SetTingsBodyProps {
    children: React.ReactNode,
    title: string
}

function SettingsBody({ children, title }: SetTingsBodyProps) {
    return (
        <div style={{ marginBottom: 24 }}>
            <h3 className='layout__settings__title'>{title}</h3>
            {children}
        </div>
    )
}

interface Item {
    title: string;
    key: string;
    url: string
}

interface SettingsCheckBoxProps {
    value: string,
    onChange: (key: any) => void;
    list: Item[]
}

function SettingsCheckBox({ value, onChange, list }: SettingsCheckBoxProps) {
    return (
        <div className='layout__settings__checkbox'>
            {
                list.map(item => {
                    return (
                        <Tooltip title={item.title} key={item.key}>
                            <div className='layout__settings__checkbox-item'
                                onClick={() => onChange(item.key)}
                            >
                                <img src={item.url} alt={item.key} />
                                <div
                                    className="layout__settings__checkbox--check"
                                    style={{
                                        display: value === item.key ? 'block' : 'none',
                                    }}
                                >
                                    <CheckOutlined />
                                </div>
                            </div>
                        </Tooltip>
                    )
                })
            }
        </div>
    )
}


const SetTing: React.FC = (props: any) => {
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(!visible);
    };
    const onClose = () => {
        setVisible(false);
    };
    const onChange = (key: string, value: string|boolean) => {
        console.log(key,value)
        props.dispatch({
            type: 'setting/updateLayoutSettings',
            payload: {
                [key]: value
            }
        })
    }


    return (
        <>
            <Drawer
                placement="right"
                onClose={onClose}
                visible={visible}
                handler={
                    <div
                        className="layout__settings"
                        onClick={showDrawer}
                    >
                        {visible ? <CloseOutlined /> : <SettingOutlined />}
                    </div>
                }
            >
                <SettingsBody title='整体风格设置'>
                    <SettingsCheckBox
                        value={props.setting.theme}
                        onChange={value => onChange('theme', value)}
                        list={[
                            {
                                title: '暗黑菜单风格',
                                key: 'dark',
                                url: 'https://gw.alipayobjects.com/zos/antfincdn/XwFOFbLkSM/LCkqqYNmvBEbokSDscrm.svg',
                            },
                            {
                                title: '亮色菜单风格',
                                key: 'light',
                                url: 'https://gw.alipayobjects.com/zos/antfincdn/NQ%24zoisaD2/jpRkZQMyYRryryPNtyIC.svg',
                            }
                        ]}>

                    </SettingsCheckBox>
                </SettingsBody>

                <Divider />

                <List dataSource={[
                    {
                        title: '固定Header',
                        action: (
                            <Switch
                                size='small'
                                defaultChecked={props.setting.fixedHeader}
                                onChange={value => onChange('fixedHeader', value)}
                            ></Switch>
                        )
                    }
                ]}
                    renderItem={item => (
                        <List.Item style={{ justifyContent: 'space-between' }} actions={[item.action]}>
                            <span>{item.title}</span>
                        </List.Item>
                    )}
                ></List>
            </Drawer>
        </>
    )
}

const mapStateToProps = ({ setting }: { setting: Settings }) => ({
    setting,
})

export default connect(mapStateToProps)(SetTing)