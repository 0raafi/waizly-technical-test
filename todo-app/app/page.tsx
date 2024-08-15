import TodoList from '../components/todo-list';

const Home = () => {
  return (
    <main className="min-h-screen lg:p-16 p-5">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        📝 todo app!
      </h3>
      <div className="py-4">
        <TodoList />
      </div>
    </main>
  );
}

export default Home;
