import * as React from 'react';
import * as Aem from 'aem-react-js/aem';

interface ReactTextProps extends Aem.Resource{
    propText: string
}


export default class Text extends Aem.ResourceComponent<ReactTextProps, Aem.ResourceProps<ReactTextProps>,  any> {

    constructor(props:Aem.ResourceProps<ReactTextProps>) {
        super(props);

    }

    render() {
        let text:string = this.getResource().propText;
        if (this.isWcmEditable() && !text) text = "please enter a text";
        return (
            <span>{text}</span>
        );
    }
}
