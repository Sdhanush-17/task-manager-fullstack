import { useEffect, useState } from "react";
import { deleteTask, getTasks } from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
const [editingId, setEditingId] = useState(null);
const [editText, setEditText] = useState("");

  // Fetch tasks on load
  useEffect(() => {
const [title, setTitle] = useState("");
<div style={{marginTop:"20px"}}>

  <input
    placeholder="Enter a new task..."
    value={title}
    onChange={(e) => setTitle(e.target.value)}
  />

  <button onClick={handleCreate}>
    Add Task
  </button>

</div>
const handleCreate = async () => {

  if (!title.trim()) return;

  try {

    const res = await createTask({ title });

    // instantly show new task
    setTasks([res.data, ...tasks]);

    setTitle("");

  } catch (err) {
    console.log(err);
  }
};

    const fetchTasks = async () => {
      try {

        const res = await getTasks();
        setTasks(res.data);

      } catch (err) {
        console.log(err);
      }
    };

    fetchTasks();

  }, []);

  //  Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  //  Delete Task
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {

      await deleteTask(id);

      // 🔥 Instant UI update (recruiters LOVE this)
      setTasks(tasks.filter(task => task._id !== id));

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "30px" }}>

      <h1>Dashboard</h1>

      <button onClick={logout}>
        Logout
      </button>

      <hr />

      <h2>Your Tasks</h2>

      {tasks.length === 0 ? (
        <p>No tasks yet...</p>
      ) : (
        tasks.map(task => (
          <div
            key={task._id}
            style={{
              marginBottom: "10px",
              border: "1px solid gray",
              padding: "10px",
              borderRadius: "8px"
            }}
          >
            {task.title}

            <button
              onClick={() => handleDelete(task._id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>

          </div>
        ))
      )}

    </div>
  );
}<div className="min-h-screen bg-gray-100 p-8">

  <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">

    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Task Manager</h1>

      <button
        onClick={logout}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Logout
      </button>
    </div>

    {/* Create Task */}
    <div className="flex gap-2 mb-4">
      <input
        className="border p-2 rounded w-full"
        placeholder="Add a new task..."
      />

      <button className="bg-blue-500 text-white px-4 rounded">
        Add
      </button>
    </div>

  </div>
</div>


export default Dashboard;
