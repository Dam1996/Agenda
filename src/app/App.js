import React, { Component }  from 'react';
class App extends Component {
    
    constructor(){
        super();
        this.state = {
            titulo:'',
            descripcion:'',
            tareas:[],
            _id:''
        };
        this.agregarTarea = this.agregarTarea.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    agregarTarea(e){
        if(this.state._id){
            fetch(`api/tareas/${this.state._id}`,{
                method:'PUT',
                body: JSON.stringify(this.state),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res=> res.json())
            .then(data=>{
                    console.log(data);
                    M.toast({html:'Tarea actualizada'});
                    this.setState({titulo:'',descripcion:'',_id:''});
                    this.obtenerTareas();
                });
        } else {
            fetch('api/tareas',{
                method:'POST',
                body: JSON.stringify(this.state),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res=> res.json())
                .then(data=>{
                    console.log(data)
                    M.toast({html:'Tarea guardada'});
                    this.setState({titulo:'',descripcion:''});
                    this.obtenerTareas();
                })
                .catch(err=>console.log(err));
        }
        e.preventDefault();
    }


    componentDidMount(){
        this.obtenerTareas();
    }

    obtenerTareas(){
        fetch('api/tareas')
        .then(res=> res.json())
            .then(data=>{
                this.setState({tareas:data});
            })
            .catch(err=>console.log(err));
    }

    handleChange(e){
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    eliminarTarea(id){
        if(confirm('¿Estas seguro querer eliminar esta tarea?')){
            fetch(`api/tareas/${id}`,{
                method:'DELETE',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res=> res.json())
                .then(data=>{
                    console.log(data);
                    M.toast({html:'Tarea eliminada'});
                    this.obtenerTareas();
                })
        }
    }

    editarTarea(id){
        fetch(`api/tareas/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({
                    titulo:data.titulo,
                    descripcion:data.descripcion,
                    _id:data._id
                })
            });
    }

    

    render(){
        return (
            <div>
                {/* Navegacion */}
                    <nav className="light-blue darken -4">
                        <div className="container">
                            <a className="brand-logo" href="/">Agenda de actividades</a>
                        </div>
                        </nav>  
                        
                        <div className="container"> 
                            <div className="row">
                                <div className="col s5">
                                    <div className="card">
                                        <div className="card-content">
                                            <form onSubmit={this.agregarTarea}>
                                                <div className="row">
                                                    <div className="input-field col s12">
                                                        <input name="titulo" onChange={this.handleChange} type="text" placeholder="Titulo de la tarea"value={this.state.titulo}/>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="input-field col s12">
                                                        <textarea name="descripcion" onChange={this.handleChange} placeholder="Descripcion de la tarea" className="materialize-textarea"value={this.state.descripcion}></textarea>
                                                    </div>
                                                </div>
                                                <button type="submit" className="btn light-blue darken -4">
                                                    Enviar
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="col s7">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Titulo</th>
                                                <th>Descripcion</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.tareas.map(tarea =>{
                                                return (
                                                    <tr key={tarea._id}>
                                                        <td>{tarea.titulo}</td>
                                                        <td>{tarea.descripcion}</td>
                                                        <td>
                                                            <button className="btn light-blue darken -4" onClick={()=>this.editarTarea(tarea._id)}>
                                                                <i className="material-icons">edit</i>
                                                            </button>
                                                            <button className="btn light-blue darken -4"style={{margin:'4px'}} onClick={()=>this.eliminarTarea(tarea._id)}>
                                                            <i className="material-icons">delete</i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
            </div>
        )
    }
}

export default App;