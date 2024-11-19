import PropTypes from 'prop-types';

function Gato(props) {
  const { name, age, isGato, img, abrirModal, apagarGato, index } = props;

  return (
    <>
      <div className="Card">
        <img src={img} alt={`Imagem de ${name}`} className="Gato" />
        <p>Nome: {name}</p>
        <p>Idade: {age}</p>
        <p>Gato: {isGato ? "Sim" : "Não"}</p>

        <div className="card-actions">
          <button
            className="edit-button"
            onClick={(e) => {
              e.stopPropagation();
              abrirModal(index, "edit");
            }}
          >
            Editar
          </button>
          <button
            className="delete-button"
            onClick={(e) => {
              e.stopPropagation();
              apagarGato(index);
            }}
          >
            Apagar
          </button>
        </div>
      </div>
    </>
  );
}

// PropTypes para garantir os tipos corretos nas props
Gato.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  isGato: PropTypes.bool.isRequired,
  img: PropTypes.string.isRequired,
  abrirModal: PropTypes.func.isRequired,
  apagarGato: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

Gato.defaultProps = {
  name: "Adicionar novo gato",
  age: 0,
  isGato: true,
};

export default Gato;
