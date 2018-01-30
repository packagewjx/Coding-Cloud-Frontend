/**
 Create Date: 1/23/18
 @author <a href="mailto:wu812730157@gmail.com">Wujunxian</a>
 Description:
 */
import React from 'react';
import {Button, Col, Collapse, FormControl, FormGroup, InputGroup, Row, Tab, Tabs, Thumbnail} from "react-bootstrap";
import {RestClient, SERVER} from "../Util/RestClient";
import {Category, convertToItems, doFilter} from "./CatalogBrowser.run";

class CatalogBrowser extends React.Component {
    constructor() {
        super();
        this.handleSearchCatalog = this.handleSearchCatalog.bind(this);
        this.onTemplateSelected = this.onTemplateSelected.bind(this);
        this.onTabSelect = this.onTabSelect.bind(this);
        this.changeFilter = this.changeFilter.bind(this);
        this.togglePanelOpen = this.togglePanelOpen.bind(this);

        this.state = {templates: [], imageStreams: [], filter: new Filter(), open: true};

        this.items = [];
    }

    onTemplateSelected(template) {
        console.log("template selected");
        console.log(template);
    }

    handleSearchCatalog() {
        let keyword = $('#inputSearchCatalog').val();
        this.changeFilter({keyword});
    }

    /**
     * @param {Filter} filter partial filter object, to change this filter.
     **/
    changeFilter(filter) {
        let oldFilter = this.state.filter;
        Object.assign(oldFilter, filter);
        this.setState({filter: oldFilter, open: false});
    }

    onTabSelect(eventKey) {
        if (eventKey === 'all') {
            this.changeFilter({primaryType: undefined, secondaryType: undefined});
            this.setState({open: true});
        } else {
            this.changeFilter({primaryType: eventKey});
        }
    }

    togglePanelOpen() {
        this.setState({open: !this.state.open});
    }

    componentDidMount() {
        let templateSuccess = function (data) {
            this.setState({templates: data.items}, changeItem);
        };
        let imageStreamSuccess = function (data) {
            this.setState({imageStreams: data.items}, changeItem);
        };
        let error = function (data, status) {
        };
        //change the item after getting templates and imageStream
        let changeItem = () => {
            this.items = convertToItems(this.state.templates, this.state.imageStreams);
        };

        RestClient.get(SERVER.MOCK, "/server/templates.json", undefined, templateSuccess, error, undefined, this);
        RestClient.get(SERVER.MOCK, "/server/imageStreams.json", undefined, imageStreamSuccess, error, undefined, this);
    }

    render() {
        let tabs = [];
        for (let primaryType in Category) {
            if (Category.hasOwnProperty(primaryType)) {
                tabs.push(
                    <PrimaryTab togglePanelOpen={this.togglePanelOpen} changeFilter={this.changeFilter} key={primaryType} eventKey={primaryType} primaryType={primaryType} title={primaryType}/>
                )
            }
        }


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
                        <Tabs id="primaryTabs" onSelect={this.onTabSelect}>
                            <Tab eventKey={"all"} title={"all"}/>
                            {tabs}
                        </Tabs>
                        <TemplateFilterPanel open={this.state.open} items={this.items} filter={this.state.filter}/>
                    </div>
                </div>
            </div>
        );
    }
}

class PrimaryTab extends React.Component {
    /**
     *
     * @param {{changeFilter: Function, primaryType: string, eventKey: any, title: string}} props
     */
    constructor(props) {
        super(props);

        this.onThumbnailClick = this.onThumbnailClick.bind(this);
    }

    /**
     *
     * @param {string} secondaryType
     */
    onThumbnailClick(secondaryType) {
        this.props.changeFilter({secondaryType});
        this.props.togglePanelOpen();
    }

    render() {
        let thumbnails = [];
        let primaryTypeObj = Category[this.props.primaryType];
        for (let secondaryType in primaryTypeObj) {
            if (primaryTypeObj.hasOwnProperty(secondaryType)) {
                thumbnails.push(
                    <Col key={secondaryType} md={3}>
                        <SecondaryThumbnail iconUrl={primaryTypeObj[secondaryType].iconUrl}
                                            title={secondaryType}
                                            secondaryType={secondaryType}
                                            onClick={this.onThumbnailClick}/>
                    </Col>
                )
            }
        }

        return (
            <Tab eventKey={this.props.eventKey} title={this.props.title}>
                <Row>
                    {thumbnails}
                </Row>
            </Tab>
        )
    }
}

class SecondaryThumbnail extends React.Component {
    render() {
        return (
            <Thumbnail href="#" alt="100x100"
                       src={this.props.iconUrl ? "img/" + this.props.iconUrl : "/img/logo/faclone.svg"}
                       onClick={() => {this.props.onClick(this.props.secondaryType)}}>
                <h4>{this.props.title}</h4>
            </Thumbnail>
        );
    }
}

class TemplateFilterPanel extends React.Component {
    /**
     *
     * @param {{open: Boolean, items: Item[], filter: Filter}} props
     */
    constructor(props) {
        super(props);
    }

    render() {
        let items = [];
        let filter = this.props.filter || {
            keyword: this.props.keyword, primaryType: this.props.primaryType,
            secondaryType: this.props.secondaryType
        };
        this.filteredItems = doFilter(this.props.items, filter);

        for (let i = 0; i < this.filteredItems.length; i++) {
            items.push(
                <div key={this.filteredItems[i].data.metadata.name}>
                    <h4>{this.filteredItems[i].displayName}</h4>
                    <p>{this.filteredItems[i].primaryType}</p>
                </div>
            )
        }

        return (
            <Collapse in={this.props.open}>
                <div>
                    {items}
                </div>
            </Collapse>
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