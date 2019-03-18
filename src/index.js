import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './bootstrap.min.css';

class List extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			value: ''
		};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.popList = this.popList.bind(this);
	}

	handleSubmit(event) {
		if (this.state.value.length != 0) {
			this.state.list.push(this.state.value);
		}
		this.setState({
			list: this.state.list,
			value: ''
		});
		event.preventDefault();
	}

	handleChange(event) {
		this.setState({
			value: event.target.value
		});
	}

	popList(event) {
		this.state.list.pop(event.target.value);
		this.setState({
			list: this.state.list
		})
	}

	render() {

		let list = this.state.list;
		let listItem = list.map((li, id) =>
		  <li key={id} className="list-group-item d-flex justify-content-between align-items-center">
		    <Link value={li} />
		    <button onClick={this.popList} value={li} className="badge badge-primary badge-pill">Xóa</button>
		  </li>
		);
		return (
			<div>
				<ul className="list-group">
				  {listItem}
				</ul>
				<br></br>
				<div>
				  <div className="form-group">
				    <label htmlFor="exampleInputEmail1">Đánh giá</label>
				    <input type="text" value={this.state.value}
				      onChange={this.handleChange} className="form-control" />
				  </div>
				  <button onClick={this.handleSubmit} className="btn btn-primary">Lưu</button>
	      </div>
			</div>
		);
	}
}

class Link extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			del: false
		}
    this.handleComplete = this.handleComplete.bind(this);
	}

	handleComplete(event) {
		event.preventDefault();
		this.setState({
			del: ((this.state.del === true) ? false : true)
		});
	}

	render () {
		if (this.state.del === true) {
			return (
				<a href="#" onClick={this.handleComplete} value={this.props.value}>
					<del>{this.props.value}</del> <span class="badge badge-secondary">Hoàn thành</span>
				</a>
			);
		} else {
			return (
				<a href="#" onClick={this.handleComplete} value={this.props.value}>
					{this.props.value}
				</a>
			);
		}
	}
}

class Main extends React.Component {
	render() {
		return (
			<div>
				<div className="container">
					<div className="jumbotron text-center">
				  	<h1>To do list</h1>
					</div>
					<List />
			  </div>
		  </div>
		);
	}
}

ReactDOM.render(<Main />,
document.getElementById('root'));
