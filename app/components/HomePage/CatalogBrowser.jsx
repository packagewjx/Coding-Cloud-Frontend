/**
 Create Date: 1/23/18
 @author <a href="mailto:wu812730157@gmail.com">Wujunxian</a>
 Description: This is the component used to display all public templates and imageStreams (of namespace openshift), it
 provide filter and two-level menu to select the item.
 */
import React from 'react';
import {Button, Col, Collapse, FormControl, FormGroup, Image, InputGroup, Row, Tab, Tabs} from "react-bootstrap";
import {RestClient, SERVER} from "../Util/RestClient";
import {convertToItems, doFilter} from "./CatalogBrowser.run";
import {getAbsoluteOffsetTop} from "../Util/StylingUtils";
import {Category, findIconClass} from "./constants";
import CatalogItemBuildDialog from "./CatalogItemBuildDialog";

class CatalogBrowser extends React.Component {
    constructor() {
        super();
        this.handleSearchCatalog = this.handleSearchCatalog.bind(this);
        this.onTabSelect = this.onTabSelect.bind(this);
        this.onThumbnailClick = this.onThumbnailClick.bind(this);
        this.changeFilter = this.changeFilter.bind(this);
        this.togglePanelOpen = this.togglePanelOpen.bind(this);
        this.onItemClick = this.onItemClick.bind(this);

        this.state = {
            templates: [], imageStreams: [], filter: new Filter(), open: true, buildItemModal: null
        };

        this.items = [];
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
        this.setState({filter: oldFilter});
    }

    onTabSelect(eventKey) {
        if (eventKey === 'all') {
            this.changeFilter({primaryType: undefined, secondaryType: undefined});
            this.setState({open: true});
        } else if (eventKey === 'other') {
            this.changeFilter({primaryType: eventKey});
            this.setState({open: true});
        }
        else {
            this.changeFilter({primaryType: eventKey});
            this.setState({open: false});
        }
    }

    onThumbnailClick(secondaryType) {
        if (this.state.filter.secondaryType === secondaryType || this.state.filter.secondaryType === undefined && secondaryType === 'all') {
            this.setState({open: !this.state.open});
        } else {
            this.changeFilter({secondaryType: secondaryType === 'all' ? undefined : secondaryType});
            this.setState({open: true});
        }
    }

    /**
     *
     * @param {Item} item
     **/
    onItemClick(item) {
        let modal = (
            <CatalogItemBuildDialog
                show={true}
                item={item}
                onModalClosed={() => {
                    //to make the close animation work, delay the set null operation
                    setTimeout(() => {
                        this.setState({buildItemModal: null});
                    }, 400);
                }}
            />
        );

        this.setState({buildItemModal: modal});
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
                    <PrimaryTab onThumbnailClick={this.onThumbnailClick} key={primaryType} eventKey={primaryType}
                                primaryType={primaryType} title={primaryType}/>
                )
            }
        }

        //calculate the max height for browser panel
        let browserPanelHeight = document.body.clientHeight - getAbsoluteOffsetTop($("#browserPanel")[0]) - 45;

        return (
            <div className="content-wrapper">
                <FormGroup>
                    <InputGroup>
                        <FormControl id="isunputSearchCatalog" type="text" placeholder={"搜索模板库..."}/>
                        <InputGroup.Button>
                            <Button title="搜索" onClick={this.handleSearchCatalog}>
                                <em className="fa fa-search"/>
                            </Button>
                        </InputGroup.Button>
                    </InputGroup>
                </FormGroup>

                {/*Start Browser Panel*/}
                <div id="browserPanel" className="panel" style={{maxHeight: browserPanelHeight, overflowY: "auto"}}>
                    <div className="panel-heading">
                        <h4>浏览模板库
                            <small className="pull-right">
                                <a>部署镜像</a>
                                &nbsp;
                                <a>导入YAML/JSON</a>
                                &nbsp;
                                <a>从项目中选择</a>
                            </small>
                        </h4>
                    </div>
                    <div className="panel-body">
                        <Tabs id="primaryTabs" onSelect={this.onTabSelect}>
                            <Tab eventKey={"all"} title={"all"}/>
                            {tabs}
                            <Tab eventKey={"other"} title={"other"}/>
                        </Tabs>
                        <TemplateFilterPanel open={this.state.open} onItemClick={this.onItemClick}
                                             items={this.items} filter={this.state.filter}/>
                    </div>
                </div>

                {/*Build Item Modal Start*/}
                {this.state.buildItemModal}
            </div>
        );
    }
}

class PrimaryTab extends React.Component {
    /**
     *
     * @param {{onThumbnailClick: function, primaryType: string, eventKey: any, title: string}} props
     */
    constructor(props) {
        super(props);
    }

    render() {
        let thumbnails = [];
        let primaryTypeObj = Category[this.props.primaryType];
        for (let secondaryType in primaryTypeObj) {
            if (primaryTypeObj.hasOwnProperty(secondaryType)) {
                thumbnails.push(
                    <Col key={secondaryType} md={2}>
                        <SecondaryThumbnail iconUrl={primaryTypeObj[secondaryType].iconUrl}
                                            title={secondaryType}
                                            secondaryType={secondaryType}
                                            onClick={this.props.onThumbnailClick}/>
                    </Col>
                )
            }
        }

        return (
            <Tab eventKey={this.props.eventKey} title={this.props.title}>
                <Row>
                    <Col md={2}>
                        <SecondaryThumbnail
                            title={"all"}
                            secondaryType={"all"}
                            onClick={this.props.onThumbnailClick}/>
                    </Col>
                    {thumbnails}
                </Row>
            </Tab>
        )
    }
}

class SecondaryThumbnail extends React.Component {
    render() {
        return (
            <a style={{cursor: "pointer"}} className="text-center" onClick={() => {
                this.props.onClick(this.props.secondaryType)
            }}>
                <Image className="center-block"
                       src={this.props.iconUrl ? "img/" + this.props.iconUrl : "/img/logo/faclone.svg"}
                       height={60} width={60}/>
                <h4>{this.props.title}</h4>
            </a>
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
                <Col key={this.filteredItems[i].data.metadata.name} md={3}>
                    <ItemView
                        item={this.filteredItems[i]}
                        onClick={() => {
                            this.props.onItemClick(this.filteredItems[i])
                        }}/>
                </Col>
            )
        }

        return (
            <Collapse in={this.props.open}>
                <Row>
                    {items}
                </Row>
            </Collapse>
        )

    }
}

class ItemView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let item = this.props.item;
        return (
            <div className="text-center" style={{cursor: "pointer", maxHeight: 150, minHeight: 150}}
                 onClick={this.props.onClick}>
                <div className="center-block" style={{
                    height: 80,
                    width: 80,
                    border: "2px solid grey",
                    borderTopRightRadius: "50%",
                    borderTopLeftRadius: "50%",
                    borderBottomRightRadius: "50%",
                    borderBottomLeftRadius: "50%"
                }}>
                    <img className="center-block"
                         style={{position: "relative", top: "50%", transform: "translateY(-50%)"}} src={item.iconClass ?
                        "img/" + findIconClass(item.iconClass) : "img/logo/faclone.svg"}
                         width={50}/>
                </div>
                <strong>{item.displayName}</strong>
            </div>
        )
    }

}


export class Item {
    /**
     * @type {string}
     */
    iconClass;
    /**
     * @type {string}
     */
    displayName;
    /**
     * @type {string}
     */
    description;
    /**
     * @type {string[]}
     */
    tags;
    /**
     * @type {string}
     */
    primaryType;
    /**
     * @type {string}
     */
    secondaryType;
    /**
     * @type {object}
     */
    data;
}

export class Filter {
    keyword;
    primaryType;
    secondaryType;
}

export default CatalogBrowser;