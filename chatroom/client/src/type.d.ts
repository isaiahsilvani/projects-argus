type State = EmptyObject & {
  username: string,
}

type User = {
  id: string,
  username: string
}

type Message = {
  message: string,
  username: string,
}

type ApiDataType = {
  message: string,
  messages: {}[],
  username: string,
  time: string
}