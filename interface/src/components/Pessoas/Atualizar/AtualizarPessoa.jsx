// imports
import './AtualizarPessoa.css';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { formatarData } from '../../../util/Utilitario';
import PessoasRequests from '../../../fetch/PessoasRequests'; 
/**
 * Componente com o formulário para atualizar os dados do aluno
 */
function AtualizarPessoa() {
    const location = useLocation();
    const navegacao = useNavigate(); // Adiciona o hook de navegação
    const objPessoa = location.state.objeto;
    const [pessoa, setPessoa] = useState({
        id: objPessoa.id,
        nome: objPessoa.nome,
        cpf: objPessoa.cpf,
        dataNascimento: formatarData(new Date(objPessoa.dataNascimento)),
        telefone: objPessoa.telefone,
        endereco: objPessoa.endereco,
        altura: objPessoa.altura,
        peso: objPessoa.peso
    }); 

    // Função para atualizar os valores conforme os inputs do formulário são preenchidos
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPessoa(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    // Função para atualizar os dados do aluno no banco de dados
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário

        try {
            // Chama a função atualizarPessoa e verifica se o retorno é true
            if (await PessoasRequests.atualizarPessoa(pessoa)) {
                // Exibe alerta de sucesso
                alert(`${pessoa.nome} atualizado com sucesso!`);
                // Redireciona para a página de listagem
                navegacao('/listagem', { replace: true });
            } else {
                // Exibe alerta de falha
                alert('Erro ao atualizar informações');
            }
        } catch (error) {
            console.error('Erro ao tentar atualizar a pessoa: ', error);
            alert('Ocorreu um erro ao tentar atualizar as informações.');
        }
    }

    return (
        <>
            <h1>Atualizar Pessoa</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Nome
                    <input
                        type="text"
                        name="nome"
                        value={pessoa.nome}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    CPF
                    <input
                        type="number"
                        name="cpf"
                        value={pessoa.cpf}
                        onChange={handleChange}
                    />
                </label>
                <div className='group'>
                    <label>
                        Data de Nascimento
                        <input
                            type="date"
                            name="dataNascimento"
                            value={pessoa.dataNascimento}
                            onChange={handleChange}
                            style={{ width: '85%' }}
                        />
                    </label>
                    <label>
                        Telefone
                        <input
                            type="number"
                            name="telefone"
                            value={pessoa.telefone}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <label>
                    Endereço
                    <input
                        type="text"
                        name="endereco"
                        value={pessoa.endereco}
                        onChange={handleChange}
                    />
                </label>
                <div className='group'>
                    <label>
                        Altura
                        <input
                            type="number"
                            name="altura"
                            value={pessoa.altura}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Peso
                        <input
                            type="number"
                            name="peso"
                            value={pessoa.peso}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <button type="submit">Enviar</button>
            </form>
        </>
    );
}

export default AtualizarPessoa;
