import React, { Component } from 'react';
import Rodape from '../../components/Rodape/Rodape';

import {Link} from 'react-router-dom';

// Importamos nosso logo dos Assets
import logo from '../../assets/img/icon-login.png';

class Categorias extends Component {

    constructor(){
        super();
        this.state = {
            lista : [],
            nome : ""
        }

        this.cadastrarCategoria = this.cadastrarCategoria.bind(this);
    }

    cadastrarCategoria(event){
        event.preventDefault();
        console.log("Cadastrando");
        console.log(this.state.nome);

        fetch("http://localhost:5000/api/categoria", {
           method : "POST",
           body: JSON.stringify({ titulo : this.state.nome }),
           headers : { 
               "Content-Type" : "application/json"
           }
        }).then(response => response.json())
          .then(this.listaAtualizada())
          .catch(error => console.log(error))

    }

    listaAtualizada = () =>{
        fetch("http://localhost:5000/api/categoria")
            .then(response => response.json())
            .then(data => this.setState( {lista: data } ));
    }

    atualizaNome(input){
        this.setState({ nome : input.target.value })
    }

    UNSAFE_componentWillMount(){
        document.title = this.props.titulo_pagina;
        console.log('Will');
    }

    componentDidMount(){
        console.log('Did');
        this.listaAtualizada();
    }

    componentDidUpdate(){
        console.log("Update");
    }

    componentWillUnmount(){
        console.log("Unmount")
    }

    render(){
        return(
            <div className="App">
                <header className="cabecalhoPrincipal">
                    <div className="container">
                    <img src={logo} alt="Logo Gufos" />
                    <Link to="/">Voltar</Link>

                    <nav className="cabecalhoPrincipal-nav">
                        Administrador
                    </nav>
                    </div>
                </header>

                <main className="conteudoPrincipal">
                    <section className="conteudoPrincipal-cadastro">
                    <h1 className="conteudoPrincipal-cadastro-titulo">Categorias</h1>
                    <div className="container" id="conteudoPrincipal-lista">
                        <table id="tabela-lista">
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Título</th>
                            <th>Ação</th>
                            </tr>
                        </thead>

                        <tbody id="tabela-lista-corpo">
                            {
                                this.state.lista.map(function(categoria){
                                    return (
                                        <tr key={categoria.categoriaId}>
                                            <td>{categoria.categoriaId}</td>
                                            <td>{categoria.titulo}</td>
                                            <td></td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                        </table>
                    </div>

                    <div className="container" id="conteudoPrincipal-cadastro">
                        <h2 className="conteudoPrincipal-cadastro-titulo">
                        Cadastrar Categoria
                        </h2>
                        <form onSubmit={this.cadastrarCategoria}>
                        <div className="container">

                            <input
                                type="text"
                                className="class__categoria"
                                id="input__categoria"
                                placeholder="tipo do evento"
                                value={this.state.nome}
                                onChange={this.atualizaNome.bind(this)}
                            />

                            <button
                            id="btn__cadastrar"
                            className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro"
                            >
                            Cadastrar
                            </button>
                        </div>
                        </form>
                    </div>
                    </section>
                </main>
                <Rodape />
            </div>
        );
    }
}

export default Categorias;