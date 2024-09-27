const questionContainer = document.getElementById('questions');

questionContainer.addEventListener('change', function (e) {
    if (e.target.classList.contains('question_type')) {
        const selectedValue = e.target.value;
        const optionContainer = e.target.nextElementSibling;

        optionContainer.innerHTML = '';

        if (selectedValue === 'multiple_choice') {
            const divRadio = document.createElement('div');
            divRadio.classList.add('div-options');

            const newInputRadio = document.createElement('input');
            newInputRadio.type = 'radio';
            divRadio.appendChild(newInputRadio);

            const newInputText = document.createElement('input');
            newInputText.type = 'text';
            newInputText.name = 'opcao';
            divRadio.appendChild(newInputText);

            optionContainer.appendChild(divRadio);

            const newButton = document.createElement('button');
            newButton.textContent = '+';
            newButton.type = 'button';
            newButton.onclick = (event) => addOption(event);
            optionContainer.appendChild(newButton);

        } else if (selectedValue === 'checkbox') {
            const divCheckbox = document.createElement('div');
            divCheckbox.classList.add('div-options');

            const newInputCheckbox = document.createElement('input');
            newInputCheckbox.type = 'checkbox';
            divCheckbox.appendChild(newInputCheckbox);

            const newInputText = document.createElement('input');
            newInputText.type = 'text';
            newInputText.name = 'opcao';
            divCheckbox.appendChild(newInputText);

            optionContainer.appendChild(divCheckbox);

            const newButton = document.createElement('button');
            newButton.textContent = '+';
            newButton.type = 'button';
            newButton.onclick = (event) => addOption(event);
            optionContainer.appendChild(newButton);

        } else if (selectedValue === 'short_answer') {
            const newInput = document.createElement('input');
            newInput.type = 'text';
            newInput.name = 'opcao';
            newInput.setAttribute('maxlength', '200');
            optionContainer.appendChild(newInput);
        } else { 
            const newTextarea = document.createElement('textarea');
            newTextarea.name = 'opcao';
            optionContainer.appendChild(newTextarea);
        }
    }
});

function addOption(event) {
    const questionDiv = event.target.closest('.question'); 
    const optionContainer = questionDiv.querySelector('.options');

    const optionInput = document.createElement('input');
    const newDivChoices = document.createElement('div');
    newDivChoices.classList.add('div-options');

    optionContainer.insertBefore(newDivChoices, event.target);

    const inputText = document.createElement('input');
    inputText.type = 'text';
    inputText.name = 'opcao';

    const type = questionDiv.querySelector('.question_type'); 

    if (type.value === 'multiple_choice') {
        optionInput.type = 'radio';
    } else if (type.value === 'checkbox') {
        optionInput.type = 'checkbox';
    } else {
        optionInput.type = 'text';
    }

    newDivChoices.appendChild(optionInput);
    newDivChoices.appendChild(inputText);
}

function addQuestion() {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');

    questionDiv.innerHTML = `
        <label for="question_text">Pergunta:</label>
        <input type="text" name="quest" required>

        <label for="question_type">Tipo:</label>
        <select name="type" class="question_type" required>
            <option value="short_answer">Resposta Curta</option>
            <option value="long_answer">Resposta Longa</option>
            <option value="multiple_choice">Múltipla Escolha</option>
            <option value="checkbox">Caixa de Seleção</option>
        </select>

        <div class="options">
            <input type="text" maxlength="200" name="opcao">
        </div>
    `;

    questionContainer.appendChild(questionDiv);
}
