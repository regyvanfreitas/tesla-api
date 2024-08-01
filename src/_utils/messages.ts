export const messages = {
  internalError: 'Erro interno no servidor',
  user: {
    userIsNotAdmin: 'Usuário não é admin',
    notFound: 'E-mail não cadastrado',
    emailIsRequired: 'E-mail é obrigatório',
    invalidUser: 'E-mail ou senha incorretos',
    loginSuccess: 'Login realizado com sucesso',
    userExisting: 'E-mail já cadastrado',
    createUserSuccess: 'Usuário cadastrado com sucesso!',
    incorrectPassword: 'Senha incorreta',
    resetPasswordSuccess: 'Senha alterada com sucesso',
  },
  car: {
    createCarSuccess: 'Carro cadastrado com sucesso',
    carDeleteSuccess: 'Carro excluído com sucesso',
    carNotFound: 'Nenhum carro encontrado',
    noHasCarId: 'Id do carro é obrigatório',
    uploadSuccess: 'Upload realizado com sucesso',
  },
  rent: {
    createSuccess: 'Aluguel criado com sucesso',
    idIsRequired: 'Id do aluguel é obrigatório',
    errorCancel: 'Não é possível cancelar um aluguel criado por outro usuário',
    notFound: 'Nenhum aluguel encontrado',
    cancelSuccess: 'Aluguel cancelado com sucesso!',
    carRented: 'O carro solicitado já está alugado',
  },
  buy: {
    buySuccess: 'Compra realizada com sucesso!',
    carIsNotSell: 'O carro solicitado não está à venda',
    unauthorized: 'Não é possível comprar um carro anunciado por você',
  },
} as const
