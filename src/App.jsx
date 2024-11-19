import React, { useState, useEffect } from "react";
import Gato from "./Gato.jsx";
import "./App.css";

// Importa as imagens
import FiodoraImg from "./assets/Fiodora.jpg";
import FreyaImg from "./assets/Freya.jpg";
import AngrbodaImg from "./assets/Angrboda.jpg";
import AristeuImg from "./assets/Aristeu.jpg";
import MoleImg from "./assets/Mole.jpg";
import SalemImg from "./assets/Salem.jpg";
import BetinhoImg from "./assets/Betinho.jpg";
import Icone_add from "./assets/icon_+.jpg";

function App() {
  const [gatos, setGatos] = useState([
    { name: "Fiodora", age: 5, isGato: true, img: FiodoraImg },
    { name: "Freya", age: 3, isGato: true, img: FreyaImg },
    { name: "Angrboda", age: 3, isGato: true, img: AngrbodaImg },
    { name: "Aristeu", age: 2, isGato: true, img: AristeuImg },
    { name: "Mole", age: 10, isGato: true, img: MoleImg },
    { name: "Salem", age: 7, isGato: true, img: SalemImg },
    { name: "Betinho", age: 3, isGato: true, img: BetinhoImg },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("edit"); // 'edit' ou 'highlight'
  const [gatoAtual, setGatoAtual] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const adicionarGato = () => {
    const novoGato = {
      name: "",
      age: 0,
      isGato: true,
      img: Icone_add,
    };
  
    const novosGatos = [...gatos, novoGato];
    setGatos(novosGatos);
  
    // Abre o modal de edição para o novo gato
    const novoIndex = novosGatos.length - 1; // Índice do novo gato
    abrirModal(novoIndex, "edit");
  };
  

  const abrirModal = (index, content) => {
    setGatoAtual({ ...gatos[index] });
    setEditIndex(index);
    setModalContent(content);
    setModalVisible(true);
  };

  const fecharModal = () => {
    setModalVisible(false);
    setGatoAtual(null);
    setEditIndex(null);
  };

  const salvarGato = () => {
    const novosGatos = [...gatos];
    novosGatos[editIndex] = gatoAtual;
    setGatos(novosGatos);
    fecharModal();
  };

  const apagarGato = (index) => {
    const novosGatos = gatos.filter((_, i) => i !== index); // Remove o card do índice especificado
    setGatos(novosGatos); // Atualiza o estado
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (modalVisible) {
        if (event.key === "Enter" && modalContent === "edit") {
          event.preventDefault();
          salvarGato();
        } else if (event.key === "Escape") {
          fecharModal();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalVisible, gatoAtual, modalContent]);

  return (
    <>
      <div className="gatos-container">
        {gatos.map((gato, index) => (
          <div key={index} className="gato-card">
            <div
              className="gato-card-main"
              onClick={() => abrirModal(index, "highlight")}
            >
              <Gato
                index={index} // Passa o index como prop
                name={gato.name}
                age={gato.age}
                isGato={gato.isGato}
                img={gato.img}
                abrirModal={abrirModal} // Passa a função abrirModal
                apagarGato={apagarGato} // Passa a função apagarGato
              />
            </div>
          </div>
        ))}

        {/* Card de Adicionar Gato */}
        <div className="gato-card">
          <div className="gato-card-main" onClick={adicionarGato}>
            <div className="icone-add-container">
              <img src={Icone_add} alt="Adicionar Gato" className="icone-add-img" />
              <h1>Adicionar novo gato</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de edição e visualização */}
      {modalVisible && modalContent === "edit" && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Editar Gato</h3>
            <form>
              <label>
                Nome:
                <input
                  type="text"
                  value={gatoAtual.name}
                  onChange={(e) =>
                    setGatoAtual({ ...gatoAtual, name: e.target.value })
                  }
                />
              </label>
              <label>
                Idade:
                <input
                  type="number"
                  value={gatoAtual.age}
                  onChange={(e) =>
                    setGatoAtual({ ...gatoAtual, age: parseInt(e.target.value, 10) })
                  }
                />
              </label>
              <label>
                É um gato?
                <input
                  type="checkbox"
                  checked={gatoAtual.isGato}
                  onChange={(e) =>
                    setGatoAtual({ ...gatoAtual, isGato: e.target.checked })
                  }
                />
              </label>
              <label>
                Upload da Imagem:
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const imageUrl = URL.createObjectURL(file);
                      setGatoAtual({ ...gatoAtual, img: imageUrl });
                    }
                  }}
                />
              </label>

              <img
                src={gatoAtual.img}
                alt="Imagem do Gato"
                className="icone-add-img"
              />
              <div className="modal-buttons">
                <button type="button" onClick={fecharModal}>
                  Cancelar
                </button>
                <button type="button" onClick={salvarGato}>
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modalVisible && modalContent === "highlight" && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{gatoAtual.name}</h2>
            <img src={gatoAtual.img} alt={gatoAtual.name} />
            <p>Idade: {gatoAtual.age} anos</p>
            <p>{gatoAtual.isGato ? "É um gato" : "Não é um gato"}</p>
            <button onClick={fecharModal}>Fechar</button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
