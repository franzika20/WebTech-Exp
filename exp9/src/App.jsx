
import { useState } from "react";
import "./App.css";

function Header({ theme, toggleTheme }) {
    return (
        <header className="header">
            <a href="#home" className="brand">
                <span className="brand-mark">B</span>
                <span>Blooms <i>&</i> Ferns</span>
            </a>

            <nav className="navigation">
                <a href="#home">Home</a>
                <a href="#stories">Garden Stories</a>
                <a href="#plant-care">Plant Care</a>
                <a href="#my-garden">My Garden</a>
            </nav>

            <button className="theme-btn" onClick={toggleTheme}>
                {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
        </header>
    );
}

function StatCard({ title, value, description }) {
    return (
        <div className="stat-card">
            <span className="stat-value">{value}</span>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}

function BlogCard({ image, category, title, description }) {
    return (
        <article className="blog-card">
            <img src={image} alt={title} />
            <div className="blog-content">
                <span className="category">{category}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <a href="#plant-care">Read article →</a>
            </div>
        </article>
    );
}

function TaskList({ tasks, onToggleTask, onDeleteTask }) {
    return (
        <div className="task-section">
            <h2>Your Garden To-Do List</h2>
            <p className="section-description">
                Small steps today make a beautiful garden tomorrow.
            </p>

            {tasks.length === 0 ? (
                <p className="empty">No tasks yet. Add your first garden task!</p>
            ) : (
                <ul className="task-list">
                    {tasks.map((task) => (
                        <li key={task.id}
                            className={task.completed ? "completed" : ""}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => onToggleTask(task.id)}
                                />
                                <span>{task.title}</span>
                            </label>
                            <button
                                className="delete-btn"
                                onClick={() => onDeleteTask(task.id)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default function App() {
    const [theme, setTheme] = useState("light");
    const [taskInput, setTaskInput] = useState("");

    const [tasks, setTasks] = useState([
        { id: 1, title: "Water the indoor plants", completed: true },
        { id: 2, title: "Prune the rose bushes", completed: false },
        { id: 3, title: "Add organic compost", completed: false }
    ]);

    const toggleTheme = () => {
        setTheme((prev) => prev === "light" ? "dark" : "light");
    };

    const handleAddTask = (e) => {
        e.preventDefault();
        if (!taskInput.trim()) return;

        setTasks((prev) => [
            ...prev,
            { id: Date.now(), title: taskInput.trim(), completed: false }
        ]);

        setTaskInput("");
    };

    const handleToggleTask = (id) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id
                    ? { ...task, completed: !task.completed }
                    : task
            )
        );
    };

    const handleDeleteTask = (id) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    const completed = tasks.filter((task) => task.completed).length;
    const pending = tasks.length - completed;

    return (
        <div className={`app ${theme}`}>
            <Header theme={theme} toggleTheme={toggleTheme} />

            <main>
                <section className="hero" id="home">
                    <div className="hero-content">
                        <span className="eyebrow">GROW • CARE • BLOOM</span>
                        <h1>Find your little<br />piece of nature.</h1>
                        <p>
                            Inspiration, simple gardening ideas and a little
                            greenery to make every day brighter.
                        </p>
                        <a href="#stories" className="hero-btn">
                            Explore the garden
                        </a>
                    </div>
                </section>

                <section className="intro">
                    <span className="eyebrow">WELCOME TO BLOOMS & FERNS</span>
                    <h2>A garden is a story that grows.</h2>
                    <p>
                        Discover the joy of growing plants, caring for nature
                        and creating your own peaceful green corner.
                    </p>
                </section>

                <section className="content-section" id="stories">
                    <div className="section-heading">
                        <div>
                            <span className="eyebrow">FROM THE GARDEN JOURNAL</span>
                            <h2>Fresh from the garden</h2>
                        </div>
                        <p>Ideas and inspiration for every plant lover.</p>
                    </div>

                    <div className="blog-grid">
                        <BlogCard
                            image="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=700"
                            category="GARDENING BASICS"
                            title="Start your own little garden"
                            description="Learn how to choose the right spot, soil and plants for your first garden."
                        />
                        <BlogCard
                            image="https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=700"
                            category="INDOOR PLANTS"
                            title="Bring nature indoors"
                            description="Simple ways to make your home feel fresh with beautiful indoor plants."
                        />
                        <BlogCard
                            image="https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=700"
                            category="PLANT CARE"
                            title="The art of caring for leaves"
                            description="Understand sunlight, watering and everyday plant care."
                        />
                    </div>
                </section>

                <section className="care-section" id="plant-care">
                    <div>
                        <span className="eyebrow">A LITTLE GARDEN WISDOM</span>
                        <h2>Good things take time to grow.</h2>
                        <p>
                            Give your plants the right amount of sunlight,
                            water them thoughtfully and remember that every
                            new leaf is a little achievement.
                        </p>
                    </div>
                    <img
                        src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=900"
                        alt="Green garden plants"
                    />
                </section>

                <section className="garden-section" id="my-garden">
                    <div className="section-heading">
                        <div>
                            <span className="eyebrow">YOUR PERSONAL SPACE</span>
                            <h2>My Garden Dashboard</h2>
                        </div>
                        <p>Keep track of your gardening journey.</p>
                    </div>

                    <div className="stats-grid">
                        <StatCard title="Total Plants" value="12"
                            description="Plants in your garden" />
                        <StatCard title="Completed Tasks" value={completed}
                            description="Tasks successfully completed" />
                        <StatCard title="Pending Tasks" value={pending}
                            description="Tasks waiting for attention" />
                    </div>

                    <div className="task-container">
                        <form className="task-form" onSubmit={handleAddTask}>
                            <input
                                type="text"
                                placeholder="What needs to be done in your garden?"
                                value={taskInput}
                                onChange={(e) => setTaskInput(e.target.value)}
                            />
                            <button type="submit">Add Task</button>
                        </form>

                        <TaskList
                            tasks={tasks}
                            onToggleTask={handleToggleTask}
                            onDeleteTask={handleDeleteTask}
                        />
                    </div>
                </section>
            </main>

            <footer className="footer">
                <a href="#home" className="footer-brand">Blooms & Ferns</a>
                <p>Growing happiness, one leaf at a time.</p>
                <div className="footer-links">
                    <a href="#home">Home</a>
                    <a href="#stories">Stories</a>
                    <a href="#my-garden">My Garden</a>
                </div>
                <small>© 2026 Blooms & Ferns. Made for plant lovers.</small>
            </footer>
        </div>
    );
}
