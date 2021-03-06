interface Response {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

export function signIn(): Promise<Response> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        token: 'huashuahsuahkjnvcduigbfbf',
        user: {
          name: 'Arthur',
          email: 'contato@arthuraraujo.com.br',
        },
      });
    }, 20);
  });
}
