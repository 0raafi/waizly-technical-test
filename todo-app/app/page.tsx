import TodoList from '../components/todo-list';


export default function Home() {
  return (
    <main className="min-h-screen p-24">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      ✅ todo app!
      </h3>
      <div className="py-4">
        <TodoList />
      </div>
    </main>
  );
}
