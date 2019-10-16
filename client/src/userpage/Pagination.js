import React from "react";
import LocalStorageService from "../service/LocalStorageService";


const Pagination = (props) => {
    //«  »
    return (


        <div className="container text-center">
            <div className="row">
                <div style={{width: '10%'}}></div>

                <div className="dropdown" style={{width: '10%'}}>
                    {props.maxResults == 6 &&
                    < button className="btn btn-warning text dropdown-toggle" type="button" data-toggle="dropdown">6
                        <span className="caret"></span></button>
                    }
                    {props.maxResults == 18 &&
                    < button className="btn btn-warning text dropdown-toggle" type="button" data-toggle="dropdown">18
                        <span className="caret"></span></button>
                    }
                    {props.maxResults == 36 &&
                    < button className="btn btn-warning text dropdown-toggle" type="button" data-toggle="dropdown">36
                        <span className="caret"></span></button>
                    }
                    {props.maxResults == 72 &&
                    < button className="btn btn-warning text dropdown-toggle" type="button" data-toggle="dropdown">72
                        <span className="caret"></span></button>
                    }
                    <ul className="dropdown-menu">
                        <li className="dropdown-button" onClick={() => props.paginate(1, 6)}>6</li>
                        <li className="dropdown-button" onClick={() => props.paginate(1, 18)}>18</li>
                        <li className="dropdown-button" onClick={() => props.paginate(1, 36)}>36</li>
                        <li className="dropdown-button" onClick={() => props.paginate(1, 72)}>72</li>
                    </ul>
                </div>

                <ul className="pagination justify-content-center" style={{width: '60%'}}>

                    {Number(props.pageNumber) > 3 &&
                    <li className="page-item "><a className="btn disable btn-outline-warning"
                                                  onClick={() => props.paginate(1, Number(props.maxResults))}>|«</a>
                    </li>
                    }

                    {(Number(props.pageNumber) - 1) > 1 &&
                    <li className="page-item "><a className="btn btn-outline-warning"
                                                  onClick={() => props.paginate(Number(props.pageNumber) - 2, Number(props.maxResults))}>{Number(props.pageNumber) - 2}</a>
                    </li>
                    }
                    {Number(props.pageNumber) > 1 &&
                    <li className="page-item "><a className="btn btn-outline-warning"
                                                  onClick={() => props.paginate(Number(props.pageNumber) - 1, Number(props.maxResults))}>{Number(props.pageNumber)- 1}</a>
                    </li>
                    }

                    <li className="page-item "><a className="btn btn-warning"
                                                  onClick={() => props.paginate(Number(props.pageNumber), Number(props.maxResults))}>{Number(props.pageNumber)}</a>
                    </li>

                    {Number(props.pageNumber) < LocalStorageService.getTotalPages() &&
                    <li className="page-item "><a className="btn btn-outline-warning"
                                                  onClick={() => props.paginate(Number(props.pageNumber) + 1, Number(props.maxResults))}>{Number(props.pageNumber) + 1}</a>
                    </li>
                    }
                    {(Number(props.pageNumber) + 1) < LocalStorageService.getTotalPages() &&
                    <li className="page-item "><a className="btn btn-outline-warning"
                                                  onClick={() => props.paginate(Number(props.pageNumber) + 2,Number(props.maxResults))}>{Number(props.pageNumber) + 2}</a>
                    </li>
                    }

                    {(Number(props.pageNumber) + 2) < LocalStorageService.getTotalPages() &&
                    <li className="page-item "><a className="btn btn-outline-warning"
                                                  onClick={() => props.paginate(LocalStorageService.getTotalPages(),
                                                      Number(props.maxResults))}>»|</a>
                    </li>
                    }

                </ul>
            </div>
            <br/>
        </div>


    );
};

export default Pagination;