import React from 'react'

class DeleteConfirm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="modal fade" id={`delete${this.props.certificate.id}`}
                 tabIndex="-1"
                 role="dialog" aria-labelledby="l"
                 aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content popup-color">
                        <div className="modal-header">
                            <h5 className="modal-title"></h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this.props.locale.deleteQuestion} "{this.props.certificate.name}" ?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-info" data-dismiss="modal"
                                    onClick={() => this.props.isDelete("cancel")}
                            >{this.props.locale.buttonCancel}</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal"
                                    onClick={() => this.props.isDelete("ok")}
                            >{this.props.locale.buttonOk}</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DeleteConfirm
