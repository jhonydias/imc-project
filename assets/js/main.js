// capturar evento de submit do formulário
const form = document.querySelector('#formulario');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const inputPeso = e.target.querySelector('#peso');
    const inputAltura = e.target.querySelector('#altura');
    console.log(inputPeso.value)

    const peso = Number(replaceStringPeso(inputPeso));
    const altura = Number(replaceStringAltura(inputAltura));
    
    if (!peso) {
        setResultado('Peso inválido!', false);
        return;
    }
    
    if(!altura) {
        setResultado('Altura inválida!', false)
        return;
    }
    const imc = getImc(peso,altura);
    const nivelImc = getNivelImc(imc);
    const pesoIdeal = getPesoIdeal(altura,imc)
    if(imc) {
        if(imc > 24.9){
            msg1 = `De acordo com a Organização Mundial da Saúde, seu IMC está acima do recomendado para a sua altura. Para atingir um valor de IMC normal, você precisa emagrecer <strong>${pesoIdeal}</strong> kg.`
        }
        if(imc < 18.5) {
            msg1 = `De acordo com a Organização Mundial da Saúde, seu IMC está abaixo do recomendado para a sua altura. Para atingir um valor de IMC normal, você precisa ganhar <strong>${pesoIdeal}</strong> kg para entrar na faixa de peso normal.`   
        }
        if(imc>18.5 && imc<=24.9){
            msg1 = `Parabéns! De acordo com a Organização Mundial da Saúde, seu IMC é considerado normal para a sua altura.`
        }
    }
    msg = `O valor do seu imc é: <strong>${imc}</strong> kg/m<sup>2</sup><br> Você está no nível: <strong>${nivelImc}</strong><br><br> ${msg1}`;
    setResultado(msg, true);
    console.log(peso,altura,imc,nivelImc,pesoIdeal)

    
});

function getPesoIdeal (altura,imc){
    if (imc > 24.9) {
        pesoIdeal = (imc - 24.9) * altura**2;
        return pesoIdeal.toFixed(2);
    }
    if (imc < 18.5) {
        pesoIdeal = (18.5 - imc) * altura**2
        return pesoIdeal.toFixed(2)
    }
    else return pesoIdeal = ''
}

function getNivelImc (imc) {
    const nivel = ['Abaixo do peso', 'Peso normal', 'Sobrepeso', 'Acima do peso (Grau I)','Acima do peso (Grau II)','Acima do peso (Grau III)']
    if (imc >= 39.9) return nivel[5];
    if (imc >=34.9) return nivel[4];
    if (imc >=29.9) return nivel[3] 
    if (imc >=24.9) return nivel[2] 
    if (imc >=18.5) return nivel[1] 
    if (imc <18.5) return nivel[0] 
}
function replaceStringPeso(inputPeso){  
    if (inputPeso) return inputPeso = inputPeso.value.replace(",",".");
}
function replaceStringAltura(inputAltura){
    if (inputAltura) return inputAltura = inputAltura.value.replace(",",".");
}

function getImc (peso, altura){
    const imc = peso / altura **2;
    return imc.toFixed(2);
}

function criaP () {
    const p = document.createElement ('p');
    return p;
}

function setResultado (msg, isValid) {
    const resultado = document.querySelector('#resultado');
    resultado.innerHTML = '' ;
    
    const p = criaP();

    if(isValid){
        p.classList.add('paragrafo-resultado');
    } else{
        p.classList.add('bad');
    }
    p.innerHTML = msg
    resultado.appendChild(p);

}
