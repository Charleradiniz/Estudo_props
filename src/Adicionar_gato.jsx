import Icone_add from './assets/icon_+.jpg';

function Adicionar(props){
    return(
        <>
        <div className="New_cat">
            <img src={props.img} alt="Adicionar novo gato" className="Gato" />
            
        </div>
       
        </>
    );

}

export default Adicionar