import React, { useState, Suspense } from 'react';
import { Layout, Spin } from 'antd';
import classnames from 'classnames'
import { connect, withRouter, Switch } from 'umi';
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import HeaderContent from './header';
import MenuContent from './menu';
import SetTing from './Settings'
import Logo from './logo'
import { Settings } from '../../models/settings'
import './index.less';

const { Header, Content, Sider } = Layout;

const MyLayout: React.FC = (props: any) => {
    const { children, setting, location } = props
    const [coll, setColl] = useState(false)
    const collapsed = () => {
        setColl(!coll)
    }
    return (
        <Layout >
            <Sider
                width={256}
                onCollapse={collapsed}
                style={{ minHeight: '100vh' }}
                collapsed={coll}
                className={classnames(
                    'layout-sider',
                    `layout-sider__${setting.theme}`
                )}
            >
                <Logo coll={coll} theme={setting.theme}></Logo>
                <MenuContent theme={setting.theme} />
            </Sider>
            <Layout className={classnames(
                'container',
                {
                    'container--fix': setting.fixedHeader
                }
            )}>
                <Header
                    className={classnames(
                        'header',
                        `header--${coll ? 'close' : 'side'}`,
                        {
                            'header--fix': setting.fixedHeader,
                            'header--fix--close': setting.fixedHeader && coll,
                            'header--fix--side': setting.fixedHeader && !coll
                        }
                    )}
                >
                    <HeaderContent isActive={coll} onTrigger={collapsed} />
                </Header>
                <section style={{ padding: 16 }}>
                    <Content >
                        <SetTing></SetTing>
                        <Suspense fallback={<Spin size="large" className="layout__loading" />}>
                            <TransitionGroup className='layout__route'>
                                <CSSTransition key={location.pathname} classNames="layout__route" timeout={300}>
                                    <div className='main'>
                                        {children}
                                    </div>
                                </CSSTransition>
                            </TransitionGroup>
                        </Suspense>
                    </Content>
                </section>
            </Layout>
        </Layout >
    );
};

const mapStateToProps = ({ setting }: { setting: Settings }) => ({
    setting
})

export default withRouter(connect(mapStateToProps)(MyLayout))
