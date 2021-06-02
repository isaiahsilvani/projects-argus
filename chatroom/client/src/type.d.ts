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
  username: string,
  time: string
}