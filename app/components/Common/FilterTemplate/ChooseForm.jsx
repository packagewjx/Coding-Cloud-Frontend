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


//optionItem数组中label为item的项是要被替换掉的，替换成经过前两个选择过滤后剩下的一些选择
const optionItems = [
    { label: 'Label1', value: 0 },
    { label: 'Label2', value: 1 },
    { label: 'in', value: 2 },
    { label: 'not in', value: 3 },
    { label: 'exist', value: 4 },
    { label: 'not exist', value: 5 },
    { label: 'item', value: 6 },
];


var ChooseForm = createClass({
    propTypes: {
        label: PropTypes.string,
    },
    getInitialState () {
        return {
            disabled: false,
            values: [],
            filter: [],
        };
    },
    removeSelect()
    {
        this.setState({values: []});
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
        console.log('You\'ve selected:', values);
        this.setState({ values });
    },
    handleClick()
    {

        {/*判断搜索框上内容的合理性*/}
        var flag = [false, false];
        var {  values } = this.state;
        values = values.replace(/\"/g, "").split(',');

       for(var i = 0;i < values.length;i++)
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
            values = values.toString();
            pubsub.publish('PubFilterMessage',values)
        }
    },

    render () {
        const { disabled,  values } = this.state;
        const options = optionItems;
        return (

            <ContentWrapper>
                <Panel header="this is a header">
                    <form>
                        <div className="section">
                            <Select
                                disabled={disabled}
                                options={options}
                                multi
                                onChange={this.handleSelectChange}
                                filterOptions={this.filterOptions}
                                placeholder="filter by label"
                                simpleValue
                                value={values}
                            />

                            <div className="clearLabel">
                                <label className="clearlabel">
                                    <small className="clear-label" onClick={this.removeSelect } style={{'color':'blue'}}>Remove selected options</small>
                                </label>
                                <button type="button" onClick={this.handleClick}>Add</button>
                            </div>
                        </div>
                    </form>
                </Panel>
            </ContentWrapper>
        );
    }
});


module.exports = ChooseForm;
