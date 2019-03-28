import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import {Images} from "../config/images";
import api from "../../services/adonis/api";
import { login } from "../../services/adonis/auth";

import { request, receive, sendSocketId} from "../../services/servers/socket/require";

import { Form, Container } from "./styles";

class SignIn extends Component {
  
  state = {
    email: "",
    password: "",
    token: "",
    error: ""
  };

  popupwindow(url, width, height) {
    var leftPosition, topPosition
    //Allow for borders.
    leftPosition = (window.screen.width / 2) - ((width / 2) + 10)
    //Allow for title and status bars.
    topPosition = (window.screen.height / 2) - ((height / 2) + 50)
    //Open the window.
    return window.open(url, "Login Spotify",
    "status=no,height=" + height + ",width=" + width + ",resizable=yes,left="
    + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY="
    + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no")
  } 

  componentDidMount = async e => {

    await receive( data => {
      console.log(data)
    })

    await request( receive => {
      console.log(receive)
    })
  }

  token = async => {
    sendSocketId()
    this.popupwindow('http://localhost:8888/login' , 500, 500)
  }

  handleSignIn = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      try {
        const response = await api.post("/authenticate", { email, password });
        login(response.data.token);
        this.props.history.push("/home");
      } catch (err) {
        this.setState({
          error:
            "Houve um problema com o login, verifique suas credenciais. T.T"
        });
      }
    }
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignIn}>
          <img src={Images.logo} alt="LyricU" />
          {this.state.error && (<p>{this.state.error}</p>)}
          <input
            type="email"
            placeholder="E-mail"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button type="submit">Entrar</button>
          <br></br>
          <Link to="/signup">Criar conta grátis</Link>
        </Form>
        <button onClick={this.token}>Entrar</button>
      </Container>
    );
  }
}

export default withRouter(SignIn);