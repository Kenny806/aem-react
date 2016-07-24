import * as React from "react";
import * as resource from "aem-react-js/component/ResourceComponent";
import AccordionElement from "./accordion-element";
import {ResourceInclude} from "aem-react-js/include";
import ResourceUtils from "aem-react-js/ResourceUtils";
import EditMarker from "aem-react-js/component/EditMarker";

export default class Accordion extends resource.ResourceComponent<any, any, any> {

    constructor(props: resource.ResourceProps<resource.Resource>) {
        super(props);
        this.state = {activeIndex: 0};
    }

    public onChange(childIdx: number): void {
        if (this.state.activeIndex === childIdx) {
            this.setState({activeIndex: -1});
        } else {
            this.setState({activeIndex: childIdx});
        }
    }

    public renderBody(): React.ReactElement<any> {
        let content: any = {};
        if (this.props.resource) {
            content = this.props.resource;
        }

        let activeIndex = this.state.activeIndex;

        let toggles: React.ReactElement<any>[] = [];

        let children: any = ResourceUtils.getChildren(content);
        Object.keys(children).forEach((node: string, childIdx: number) => {
            toggles.push(<AccordionElement path={node}
                                           groupId={this.props.path}
                                           onChange={function():void {this.onChange(childIdx);}.bind(this)}
                                           key={node}
                                           active={ activeIndex === childIdx }
            ></AccordionElement>);
        }, this);


        let newZone: React.ReactElement<any> = null;
        if (this.isWcmEditable()) {
            let resourceType = this.getResourceType() + "/new";
            newZone = <ResourceInclude element="div" hidden={true} path="*"
                                       resourceType={resourceType}></ResourceInclude>;
        }
        return (
            <div>
<<<<<<< HEAD
                <EditMarker  label="Accordion"></EditMarker>
=======
                <EditMarker label="Accordion"/>
>>>>>>> 5bd2842... removed redux
                { toggles }
                { newZone }
            </div>
        );
    }


}
