/*
 Create Date: 2/19/18
 @author 李宇振
 Description: 这是这个模板页面的上部分
 */

import React from 'react';
import ContentWrapper from '../../Layout/ContentWrapper';
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
import pubsub from 'pubsub-js';
import {Alert} from "react-bootstrap";


//optionItem数组中label为item的项是要被替换掉的，替换成经过前两个选择过滤后剩下的一些选择
//请务必按照0，1，2，3，4...这样的顺序来添加
var optionItems = [
    { label: 'Label1', value: 0 },
    { label: 'Label2', value: 1 },
    { label: 'in', value: 2 },
    { label: 'not in', value: 3 },
    { label: 'exist', value: 4 },
    { label: 'not exist', value: 5 },
    { label: 'item1', value: 6 },
    { label: 'item2', value: 7 },

];


const filtertemplatestyle=
    {
        padding: 0
    };
var ChooseForm = createClass({
    propTypes: {
        label: PropTypes.string,
    },
    getInitialState () {
        return {
            disabled: false,
            values: [],
            filter: [],
            filterValue: ""
        };
    },
    removeSelect()
    {
        this.setState({filterValue: []});
    },
    filterOptions(options, filterString, values)
    {
        if(values.length === 0)
            return options.slice( 0, 2);
        else if(values.length === 1)
            return options.slice( 2, 6);
        else  if(values[1].value == 2 || values[1].value == 3 )
        {
            {/*在这里写自己的代码（在这里要调用openshift API来获取选项，并进行选择）*/}
            return options.slice(6);
        }
        else if(values[1].value == 4 || values[1].value == 5)
        {
            return [];
        }
    },

    handleSelectChange (values) {
        this.setState({ values });
    },
    handleClick()
    {

        {/*判断搜索框上内容的合理性*/}
        let flag = [false, false];
        let {  values } = this.state;
        values = values.replace(/\"/g, "").split(',');
        for(let i = 0;i < values.length;i++)
        {
            if(parseInt(values[i]) === 1 || parseInt(values[i]) === 0)
            {
                flag[0] = true;
            }
            else if(parseInt(values[i]) <= 5 && parseInt(values[i]) >= 2)
            {

                if( parseInt(values[i]) <= 3 && parseInt(values[i]) >= 2)
                {
                    flag[1] = true;
                }
                else if( values.length >= 3)
                {
                    flag[1] = true;
                }
            }
        }
        if(flag[0] == true && flag[1] == true)
        {
            let message = values.toString();
            pubsub.publish('PubFilterMessage',message);

            //设置filterValue,以便显示选择后的结果
            let filtervalue = "";
            for(let i = 0;i < values.length;i++)
            {
                filtervalue += optionItems[ parseInt(values[i]) ].label.toString();
                if(i < values.length -1 )
                {
                    filtervalue += '-';
                }
            }
            this.setState({filterValue: filtervalue});

            //清除多选框的内容
            this.setState({values: []});
        }
        else
        {
            console.log("输入不符合规范");
            Alert("输入不符合规范");
        }

    },

    render () {
        const { disabled,  values } = this.state;
        const options = optionItems;
        return (
            <fieldset style={filtertemplatestyle}>
                <form className="form-inline ">
                    <Select
                        disabled={disabled}
                        options={options}
                        multi
                        onChange={this.handleSelectChange}
                        filterOptions={this.filterOptions}
                        placeholder="通过标签过滤"
                        simpleValue
                        value={values}
                    />

                    <button type="button" onClick={this.handleClick}>增加</button>
                    <label style={{'color': 'blue','fontSize': 10,'marginLeft': 10}}>{this.state.filterValue}</label>
                </form>
                <label  onClick={this.removeSelect } style={{'color': 'blue','fontSize': 13 }}>
                    清除过滤
                </label>
            </fieldset>
        );
    }
});


module.exports = ChooseForm;
