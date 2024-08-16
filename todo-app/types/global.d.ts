type Todo = {
  id: string,
  created: string,
  updated: string,
  title: string,
  status: string,
  priority: string,
  assign: string,
  expand: {
    assign: {
      name: string,
    }
  }
}