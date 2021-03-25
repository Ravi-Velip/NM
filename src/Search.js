import React from "react";
import "./SearchStyle.css";
import Pagination from "react-js-pagination";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';




class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state = { activePage: 15 };
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({ activePage: pageNumber });
    }


    render() {
        console.log(Object.keys(this.props.data).length);
        console.log(this.props.data)

        if (Object.keys(this.props.data).length > 0) {
            const totalResults = this.props.data.metadata.total_hits;
            const items = this.props.data.items;

            return (
                <div className="list-group" >
                    <a href="#" className="list-group-item list-group-item-action flex-column align-items-start active">
                        <div className="d-flex w-100 justify-content-between" >
                            <h5 className="mb-1" id="search-results">Search Results for {this.props.searchText}:</h5>
                            <small className="total-results">{totalResults}</small>
                        </div>
                    </a>
                    {items.map(item =>
                        <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                            <div className="d-flex w-100 justify-content-between" id="listGroup">
                                <img src={item.links[0].href} className="rounded img-thumbnail"></img>
                                <div className="title-date">
                                    <h5 className="mb-1">{item.data[0].title}</h5>
                                    <small className="text-muted">{item.data[0].description}</small>
                                </div>

                            </div>


                        </a>


                    )}
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={3}
                        totalItemsCount={450}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange.bind(this)}
                    />


                </div>



            )
        }
        else {
            return (<div></div>)
        }
    }
}

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = { word2Srch: "" }
        this.state = { data: [], show: false }

        this.searchImg = this.searchImg.bind(this);
        this.txtChange = this.txtChange.bind(this);
    }
    searchImg() {
        //console.log('https://images-api.nasa.gov/search?q='+ this.state.word2Srch)
        fetch('https://images-api.nasa.gov/search?q=' + this.state.word2Srch)
            .then(response => response.json())
            .then(responseData => {
                this.setState({
                    data: responseData.collection,
                    show: true
                });
                //console.log(this.state.data)
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
                this.setState({
                    show: false
                });
            });
    }

    txtChange(e) {
        this.setState({
            word2Srch: e.target.value
        })
        //console.log(this.state.word2Srch)
    }

    render() {
        return (<div>
            <div className="card">
                <div className="card-header"><h4>{this.props.title}</h4></div>
                <div className="input-group mb-3 card-body" id="card-search">
                    <input type="text" className="form-control" placeholder="Try India OR USA" aria-label="Recipient's username" aria-describedby="basic-addon2" value={this.state.word2Srch} onChange={this.txtChange}></input>
                    <button className="btn btn-outline-secondary" type="button" onClick={() => this.searchImg()} >{this.props.btnText}</button>
                </div>
            </div>
            <Result searchText={this.state.word2Srch} data={this.state.data}></Result></div>)
    }

}




export default Search