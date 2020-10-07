import React from "react";
import logo from "./logo.svg";
import "./App.css";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [
        {
          id: 1,
          name: "Hit the gym",
          done: false,
          showInput: false
        },
        {
          id: 2,
          name: "Pay bills",
          done: true,
          showInput: false
        },
        {
          id: 3,
          name: "Buy eggs",
          done: false,
          showInput: false
        },
        {
          id: 4,
          name: "Meet George",
          done: false,
          showInput: false
        },
        {
          id: 5,
          name: "Read a book",
          done: false,
          showInput: false
        },
        {
          id: 6,
          name: "Organize office",
          done: false,
          showInput: false
        },
      ],
      addToDo: {
        id: null,
        name: "",
        done: false,
        showInput: false
      },
      search: ''
    };
    localStorage.setItem('lists', this.state.lists);
    this.changeText = this.changeText.bind(this);
    this.addToDo = this.addToDo.bind(this);
    this.done = this.done.bind(this);
    this.destroy = this.destroy.bind(this);
    this.showEdit = this.showEdit.bind(this);
    this.updateToDo = this.updateToDo.bind(this);
    this.hiddenInput = this.hiddenInput.bind(this);
    this.searchList = this.searchList.bind(this);
  }

  changeText(event) {
    const value = event.target.value;
    this.setState((state) => {
      return {
        addToDo: {
          id: state.lists.length + 1,
          name: value,
          done: false,
          showInput: false
        },
      };
    });
  }

  updateToDo(event, id) {
    let abc = event.target.value;
    const lists = Object.assign([], this.state.lists);
    lists[id-1] = {...this.state.lists[id-1], name: abc};
    this.setState({
      lists: lists
    })
  }

  addToDo() {
    if (this.state.addToDo.name !== '') {
      this.setState({
        lists: [...this.state.lists, this.state.addToDo],
        addToDo: { ...this.state.addToDo, name: "" },
      });
    }
  }

  searchList(event) {
    this.setState({
      search: event.target.value
    });
  }

  done(id) {
    const lists = this.state.lists.map((item) => {
      if (item.id === id) {
        item.done = !item.done;
      }
      return item;
    });
    this.setState({
      lists: lists,
    });
  }

  destroy(id) {
    let lists = this.state.lists.filter((item) => item.id !== id);
    lists = lists.map((item, index) => {
      item.id = index + 1
      return item;
    });
    this.setState({
      lists: lists,
    });
  }

  showEdit(id) {
    const lists = this.state.lists.map((item) => {
      if (item.id === id) {
        item.showInput = true;
      }
      return item;
    });
    this.setState({
      lists: lists,
    });
  }

  hiddenInput(event, id) {
    if (event.keyCode == 13) {
      const lists = Object.assign([], this.state.lists);
      lists[id-1].showInput = false;
      this.setState({
        lists: lists,
      });
    }
  }

  render() {
    const { lists, addToDo, search } = this.state;
    return (
      <div>
        <LoadCssJs />
        <div id="myDIV" className="header">
          <NewTodo addToDo={addToDo} newTodo={this.addToDo} changeText={this.changeText} />
          <Search search={search} searchList={this.searchList} />
        </div>
        <ul id="myUL">
          <List lists={lists} done={this.done} search={search}
            destroy={this.destroy} showEdit={this.showEdit} hiddenInput={this.hiddenInput}
            updateToDo={this.updateToDo} />
        </ul>
      </div>
    );
  }
}

const Search = (props) => {
  const { search, searchList } = props;
  return (
    <div>
      <input type="text" id="search" placeholder="Search" value={search} onChange={props.searchList} />
    </div>
  );
}

const NewTodo = (props) => {
  const { addToDo } = props;
  return (
    <div>
      <h2>My To Do List</h2>
      <input type="text" id="myInput" placeholder="Title..." value={addToDo.name} onChange={props.changeText} />
      <span onClick={props.newTodo} className="addBtn">
        Add
      </span>
    </div>
  );
};

const List = (props) => {
  const filterLists = props.lists.filter(item => props.search === '' || item.name.toLowerCase().includes(props.search.toLowerCase()));
  const lists = filterLists.map((item) => {
    return (
      <li key={item.id} className={item.done ? "checked" : null}>
        <span onClick={() => props.done(item.id)}>
          {item.showInput ? null : item.name}
        </span>
        {item.showInput ? <input type="text" value={item.name}
          onChange={(e) => props.updateToDo(e, item.id)} onKeyUp={(e) => props.hiddenInput(e, item.id)} /> : null}
        <div className="pull-right">
          <i className="fa fa-edit" onClick={() => props.showEdit(item.id)}></i> <i className="fa fa-trash" onClick={() => props.destroy(item.id)}></i>
        </div>
      </li>
    );
  });
  return lists;
};

const LoadCssJs = () => (
  <div>
    <script
      src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
      integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV"
      crossOrigin="anonymous"
    ></script>
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
      integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
      crossOrigin="anonymous"
    />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
  </div>
);

export default App;
