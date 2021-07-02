import React, { Component } from 'react'
import { Card, Table, Button, Popconfirm,message } from 'antd'
import { get, post } from '../../../utils/request';
export default class companys extends Component {
    async componentWillMount() {
        await this.getComapny()
    }
    //从后台获取交易记录
    async getComapny() {
        get("/admin/company").then(res => {
            console.log(res)
            let status = res.status
            if(status === "success"){
                this.setState({
                    data: res.data,
                })
            }

        }).catch(err => {
            message.error("获取公司信息失败");
            console.error(err);
        })
    }
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
    }
    render() {
        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            total: 5, // 数据总数
            pageSize: 3, // 每页条数
            current: parseInt(this.state.pageNum), // 当前页码
            showTotal: ((total) => {
              return `共 ${total} 条`;
            }),
          };
        const columns = [
            {
                title: "序号",
                key: "id",
                width: 80,
                align: "center",
                render: (txt, row, index) => index + 1
            },
            {
                title: "公司名",
                dataIndex: "companyName",
                key: "companyName",
                align: "center",
            },
            {
                title: "法人",
                key: "legalRepresentative",
                dataIndex: "legalRepresentative",
                align: "center",
            },
            {
                title: "信用代码",
                key: "creditCode",
                dataIndex: "creditCode",
                align: "center",
            },
            {
                title: "注册资本（万）",
                key: "registeredCapital",
                dataIndex: "registeredCapital",
                align: "center",
            },
            {
                title: "实付资本（万）",
                key: "paidCapital",
                dataIndex: "paidCapital",
                align: "center",
            },
            {
                title: "成立日期",
                key: "establishedData",
                dataIndex: "establishedData",
                align: "center",
            },
            {
                title: "核准日期",
                key: "approvedDate",
                dataIndex: "approvedDate",
                align: "center",
            },
            {
                title: "自身风险",
                key: "ownRisk",
                dataIndex: "ownRisk",
                align: "center",
            },
            {
                title: "关联风险",
                key: "associatedRisk",
                dataIndex: "associatedRisk",
                align: "center",
            },
            {
                title: "人员规模",
                key: "staffSize",
                dataIndex: "staffSize",
                align: "center",
            },
            {
                title: "经营范围",
                key: "businessScope",
                dataIndex: "businessScope",
                align: "center",
            },
            {
                title: "信用分",
                key: "credit",
                dataIndex: "credit",
                align: "center",
            },
            {
                title: "贷款额度",
                key: "amount",
                dataIndex: "amount",
                align: "center",
            },
            {
                title: "操作",
                key: "operate",
                align: "center",
                render: (txt, row, index) =>{
                    return(
                        <div>
                            <Button type="primary" size="small">评分</Button>
                            <Button style={{margin: "1 1rem"}} type="danger" size="small">贷款</Button>
                        </div>
                    );
                }
            }
        ];
        return (
            <Card title="公司列表" extra={<Button type="primary" size="small" onClick={()=>this.props.history.push("/admin/products/edit")}>新增</Button>}>
                <Table rowKey="id" columns={columns} dataSource={this.state.data} bordered/>
            </Card>
        )
    }
}
