import React, { Component } from 'react'
import { Card, message, Table, Tabs } from 'antd'
import { get, post } from '../../../utils/request';
const { TabPane } = Tabs;
function callback(key) {
    console.log(key);
}
export default class Index extends Component {
    async componentWillMount() {
        // await this.getTx()
    }
    //从后台获取交易记录
    // async getTx() {
    //     get("/admin/transaction").then(res => {
    //         console.log(res)
    //         let status = res.status
    //         if(status === "success"){
    //             let transactions = res.data
    //             let data1 = []
    //             let data2 = []
    //             transactions.forEach(element => {
    //                 if(element.type === 0) {
    //                     data1.push(element)
    //                 } else {
    //                     data2.push(element)
    //                 }
    //             });
    //             this.setState({
    //                 data1: data1,
    //                 data2: data2
    //             })
    //         }

    //     }).catch(err => {
    //         message.error("获取交易失败");
    //         console.error(err);
    //     })
    // }
    constructor(props) {
        super(props);
        this.state = {
            data1: null,
            data2: null
        };
    }
    render() {
        const columns = [
            {
                title: "序号",
                key: "id",
                width: 80,
                align: "center",
                render: (txt, row, index) => index + 1
            },
            {
                title: "交易地址",
                dataIndex: "hash",
                key: "hash",
                align: "center",
                render: text => {
                    if (text.length > 18) {
                        return <a>{text.substr(0, 18) + '...'}</a>
                    } else {
                        return <a>{text}</a>
                    }
                },
            },
            {
                title: "交易名称",
                dataIndex: "name",
                key: "name",
                align: "center",
            },
            {
                title: "交易详情",
                key: "url",
                dataIndex: "url",
                align: "center",
                render: text => {
                    return (
                        <div>
                            <a href={text}>查看</a>
                        </div>
                    );
                }
            }
        ]

        return (
            <>
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="华为链" key="1">
                        <Card title="华为链历史交易">
                            <Table rowKey="id" columns={columns} dataSource={this.state.data1} bordered />
                        </Card>
                    </TabPane>
                    <TabPane tab="以太坊链" key="2">
                        <Card title="以太坊历史交易">
                            <Table rowKey="id" columns={columns} dataSource={this.state.data2} bordered />
                        </Card>
                    </TabPane>
                </Tabs>
            </>
        )
    }
}
