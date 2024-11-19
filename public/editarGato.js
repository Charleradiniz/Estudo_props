window.onload = () => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    const age = params.get('age');
    const isGato = params.get('isGato') === 'true';
    const img = params.get('img');
  
    // Preenche os campos com os valores recebidos
    document.getElementById('name').value = name || '';
    document.getElementById('age').value = age || '';
    document.getElementById('isGato').checked = isGato;
    document.getElementById('img').value = img || '';
  
    const saveButton = document.getElementById('save');
    const cancelButton = document.getElementById('cancel');
  
    saveButton.addEventListener('click', () => {
      const updatedGato = {
        name: document.getElementById('name').value,
        age: parseInt(document.getElementById('age').value, 10),
        isGato: document.getElementById('isGato').checked,
        img: document.getElementById('img').value,
      };
  
      // Envia os dados atualizados de volta à janela principal
      window.opener.postMessage(
        { index: params.get('index'), updatedGato },
        '*'
      );
      window.close();
    });
  
    cancelButton.addEventListener('click', () => {
      window.close();
    });
  };
  