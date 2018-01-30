/**
 Create Date: 1/23/18
 @author <a href="mailto:wu812730157@gmail.com">Wujunxian</a>
 Description:
 */
import React from 'react';
import {Button, FormControl, FormGroup, InputGroup} from "react-bootstrap";
import {RestClient, SERVER} from "../Util/RestClient";
import {convertToItems, doFilter} from "./CatalogBrowser.run";

class CatalogBrowser extends React.Component {
    constructor() {
        super();
        this.handleSearchCatalog = this.handleSearchCatalog.bind(this);
        this.onTemplateSelected = this.onTemplateSelected.bind(this);

        this.state = {templates: [], imageStreams: []};
    }

    onTemplateSelected(template) {
        console.log("template selected");
        console.log(template);
    }

    handleSearchCatalog() {
        let keyword = $('#inputSearchCatalog').val();
        console.log(keyword);
    }

    componentDidMount() {
        let templateSuccess = function (data) {
            this.setState({templates: data.items});
        };
        let imageStreamSuccess = function (data) {
            this.setState({imageStreams: data.items});
        };

        let error = function (data, status) {
        };

        RestClient.get(SERVER.MOCK, "/server/templates.json", undefined, templateSuccess, error, undefined, this);
        RestClient.get(SERVER.MOCK, "/server/imageStreams.json", undefined, imageStreamSuccess, error, undefined, this);
    }

    render() {
        return (
            <div className="content-wrapper">
                <FormGroup>
                    <InputGroup>
                        <FormControl id="isunputSearchCatalog" type="text" placeholder={"搜索模板库..."}/>
                        <InputGroup.Button>
                            <Button title="搜索" onClick={this.handleSearchCatalog}><em
                                className="fa fa-search"/></Button>
                        </InputGroup.Button>
                    </InputGroup>
                </FormGroup>

                {/*Start Browser Panel*/}
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h4>浏览模板库
                            <small className="pull-right">
                                <a>部署镜像</a>
                                &nbsp;
                                <a>导入YAML/JSON</a>
                                &nbsp;
                                <a>从项目中选择</a>
                            </small></h4>
                    </div>
                    <div className="panel-body">
                        <TemplateDisplay templates={this.state.templates} imageStreams={this.state.imageStreams}
                                         onTemplateSelected={this.onTemplateSelected}/>
                    </div>
                </div>
            </div>
        );
    }
}

class TemplateDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.onTemplateSelected = props.onTemplateSelected;
    }

    handleTemplateClick() {

    }

    render() {
        let result = convertToItems(this.props.templates, this.props.imageStreams);
        console.log(result);

        return (
            <div>{JSON.stringify(result)}</div>
        );
    }
}

class TemplateFilterPanel extends React.Component {
    constructor(props) {
        super(props);

        let filter = {
            keyword: props.keyword, primaryType: props.primaryType,
            secondaryType: props.secondaryType
        };

        this.state.collapse = true;
        this.props.filteredItems = doFilter(this.props.items, filter);
    }

    render() {
        return (
            <div></div>
        )

    }
}

export class Item {
    iconClass;
    displayName;
    primaryType;
    secondaryType;
    data;
}

export class Filter {
    keyword;
    primaryType;
    secondaryType;
}

export default CatalogBrowser;