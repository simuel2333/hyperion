import React, { Component } from 'react'
import { Form, Button, Card, DatePicker, InputNumber, Slider, Row, Col } from 'antd'
import { sha256 } from 'js-sha256';
const hash = sha256(Math.random() + "").substr(0, 40);
export default class futures extends Component {
    state = {
        inputValue: 1,
    };
    onChange1 = value => {
        this.setState({
            inputValue: value,
        });
    };
    render() {
        const { inputValue } = this.state;

        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        const tailLayout = {
            wrapperCol: { offset: 8, span: 16 }
        }
        const onFinish = values => {
            console.log(values);
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
            <Card title="购入碳期货合约">
                <Form onFinish={onFinish} onFinishFailed={onFinishFailed} {...layout} style={{ width: '50%' }}>
                    <Form.Item label="合约编码" name="hash">
                        <a>0x{hash}</a>
                    </Form.Item>
                    <Form.Item label="数量(吨)" name="amount" rules={[{ required: true, message: '请输入数量' }]}>
                        <InputNumber />
                    </Form.Item>
                    <Form.Item label="价格(元)" name="price" rules={[{ required: true, message: '请输入价格' }]}>
                        <InputNumber />
                    </Form.Item>
                    <Form.Item label="保证金比例" name="rate" rules={[{ required: true }]}>
                        <Row>
                            <Col span={12}>
                                <Slider
                                    min={1}
                                    max={20}
                                    onChange={this.onChange1}
                                    value={typeof inputValue === 'number' ? inputValue : 0}
                                />
                            </Col>
                            <Col span={4}>
                                <InputNumber
                                    min={5}
                                    max={50}
                                    style={{ margin: '0 16px' }}
                                    value={inputValue}
                                    onChange={this.onChange1}
                                />
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">买涨</Button>
                        <Button type="danger" style={{ marginLeft: 20 }} htmlType="submit">买跌</Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}
