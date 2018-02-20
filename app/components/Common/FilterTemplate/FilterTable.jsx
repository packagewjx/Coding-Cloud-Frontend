/*
 Create Date: 2/19/18
 @author 李宇振
 Description: 这是这个模板页面的下部分
 */

import React from 'react';
import { Link } from 'react-router';
import ContentWrapper from '../../Layout/ContentWrapper';
import { Grid, Row, Col, Panel, Button, Table } from 'react-bootstrap';
//import SidebarRun from "../Layout/Sidebar.run";
import pubsub from 'pubsub-js';

//这个跟ChooseForm中的optionItem是相关联的
//在这里写自己的代码（这里存储了模板页面下部分表格的全部信息，数组中每个元素对应表格的一行）
var tableData =
    [
        {key:"row1", header1:{pathname:"/filtertemplate/tablelink", text:"this is a link"}, header2:{pathname:"/filtertemplate/tablelink2", text:"this is a link2"},
            header3:"text1", header4:"text2", header5:"text3"},
    ];
class FilterTable extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            filter: tableData,
        };
    };
    choose(message)
    {
        /*在这里写自己的代码（根据message的内容（也就是搜索框中的条件）对tableData中的内容进行有选择的显示）*/
        /*你需要修改返回值，返回选择后的数组*/
        return tableData;
    }

    componentDidMount() {
        this.pubsub_token = pubsub.subscribe('PubFilterMessage', function (topic, message) {
            message = message.split(',');

            this.setState({
                filter:  choose(message)
            });

        });
    }

    componentWillUnmount() {
        // React removed me from the DOM, I have to unsubscribe from the pubsub using my token
        pubsub.unsubscribe(this.pubsub_token);
    }

    render(){

        var table = this.state.filter.map( (item) =>
            (  <tr>
                <td>
                    <Link to={item.header1.pathname}>{item.header1.text}
                    </Link>
                </td>
                <td>
                    <Link to={item.header2.pathname}>{item.header2.text}
                    </Link>
                </td>
                <td>
                    {item.header3}
                </td>
                <td>
                    {item.header4}
                </td>
                <td>
                    {item.header5}
                </td>
            </tr>)

        )
        return (
            <ContentWrapper>
                { /* START filtertable */}
                <Row>
                    <Col lg={ 12 }>
                        <Panel >
                            <Table striped>
                                <thead>
                                <tr>
                                    <th>header1</th>
                                    <th>header2</th>
                                    <th>header3</th>
                                    <th>header4</th>
                                    <th>header5</th>
                                </tr>
                                </thead>
                                <tbody>
                                {table}
                                </tbody>
                            </Table>
                        </Panel>
                    </Col>
                </Row>
            </ContentWrapper>
        );
    }

}


export default FilterTable;