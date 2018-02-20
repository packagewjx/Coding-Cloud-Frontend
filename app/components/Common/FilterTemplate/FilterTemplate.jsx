/*
Create Date: 2/19/18
@author 李宇振
Description: 这是我做的模板页面的主框架,关于这个模板，我在需要你们自己写代码的地方做了中文注释，
请在这些地方添加即可
*/

var React = require('react');
import ContentWrapper from '../../Layout/ContentWrapper';
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';
import ChooseForm from './ChooseForm';
import FilterTable from './FilterTable';

class FilterTemplate extends React.Component {

    render() {
        return (
            <ContentWrapper>
                <h3>openshift</h3>
                {/*multiple choice*/}
                <ChooseForm></ChooseForm>
                {/*table*/}
                <FilterTable></FilterTable>
            </ContentWrapper>
        );
    }


}

export default FilterTemplate