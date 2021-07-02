import React, { Component } from 'react'
import { Avatar, Tabs, Card, Tooltip, Table, Tag, Space, Descriptions, Badge, Image, Button, Row, Col, InputNumber } from 'antd';
import ReactEcharts from 'echarts-for-react';
import { mockKDates, mockKData, mockContracts } from '../../../utils/mock';
import { SmileTwoTone, HeartTwoTone, CheckCircleTwoTone } from '@ant-design/icons';

const { TabPane } = Tabs;
function callback(key) {
    console.log(key);
}

const { Meta } = Card;
export class board extends Component {

    render() {
        let dateArray = mockKDates()
        console.log(dateArray.length)
        console.log(dateArray)
        //数据意义：开盘(open)，收盘(close)，最低(lowest)，最高(highest)
        const option = {
            title: {
                text: '碳交易K线(元/吨)',
                left: 0
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },
            dataZoom: [
                {
                    type: 'inside',
                    start: 50,
                    end: 100
                },
                {
                    show: true,
                    type: 'slider',
                    top: '90%',
                    start: 50,
                    end: 100
                }
            ],
            xAxis: {
                data: mockKDates()
            },
            yAxis: {},
            series: [{
                type: 'k',
                data: mockKData()
            }]
        };

        const columns = [
            {
                title: '合约地址',
                dataIndex: 'address',
                key: 'address',
                render: text => {
                    return <Tooltip placement="topLeft" title={'0x' + text}><a>0x{text.substr(0, 18) + '...'}</a></Tooltip>
                },
            },
            {
                title: '卖家',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '出售数量',
                dataIndex: 'amount',
                key: 'amount',
            },
            {
                title: '合约价格',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: '合约状态',
                key: 'tag',
                dataIndex: 'tag',
                render: tag => {
                    let color = 'green';
                    if (tag === '已完成') {
                        color = 'geekblue';
                    } else if (tag === "异常") {
                        color = 'volcano';
                    }

                    return (
                        <Tag color={color} key={tag}>
                            {tag}
                        </Tag>
                    );
                }
            }
        ];
        const demos = [
            {
                status: "已完成",
                icon : <CheckCircleTwoTone twoToneColor="#52c41a" />,
                sell: "company A",
                buy: "company B",
                amount: 500,
                price: 50,
            },
            {
                status: "待处理",
                icon : <SmileTwoTone/>,
                sell: "company C",
                buy: "company D",
                amount: 1100,
                price: 75,
            },
            {
                status: "已完成",
                icon : <CheckCircleTwoTone twoToneColor="#52c41a" />,
                sell: "company E",
                buy: "company F",
                amount: 350,
                price: 70,
            },
        ];
        const listItems = demos.map((demo) =>
            <Card
                hoverable
                style={{ width: 600 }}

            >
                <Meta
                    avatar={demo.icon}
                    title={demo.status}
                />
                <br/>
                <Row>
                    <Col span={12}>
                        <Descriptions bordered>
                            <Descriptions.Item label="卖方">
                                {demo.sell}
                            </Descriptions.Item>
                        </Descriptions>
                    </Col>
                    <Col span={12}>
                        <Descriptions bordered>
                            <Descriptions.Item label="交易数量(吨)">
                                {demo.amount}
                            </Descriptions.Item>
                        </Descriptions>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Descriptions bordered>
                            <Descriptions.Item label="买方">
                                {demo.buy}
                            </Descriptions.Item>
                        </Descriptions>
                    </Col>
                    <Col span={12}>
                        <Descriptions bordered>
                            <Descriptions.Item label="交易价格(元)">
                                {demo.price}
                            </Descriptions.Item>
                        </Descriptions>
                    </Col>
                </Row>
            </Card>
        );
        const data = [
        ];
        return (
            <Tabs defaultActiveKey="1" onChange={callback} >
                <TabPane tab="碳K线" key="1">
                    <ReactEcharts option={option} />
                </TabPane>
                <TabPane tab="碳合约信息" key="2">
                    <Table pagination={{ pageSize: 5 }} key={record => record.key} columns={columns} dataSource={mockContracts()} />
                </TabPane>
                <TabPane tab="订单系统" key="3">
                    <Card title="订单列表" extra={<Button type="primary">发起交易</Button>}>
                        <Space size={[50, 40]} wrap>
                            {listItems}
                        </Space>
                    </Card>
                </TabPane>
            </Tabs>
        )
    }
}

export default board
