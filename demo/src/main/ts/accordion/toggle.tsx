import * as React from 'react';
import * as Aem from 'aem-react-js/aem';
import CqUtils from 'aem-react-js/CqUtils';
import { ResourceInclude }  from 'aem-react-js/include';


interface ToggleProps extends Aem.AemProps {
    resourceType:string;
    label:string;
    node:string;
    active:boolean;
    path:string;
    key:string;
    groupId:string;
    onChange():void;
}

export class Toggle extends Aem.AemComponent<ToggleProps, any> {


    render() {
        var onChange = function () {
            this.props.onChange();
        }.bind(this);

        var label:string = this.props.label || "Set a Label";

        if (this.isWcmEditable()) {
            this.setAllEditableVisible(this.props.path, this.props.active && !this.props.cqHidden);
            CqUtils.setVisible(this.props.path+"/togglepar/*", this.props.active && !this.props.cqHidden, true)
        }

        let resourceType:string = this.props.resourceType;

        // TODO CqEdit should be executed on client side only. also element should be set to outer div

        return (
            <div className="toggle">
                <Aem.CqEdit wcmmode={this.props.wcmmode} path={this.props.path} resourceType={resourceType}/>
                <input ref="toggleRadio" type="radio" className="toggle-input-state" checked={this.props.active} id={this.props.path}
                       name={this.props.groupId} onChange={onChange}/>
                <label className="toggle-input-toggle toggle-input-js-toggle"
                       htmlFor={this.props.path}>{label}
                </label>
                <div className="toggle-input-content">
                    <ResourceInclude wcmmode={this.props.wcmmode} path={this.props.path+"/togglepar"} resourceType="/libs/foundation/components/parsys"></ResourceInclude>
                </div>
            </div>

        );

    }
}
