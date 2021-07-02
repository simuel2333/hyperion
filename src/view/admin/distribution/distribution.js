import React, { Component } from 'react'
import { Form, Input, Button, Card, message } from 'antd'
import { setAmount } from '../../../utils/mock';
export default class distribution extends Component {
    render() {
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        const tailLayout = {
            wrapperCol: { offset: 8, span: 16 }
        }
        const onFinish = value => {
            let address = this.props.location.state.address
            let amount = value.amount
            setAmount(address, amount)
            this.props.history.push('/admin/initlist')
        }
        const onFinishFailed = err => {
            console.log(err);
        }
        const checkPrice = (rule, value) => {
            let patt = /\d+/;
            if (!patt.test(value)) return Promise.reject('必须填数字');
            if (value > 0) {
                return Promise.resolve();
            }
            return Promise.reject('必须大于0');
        }
        return (
            <Card title="分配份额">
                <Form onFinish={onFinish} onFinishFailed={onFinishFailed} {...layout} style={{ width: '50%' }}>
                    <Form.Item label="账户地址" name="amount">
                        <a>0x{this.props.location.state.address}</a>
                    </Form.Item>
                    <Form.Item label="分配额度" name="amount" rules={[{ required: true, message: '请输入额度:+' }, { validator: checkPrice }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">保存</Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}
