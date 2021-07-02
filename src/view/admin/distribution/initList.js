import React, { Component } from 'react'
import { Card, Table, Button, Tooltip, message } from 'antd'
import { getAccounts } from '../../../utils/mock';
export default class initList extends Component {
    async componentWillMount() {
        await this.init();
    }
    async init() {
        let accounts = getAccounts();
        for (let i = 0; i < accounts.length; i++) {
            accounts[i].key = i
        }
        this.setState({ data: accounts })
    }
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    distribution = (address) => {
        this.props.history.push({pathname:'/admin/distribution',state:{address:address}})
    };
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
                title: "公司名称",
                dataIndex: "name",
                key: "name",
                align: "center",
            },
            {
                title: "账户地址",
                dataIndex: "address",
                key: "address",
                align: "center",
                render: text => {
                    return <Tooltip placement="topLeft" title={'0x' + text}><a>0x{text.substr(0, 18) + '...'}</a></Tooltip>
                },
            },
            {
                title: "初始份额(吨)",
                key: "amount",
                dataIndex: "amount",
                align: "center"
            },
            {
                title: "分配份额",
                dataIndex: "distribution",
                key: "distribution",
                align: "center",
                render: (text, record) => {
                    return <Button type="primary" onClick={() => this.distribution(record.address)}>初始分配</Button>
                },
            }
        ]

        return (
            <>
                <Card title="初始份额分配">
                    <p style={{ color: 'gray' }}>按照一定的规则对公司初始碳排放额进行分配</p>
                    <Table rowKey={record=>record.name} columns={columns} pagination={{ pageSize: 5 }} dataSource={this.state.data} bordered />
                </Card>
            </>
        )
    }
}
