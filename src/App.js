import React from "react";

class CommentApp extends React.Component {
  constructor() {
    super();

    this.state = {
      allcomments: [
        {
          name: "Дмитрий",
          comment: "Мне нравится!",
          date: "20:46 21.07.2020",
          button: false,
        },
        {
          name: "Мария",
          comment: "Ободряю",
          date: "21:26 21.07.2020",
          button: false,
        },
        {
          name: "Роман",
          comment: "Нужно больше времени!",
          date: "23:12 21.07.2020",
          button: false,
        },
      ],
      newName: "",
      newComment: "",
    };

    if (localStorage.getItem("comment")) {
      let comments = localStorage.getItem("comment");
      comments = JSON.parse(comments);
      this.state.allcomments = comments;
    }
  }

  removeComment(props) {
    this.state.allcomments.splice(props, 1);
    localStorage.setItem("comment", JSON.stringify(this.state.allcomments));
    this.setState({ CommentApp: this.state.allcomments });
  }

  addComment() {
    const comment = this.state.allcomments;
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    let hours = today.getHours();
    let min = today.getMinutes();

    today = hours + ":" + min + " " + mm + "." + dd + "." + yyyy;
    comment.push({
      name: this.state.newName,
      comment: this.state.newComment,
      date: today,
      button: false,
    });
    localStorage.setItem("comment", JSON.stringify(this.state.allcomments));
    this.setState({ comment, newName: "", newComment: "" });
  }
  render() {
    return (
      <div>
        <ul>
          {this.state.allcomments.map((comment, i) => {
            return (
              <li key={i} className={"list"}>
                <span className={"name"}>{comment.name}</span>
                <div className={"desc"}>
                  <div className={"text"}>
                    {comment.comment} {comment.date}
                  </div>
                  <div className={"button"}>
                    <button
                      onClick={(ev) => {
                        this.removeComment(i);
                      }}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <form className={"form"}>
          <input
            type="text"
            required
            placeholder="Ваше имя "
            value={this.state.newName}
            onChange={(ev) => {
              this.setState({ newName: ev.target.value });
            }}
          />
          <textarea
            type="text"
            required
            placeholder="Комментарий"
            value={this.state.newComment}
            onChange={(ev) => {
              this.setState({ newComment: ev.target.value });
            }}
          ></textarea>
          <button
            onClick={(ev) => {
              ev.preventDefault();
              if (this.state.newComment === "" || this.state.newName === "") {
                alert("Заполнить поле");
              } else {
                this.addComment();
              }
            }}
          >
            Отправить
          </button>
        </form>
      </div>
    );
  }
}

export default CommentApp;
