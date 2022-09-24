import React from "react";
// Richards Code
class ManualItem extends React.Component {
    constructor(props) {
        super(props)
    };
    render() {
        return <div className="manual-item-wrapper">
            <p><span className="title">{this.props.title}</span></p>
            <p><a target='_blank' rel='noreferrer' href={this.props.website}>Website</a> | <a target='_blank' rel='noreferrer' href={this.props.fileLink}>PDF</a></p>
        </div>
    }
};

export default ManualItem;